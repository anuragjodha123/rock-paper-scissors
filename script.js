// let's asssume for the sake of this 'application'
// 1. = Rock 
// 2. = Paper
// 3. = Scissors


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

let humanScore = 0;
let computerScore = 0;

let numToRPS = ['rock', 'paper', 'scissors'];

function playRound(humanChoice, computerChoice) {
    if (humanChoice == computerChoice) {
        console.log(`The game is a draw!, You both chose ${numToRPS[computerChoice]}`);
    } else if (humanChoice == 1 && computerChoice == 3 || humanChoice == computerChoice+1) {
        console.log(`You win! ${numToRPS[humanChoice]} beats ${numToRPS[computerChoice]}.`)
        humanScore++;
    } else {
        console.log(`You lose! ${numToRPS[computerChoice]} beats ${numToRPS[humanChoice]}.`)
        computerScore++;
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

// The gameplay for the slot machine
// Type 1:
// User clicks start
// The computer picks a random nubmer
// After the time (let's say 10 seconds) the slot stops at that random number

// Type 2:
// User hits the stop button
// The machine stops after some time
// This some time can be a fixed number, which will make this a skill based game
// Or could be totally random? or vary slightly after every press

// The logic for the rotation of the slot
// Create an array of Rock Paper Scissors
// Switch through each of the elements and show it on the screen
// Increase the time after each loop of the array (to give the slot slowing effect)
// The increase in time should not be linear it should be exponential
// Stopping logic:
  // if increase in time > some pre defined number
  // and, the current item is the chosen one by random number
  // stop the loop

let rpsArr = ['Rock', 'Paper', 'Scissors'];

let computerStartBtn = document.querySelector(".computer-start-btn");
let computerStopBtn = document.querySelector(".computer-stop-btn");
let slotScreen = document.querySelector("h1");

function changeSlotScreen(text) {
  slotScreen.textContent = text;
}

function loopArr() {
  let newArr = Array(30).fill(rpsArr).flat();
  let computerChoice = Math.ceil(Math.random()*3);
  for (let i = 0; i < computerChoice; i++) {
    newArr.push(rpsArr[i]);
  }
  
  newArr.push('Finished');
  // some maths for the time
  // some other time too much maths here

  // let timeArr = Array(newArr.length).fill(1000);
  // let timeNewArr = [];
  // for (let i = 0; i < timeArr.length; i++) {
  //   timeNewArr.push(Math.ceil(Math.pow(1000, ((i+1)/timeArr.length))));
  // }

  // for (let i = 0; i < timeNewArr.length; i++) {
  //   timeArr[i] = timeArr[i] - timeNewArr[timeNewArr.length-(i+1)];
  // }

  for (let i = 0; i < newArr.length; i++) {
    let timeoutInterval = Math.pow(5000, i/newArr.length);
    setTimeout(() => changeSlotScreen(newArr[i]), timeoutInterval);
  }
}

computerStartBtn.addEventListener('click', loopArr);