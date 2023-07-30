// Store values to enable customization, localization, and numerical logic
const choices = ['Rock', 'Paper', 'Scissors'];
const scoreToWin = 5;

const gameLog = document.getElementById('gameLog');
const buttonContainer = document.getElementById('buttonContainer');
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

function setup() {
	roundNumber = 1;
	gameOver = false;
	playerScore = 0;
	computerScore = 0;
	buttonContainer.replaceChildren();
	gameLog.replaceChildren();
	updateStatus();

	choices.forEach(choice => {
		let button = document.createElement('button');
		button.textContent = choice;
		button.addEventListener('click', () => playRound(choices.indexOf(choice)));
		buttonContainer.appendChild(button);
	});

}

function gameLogEntry(entry) {
	let entryElement = document.createElement('p');
	entryElement.textContent = entry;

	if (gameOver) {
		entryElement.classList.add('gameOutcomeText');
	}

	gameLog.appendChild(entryElement);
}

function getComputerChoice() {
	// Get a random number between 0 and 2, representing the computer's choice
	let computerChoice = Math.floor(Math.random() * 3);

	return computerChoice;
}

function playRound(playerChoice) {
	let computerChoice = getComputerChoice();
	let roundOutcomeText;

	if (playerChoice === computerChoice) {
		roundOutcomeText = `Round ${roundNumber} is a draw! ` +
			`${choices[playerChoice]} ties with ${choices[computerChoice]}!`;
	} else if (playerChoice === computerChoice - 1 ||
		playerChoice === computerChoice + 2) {
		computerScore++;
		roundOutcomeText = `You lose round ${roundNumber}! ` +
			`${choices[computerChoice]} beats ${choices[playerChoice]}!`;
	} else {
		playerScore++;
		roundOutcomeText = `You win round ${roundNumber}! ` +
			`${choices[playerChoice]} beats ${choices[computerChoice]}!`;
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
			winnerText = 'the computer wins';
			winningScore = computerScore;
			losingScore = playerScore;
		}

		gameOver = true;

		let totalRoundsText = `${roundNumber} round${roundNumber == 1 ? '' : 's'}`;

		let gameOutcomeText = `After ${totalRoundsText}, ` +
			`${winnerText} with ${winningScore} against ${losingScore}!`;

		gameLogEntry(gameOutcomeText);

		buttonContainer.replaceChildren();
		buttonContainer.appendChild(resetButton);
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