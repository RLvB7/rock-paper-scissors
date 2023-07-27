const choices = ['Rock', 'Paper', 'Scissors'];
const totalRounds = 5;

function getComputerChoice() {
	return Math.floor(Math.random() * 3);
}

function getPlayerChoice() {
	let playerChoiceText = prompt("Rock, Paper, Scissors?");
	let playerChoiceTextFormatted = playerChoiceText ? playerChoiceText.charAt(0).toUpperCase() + playerChoiceText.slice(1).toLowerCase() : "";
	let playerChoice = choices.includes(playerChoiceTextFormatted) ? choices.indexOf(playerChoiceTextFormatted) : null;

	return playerChoice;
}

function playRound(roundNumber, playerChoice, computerChoice) {
	let roundOutcome = 0;
	let roundOutcomeText;

	if (playerChoice === computerChoice) {
		roundOutcomeText = `Round ${roundNumber} is a draw! ${choices[playerChoice]} ties with ${choices[computerChoice]}!`;
	} else if (playerChoice === computerChoice - 1 || playerChoice === computerChoice + 2) {
		roundOutcome = -1;
		roundOutcomeText = `You lose round ${roundNumber}! ${choices[computerChoice]} beats ${choices[playerChoice]}!`;
	} else {
		roundOutcome = 1;
		roundOutcomeText = `You win round ${roundNumber}! ${choices[playerChoice]} beats ${choices[computerChoice]}!`;
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

		if (playerChoice !== null) {
			let computerChoice = getComputerChoice();

			roundOutcome = playRound(roundNumber, playerChoice, computerChoice);

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
		} else {
			console.log('No valid player choice made!');
		}
	}

	let totalRoundsText = `${totalRounds} round${totalRounds == 1 ? '' : 's'}`
	let gameOutcomeText;
	let winningScore;
	let losingScore;

	if (playerScore === computerScore) {
		gameOutcomeText = 'the game is a tie';
		winningScore = losingScore = playerScore;
	} else if (playerScore > computerScore) {
		gameOutcomeText = 'you win';
		winningScore = playerScore;
		losingScore = computerScore;
	} else {
		gameOutcomeText = 'the computer wins';
		winningScore = computerScore;
		losingScore = playerScore;
	}

	console.log(`After ${totalRoundsText}, ${gameOutcomeText} with ${winningScore} against ${losingScore}!`);
}

game();