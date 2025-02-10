function getComputerChoice() {
    let a = Math.ceil(Math.random()*3);

    switch(a) {
        case 1:
            return 'rock';
        case 2:
            return 'paper';
        case 3:
            return 'scissors';
    }
}

function getHumanChoice() {
    return prompt("Rock, paper or scissors?").toLowerCase();
}

// example: if computer took paper
//  human took rock
// if computer took paper and human took
//  computer win!
//
//

let humanScore = 0;
let computerScore = 0;

function playRound(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
        console.log("The game is a draw!")
        return
    } 

    if (humanChoice == 'paper') {
        if (computerChoice == 'rock') {
            console.log('You win! Paper beats Rock.');
            humanScore++;
        } else {
            console.log('You lose! Scissors beats Rock');
            computerScore++;
        }
    } else if(humanChoice == 'rock') {
        if (computerChoice == 'scissors') {
            console.log('You win! Rock beats Scissors');
            humanScore++;
        } else {
            console.log('You lose! Paper beats Rock.');
            computerScore++;
        }
    }  else if(humanChoice == 'scissors') {
        if (computerChoice == 'paper') {
            console.log('You win! Scissors beats Paper.');
            humanScore++;
        } else {
            console.log('You lose! Rock beats Scissors.');
            computerScore++;
        }
    }
}


function playGame() {  
    for (let i = 0; i < 5; i++) {
        const humanSelection = getHumanChoice();
        const computerSelection = getComputerChoice();

        playRound(humanSelection, computerSelection);
    }

    if (humanScore > computerScore) {
        console.log('Hooman Wins!!')
    } else if (computerScore > humanScore) {
        console.log('Compooter Wins!')
    } else {
        console.log('Draw!!')
    }
}