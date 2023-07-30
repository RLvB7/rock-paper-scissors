// Store values to enable customization, localization, and numerical logic
const choices = ['Rock', 'Paper', 'Scissors'];
const gameLog = document.getElementById('gameLog');
const buttonContainer = document.getElementById('buttonContainer');
const buttons = [];

function setup() {
	choices.forEach(choice => {
		let button = document.createElement('button');
		button.textContent = choice;
		buttonContainer.appendChild(button);
		buttons.push(button);
	});
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

function getPlayerChoice() {
	let playerChoiceText = prompt(choices.join(', ') + '?');

	let playerChoiceTextFormatted = playerChoiceText ?
		playerChoiceText.charAt(0).toUpperCase() +
		playerChoiceText.slice(1).toLowerCase() :
		'';

	let playerChoice = choices.includes(playerChoiceTextFormatted) ?
		choices.indexOf(playerChoiceTextFormatted) : null;

	return playerChoice;
}

function playRound(roundNumber, playerChoice, computerChoice) {
	let roundOutcome = 0;
	let roundOutcomeText;

	if (playerChoice === computerChoice) {
		roundOutcomeText = `Round ${roundNumber} is a draw! ` +
			`${choices[playerChoice]} ties with ${choices[computerChoice]}!`;
	} else if (playerChoice === computerChoice - 1 ||
		playerChoice === computerChoice + 2) {
		roundOutcome = -1;
		roundOutcomeText = `You lose round ${roundNumber}! ` +
			`${choices[computerChoice]} beats ${choices[playerChoice]}!`;
	} else {
		roundOutcome = 1;
		roundOutcomeText = `You win round ${roundNumber}! ` +
			`${choices[playerChoice]} beats ${choices[computerChoice]}!`;
	}

	gameLogEntry(roundOutcomeText);
}

function game() {
	let roundNumber = 0;
	let playerScore = 0;
	let computerScore = 0;

	while (playerScore < 5 && computerScore < 5) {
		roundNumber++;
		let roundOutcome;
		let playerChoice = getPlayerChoice();

		if (playerChoice === null) {
			gameLogEntry('No valid player choice made! Game cancelled.');
			return;
		} else {
			let computerChoice = getComputerChoice();

			roundOutcome = playRound(roundNumber,
				playerChoice, computerChoice);

			switch (roundOutcome) {
				case -1:
					computerScore++;
					break;

				case 1:
					playerScore++;
					break;

				default:
					break;
			}
		}
	}

	let winnerText;
	let winningScore;
	let losingScore;

	if (playerScore === computerScore) {
		winnerText = 'the game is a tie';
		winningScore = losingScore = playerScore;
	} else if (playerScore > computerScore) {
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
}

setup();

game();