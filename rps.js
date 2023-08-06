const choices = ['Rock', 'Paper', 'Scissors'];
const scoreToWin = 5;

const gameLog = document.getElementById('gameLog');
const buttonContainer = document.getElementById('buttonContainer');
const resetContainer = document.getElementById('resetContainer');
const resetButton = document.createElement('button');

const statusPlayer = document.getElementById('playerScore');
const statusRound = document.getElementById('roundNumber');
const statusComputer = document.getElementById('computerScore');

resetButton.textContent = 'Reset';
resetButton.classList.add('reset');
resetButton.addEventListener('click', () => setup());

let roundNumber;
let gameOver;
let playerScore;
let computerScore;
let playerHistory = [];

setup();

function setup() {
	roundNumber = 1;
	gameOver = false;
	playerScore = 0;
	computerScore = 0;

	gameLog.replaceChildren();
	resetContainer.replaceChildren();
	updateStatus();
	gameLogEntry('Choose your weapon!', true);
	gameLogEntry(`First to reach a score of ${scoreToWin} wins the game!`, true);

	if (buttonContainer.children.length === choices.length) {
		for (let i = 0; i < choices.length; i++) {
			buttonContainer.children[i].disabled = false;
		}
	} else {
		choices.forEach(choice => {
			let button = document.createElement('button');
			button.textContent = choice;
			button.addEventListener('click', () => playRound(choices.indexOf(choice)));
			buttonContainer.appendChild(button);
		});
	}
}

function gameLogEntry(entry, bold = false) {
	let entryElement = document.createElement('p');
	entryElement.textContent = entry;

	if (bold) {
		entryElement.classList.add('bold');
	}

	gameLog.prepend(entryElement);

	if (gameLog.children.length > 2) {
		let opacity = 1;

		for (let i = 0; i < gameLog.children.length; i++) {
			if (i == 5) {
				gameLog.removeChild(gameLog.children[i]);
				continue;
			}
			gameLog.children[i].style.opacity = opacity;
			opacity -= 0.2;

		}
	}
}

function getComputerChoice() {
	let computerChoice = -1;
	let rph;

	// Computer choice is decided based on player's recent choices or at random	
	// rph = recent player history

	if (computerChoice < 0 && playerHistory.length >= 5) {
		rph = playerHistory.slice(playerHistory.length - 5);
		if (rph[0] != rph[2] &&
			rph[0] == rph[1] &&
			rph[2] == rph[3]) {
			computerChoice = rph[4] == 2 ? 0 : rph[4] + 1;	// e.g. 001122
		}
	}

	if (computerChoice < 0 && playerHistory.length >= 4) {
		rph = playerHistory.slice(playerHistory.length - 4);
		if (
			rph[0] != rph[1] &&
			rph[0] == rph[2] &&
			rph[1] == rph[3]) {
			computerChoice = rph[0] == 2 ? 0 : rph[0] + 1;	// e.g. 01010
		} else if (rph[0] != rph[1] &&
			rph[0] != rph[2] &&
			rph[0] != rph[3] &&
			rph[1] != rph[2] &&
			rph[1] == rph[3]) {
			computerChoice = rph[0] == 2 ? 0 : rph[0] + 1;	// e.g. 01210
		} else if (
			rph[0] != rph[1] &&
			rph[0] != rph[3] &&
			rph[1] != rph[2] &&
			rph[1] != rph[3] &&
			rph[2] != rph[3] &&
			rph[0] == rph[2]) {
			computerChoice = rph[0] == 2 ? 0 : rph[0] + 1;	// e.g. 12101
		} else if (
			rph[0] != rph[2] &&
			rph[0] == rph[1] &&
			rph[2] == rph[3]) {
			computerChoice =
				(3 - rph[0] - rph[2]) == 2 ? 0 : (3 - rph[0] - rph[2]) + 1;
				// e.g. 001122
		}
	}

	if (computerChoice < 0 && playerHistory.length >= 3) {
		rph = playerHistory.slice(playerHistory.length - 3);
		if (rph[0] != rph[1] &&
			rph[0] != rph[2]) {
			computerChoice = rph[0] == 2 ? 0 : rph[0] + 1;	// e.g. 012012
		}
	}

	if (computerChoice < 0 && playerHistory.length >= 2) {
		rph = playerHistory.slice(playerHistory.length - 2);
		if (rph[0] == rph[1]) {
			computerChoice = rph[0] == 2 ? 0 : rph[0] + 1;	// e.g. 000000
		}
	}

	if (computerChoice < 0) {
		computerChoice = Math.floor(Math.random() * 3);
	}

	return computerChoice;
}

function playRound(playerChoice) {
	let computerChoice = getComputerChoice();
	let roundOutcomeText;

	playerHistory.push(playerChoice);
	if (playerHistory.length > 5) {
		playerHistory.shift();
	}

	if (playerChoice === computerChoice) {
		roundOutcomeText =
			`Your ${choices[playerChoice]} ties with ` +
			`Computer's ${choices[computerChoice]}! ` +
			`Round ${roundNumber} is a draw!`;
	} else if (playerChoice === computerChoice - 1 ||
		playerChoice === computerChoice + 2) {
		computerScore++;
		roundOutcomeText =
			`Computer's ${choices[computerChoice]} beats ` +
			`your ${choices[playerChoice]}! ` +
			`You lose round ${roundNumber}!`;
	} else {
		playerScore++;
		roundOutcomeText =
			`Your ${choices[playerChoice]} beats ` +
			`Computer's ${choices[computerChoice]}! ` +
			`You win round ${roundNumber}!`;
	}

	gameLogEntry(roundOutcomeText);

	if (playerScore < scoreToWin && computerScore < scoreToWin) {
		roundNumber++;
	} else {
		if (playerScore > computerScore) {
			winnerText = 'you win';
			winningScore = playerScore;
			losingScore = computerScore;
		} else {
			winnerText = 'Computer wins';
			winningScore = computerScore;
			losingScore = playerScore;
		}

		gameOver = true;

		let totalRoundsText = `${roundNumber} round${roundNumber == 1 ? '' : 's'}`;

		let gameOutcomeText = `After ${totalRoundsText}, ` +
			`${winnerText} with ${winningScore} against ${losingScore}!`;

		gameLogEntry(gameOutcomeText, true);

		for (let i = 0; i < choices.length; i++) {
			buttonContainer.children[i].disabled = true;
		}

		resetContainer.appendChild(resetButton);
	}

	updateStatus();
}

function updateStatus() {
	statusPlayer.textContent = playerScore;
	statusRound.textContent = roundNumber;
	statusComputer.textContent = computerScore;

	if (playerScore > computerScore) {
		statusPlayer.classList.remove('losing', 'gameOver');
		statusComputer.classList.remove('winning', 'gameOver');
		statusPlayer.classList.add('winning');
		statusComputer.classList.add('losing');
	} else if (computerScore > playerScore) {
		statusPlayer.classList.remove('winning', 'gameOver');
		statusComputer.classList.remove('losing', 'gameOver');
		statusPlayer.classList.add('losing');
		statusComputer.classList.add('winning');
	} else {
		statusPlayer.classList.remove('winning', 'losing', 'gameOver');
		statusComputer.classList.remove('winning', 'losing', 'gameOver');
	}

	if (gameOver) {
		statusPlayer.classList.add('gameOver');
		statusComputer.classList.add('gameOver');
	}
}