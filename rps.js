function getComputerChoice() {
	return Math.floor(Math.random() * 3);
}

const choices = ['Rock', 'Paper', 'Scissors'];

let computerChoice = getComputerChoice();
let computerChoiceText = choices[computerChoice];

console.log(computerChoiceText);