// Store valid choices as array to enable localization and numerical logic
const choices = ['Rock', 'Paper', 'Scissors'];
const totalRounds = 5;

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
		roundOutcomeText = `Round ${roundNumber} is a draw!` +
			`${choices[playerChoice]} ties with ${choices[computerChoice]}!`;
	} else if (playerChoice === computerChoice - 1 ||
		playerChoice === computerChoice + 2) {
		roundOutcome = -1;
		roundOutcomeText = `You lose round ${roundNumber}!` +
			`${choices[computerChoice]} beats ${choices[playerChoice]}!`;
	} else {
		roundOutcome = 1;
		roundOutcomeText = `You win round ${roundNumber}!` +
			`${choices[playerChoice]} beats ${choices[computerChoice]}!`;
	}

	console.log(roundOutcomeText);

	return roundOutcome;
}

function game() {
	let roundNumber = 1;
	let playerScore = 0;
	let computerScore = 0;

	while (roundNumber <= totalRounds) {
		let roundOutcome;
		let playerChoice = getPlayerChoice();

		if (playerChoice === null) {
			console.log('No valid player choice made!');
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

			roundNumber++;
		}
	}

	let totalRoundsText = `${totalRounds} round${totalRounds == 1 ? '' : 's'}`;
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

	let gameOutcomeText = `After ${totalRoundsText},` +
		`${winnerText} with ${winningScore} against ${losingScore}!`;

	return gameOutcomeText;
}

let outcome = game();

console.log(outcome);