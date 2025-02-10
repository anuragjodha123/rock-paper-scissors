// let's asssume for the sake of this 'application'
// 1. = Rock 
// 2. = Paper
// 3. = Scissors

// function getComputerChoice() {
//     let a = Math.ceil(Math.random()*3);

//     switch(a) {
//         case 1:
//             return 'rock';
//         case 2:
//             return 'paper';
//         case 3:
//             return 'scissors';
//     }
// }

const getComputerChoice = () => Math.ceil(Math.random()*3)

function getHumanChoice() {
    let a = 0;

    do {
        a = parseInt(prompt(
            `Please enter your choice?
            1. Rock
            2. Paper
            3. Scissors
            Note: Please enter only a valid number.`))
    } while (0 >= a ||  3 < a || isNaN(a))
    return a;
}

// example: if computer took paper
//  human took rock
// if computer took paper and human took
//  computer win!
//
//

let humanScore = 0;
let computerScore = 0;

let numToRPS = ['rock', 'paper', 'scissors'];

function playRound(humanChoice, computerChoice) {
    if (humanChoice == computerChoice) {
        console.log(`The game is a draw!, You both chose ${numToRPS[computerChoice]}`);
        return
    }
    
    if (humanChoice == 1 && computerChoice == 3 || humanChoice == computerChoice+1) {
        console.log(`You win! ${numToRPS[humanChoice]} beats ${numToRPS[computerChoice]}.`)
        humanScore++;
        return;
    } else {
        console.log(`You lose! ${numToRPS[computerChoice]} beats ${numToRPS[humanChoice]}.`)
        computerScore++;
        return;
    }
}

// function playRound(humanChoice, computerChoice) {
//     if (humanChoice === computerChoice) {
//         console.log("The game is a draw!")
//         return
//     } 

//     if (humanChoice == 'paper') {
//         if (computerChoice == 'rock') {
//             console.log('You win! Paper beats Rock.');
//             humanScore++;
//         } else {
//             console.log('You lose! Scissors beats Rock');
//             computerScore++;
//         }
//     } else if(humanChoice == 'rock') {
//         if (computerChoice == 'scissors') {
//             console.log('You win! Rock beats Scissors');
//             humanScore++;
//         } else {
//             console.log('You lose! Paper beats Rock.');
//             computerScore++;
//         }
//     }  else if(humanChoice == 'scissors') {
//         if (computerChoice == 'paper') {
//             console.log('You win! Scissors beats Paper.');
//             humanScore++;
//         } else {
//             console.log('You lose! Rock beats Scissors.');
//             computerScore++;
//         }
//     }
// }


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