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
resetButton.addEventListener('click', () => setup());

let roundNumber = 1;
let gameOver = false;
let playerScore = 0;
let computerScore = 0;
let playerHistory = [];

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
			if (i == 6) {
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

	// Computer choice is decided based on player's recent choices or at random	
	if (playerHistory.length == 3) {
		if (playerHistory[0] == playerHistory[1]) {
			computerChoice = playerHistory[0] == (choices.length - 1) ? 0 : playerHistory[0] + 1;
		} else if (playerHistory[1] == playerHistory[2]) {
			computerChoice = playerHistory[1] == (choices.length - 1) ? 0 : playerHistory[1] + 1;
		}
	}

	if (computerChoice < 0) {
		computerChoice = Math.floor(Math.random() * choices.length);
	}

	return computerChoice;
}

function playRound(playerChoice) {
	let computerChoice = getComputerChoice();
	let roundOutcomeText;

	playerHistory.push(playerChoice);
	if (playerHistory.length > 3) {
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
		statusPlayer.classList.remove('winning', 'losing', 'gameOver');
		statusComputer.classList.remove('winning', 'losing', 'gameOver');
		statusPlayer.classList.add('winning');
		statusComputer.classList.add('losing');
	} else if (computerScore > playerScore) {
		statusPlayer.classList.remove('winning', 'losing', 'gameOver');
		statusComputer.classList.remove('winning', 'losing', 'gameOver');
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

setup();