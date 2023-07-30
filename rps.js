// Store values to enable customization, localization, and numerical logic
const choices = ['Rock', 'Paper', 'Scissors'];

const gameLog = document.getElementById('gameLog');
const buttonContainer = document.getElementById('buttonContainer');
const resetButton = document.createElement('button');
let roundNumber = 1;
let playerScore = 0;
let computerScore = 0;

function setup() {
	choices.forEach(choice => {
		let button = document.createElement('button');
		button.textContent = choice;
		button.addEventListener('click', () => playRound(choices.indexOf(choice)));
		buttonContainer.appendChild(button);
	});

	resetButton.textContent = 'Reset';
	resetButton.addEventListener('click', () => resetGame());
}

function gameLogEntry(entry) {
	let entryElement = document.createElement('p');
	entryElement.textContent = entry;
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

	if (playerScore < 5 && computerScore < 5) {
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

		let totalRoundsText = `${roundNumber} round${roundNumber == 1 ? '' : 's'}`;

		let gameOutcomeText = `After ${totalRoundsText}, ` +
			`${winnerText} with ${winningScore} against ${losingScore}!`;

		gameLogEntry(gameOutcomeText);

		buttonContainer.appendChild(resetButton);
	}
}

function resetGame() {
	roundNumber = 1;
	playerScore = 0;
	computerScore = 0;
	gameLog.replaceChildren();
	buttonContainer.removeChild(resetButton);
}

setup();