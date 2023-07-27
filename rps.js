function getComputerChoice() {
	return Math.floor(Math.random() * 3);
}

function playRound(playerChoice, computerChoice) {
	let roundOutcome = 0;
	let roundOutcomeText;

	if (playerChoice === computerChoice) {
		roundOutcomeText = `Draw! ${choices[playerChoice]} ties with ${choices[computerChoice]}!`;
	} else if (playerChoice === computerChoice - 1 || playerChoice === computerChoice + 2) {
		roundOutcome = -1;
		roundOutcomeText = `You lose! ${choices[computerChoice]} beats ${choices[playerChoice]}!`;
	} else {
		roundOutcome = 1;
		roundOutcomeText = `You win! ${choices[playerChoice]} beats ${choices[computerChoice]}!`;
	}

	console.log(roundOutcomeText);

	return roundOutcome;
}

const choices = ['Rock', 'Paper', 'Scissors'];
let roundOutcome;

let playerChoiceText = prompt("Rock, Paper, Scissors?");
let playerChoiceTextFormatted = playerChoiceText ? playerChoiceText.charAt(0).toUpperCase() + playerChoiceText.slice(1).toLowerCase() : "";
let playerChoice = choices.includes(playerChoiceTextFormatted) ? choices.indexOf(playerChoiceTextFormatted) : null;

if (playerChoice !== null) {
	let computerChoice = getComputerChoice();

	roundOutcome = playRound(playerChoice, computerChoice);
} else {
	roundOutcome = 'No valid player choice made!';
}

console.log(roundOutcome);