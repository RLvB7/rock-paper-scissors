function getComputerChoice() {
	return Math.floor(Math.random() * 3);
}

function play(playerChoice, computerChoice) {
	if (playerChoice === computerChoice) {
		return `Draw! ${choices[playerChoice]} ties with ${choices[computerChoice]}!`;
	} else if (playerChoice === computerChoice - 1 || playerChoice === computerChoice + 2) {
		return `You lose! ${choices[computerChoice]} beats ${choices[playerChoice]}!`;
	} else {
		return `You win! ${choices[playerChoice]} beats ${choices[computerChoice]}!`;
	}
}

const choices = ['Rock', 'Paper', 'Scissors'];

let playerChoice = 0;
let computerChoice = getComputerChoice();

let outcome = play(playerChoice, computerChoice);

console.log(outcome);