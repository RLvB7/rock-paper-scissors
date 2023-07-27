function getComputerChoice() {
	return Math.floor(Math.random() * 3);
}

function playRound(playerChoice, computerChoice) {
	if (playerChoice === computerChoice) {
		return `Draw! ${choices[playerChoice]} ties with ${choices[computerChoice]}!`;
	} else if (playerChoice === computerChoice - 1 || playerChoice === computerChoice + 2) {
		return `You lose! ${choices[computerChoice]} beats ${choices[playerChoice]}!`;
	} else {
		return `You win! ${choices[playerChoice]} beats ${choices[computerChoice]}!`;
	}
}

const choices = ['Rock', 'Paper', 'Scissors'];
let outcome;

let playerChoiceText = prompt("Rock, Paper, Scissors?");
let playerChoiceTextFormatted = playerChoiceText ? playerChoiceText.charAt(0).toUpperCase() + playerChoiceText.slice(1).toLowerCase() : "";
let playerChoice = choices.includes(playerChoiceTextFormatted) ? choices.indexOf(playerChoiceTextFormatted) : null;

if (playerChoice !== null) {
	let computerChoice = getComputerChoice();

	outcome = playRound(playerChoice, computerChoice);
} else {
	outcome = 'No valid player choice made!';
}

console.log(outcome);