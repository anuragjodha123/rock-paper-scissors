/*
[X] Add green color to the background if human wins (simple timeout would do)
[X] Add score to the ui
[X] Stop the game if 5 rounds completed
[X] Announce Win (create element with replay button)
[X] Add confetti if human wins 😁
[X] Add the bottom dialog
 */
 
let humanScore = 0;
let computerScore = 0;
let gameRounds = 0;
let humanSelected;
let computerSelected;

let winColor = "#64ff7e";
let loseColor = "#ff7676";
let drawColor = "#c6c6c6"; 
let normalColor = "#f6f6f6";
let re = new RegExp('(?<=images\/)(.*?)(?=\.png)');

let humanChoiceBox = document.querySelector('.left .rps-choice');
let computerChoiceBox = document.querySelector('.right .rps-choice');
let humanScoreBoard = document.querySelectorAll('.left .score-board div');
let computerScoreBoard = document.querySelectorAll('.right .score-board div');
let finishedPopup = document.querySelector('.game-finished');
let replayButton = document.querySelector('.game-finished button');

function playGame() {  
    gameRounds++;

    if (
      humanSelected === 'rock' && computerSelected === 'scissors' ||
      humanSelected === 'paper' && computerSelected === 'rock' ||
      humanSelected === 'scissors' && computerSelected === 'paper') 
    {
      humanScore++;
      changeBgColor(humanChoiceBox, computerChoiceBox, 'human', true);
      changeBgColor(humanScoreBoard[gameRounds-1], computerScoreBoard[gameRounds-1], 'human', false);
    } else if (humanSelected == computerSelected){
      changeBgColor(humanChoiceBox, computerChoiceBox, 'draw', true);
      changeBgColor(humanScoreBoard[gameRounds-1], computerScoreBoard[gameRounds-1], 'draw', false);
    } else {
      computerScore++;
      changeBgColor(humanChoiceBox, computerChoiceBox, 'computer', true);
      changeBgColor(humanScoreBoard[gameRounds-1], computerScoreBoard[gameRounds-1], 'computer', false);
    }

    updateScoreBoard();

    if(gameRounds == 5) {endGame()};
    console.log(`Human: ${humanScore} || Computer: ${computerScore}`);
}

/* The gameplay for the slot machine
Type 1:
User clicks start
The computer picks a random nubmer
After the time (let's say 10 seconds) the slot stops at that random number

Type 2:
User hits the stop button
The machine stops after some time
This some time can be a fixed number, which will make this a skill based game
Or could be totally random? or vary slightly after every press

The logic for the rotation of the slot
Create an array of Rock Paper Scissors
Switch through each of the elements and show it on the screen
Increase the time after each loop of the array (to give the slot slowing effect)
The increase in time should not be linear it should be exponential
Stopping logic:
  if increase in time > some pre defined number
  and, the current item is the chosen one by random number
  stop the loop
*/

let newRpsArr = document.querySelectorAll(".right .rps-options div img");
let rpsArr = [...newRpsArr];
let newArr = [];
let timeout;

function changeSlotScreen(element, timeoutInterval, count) {
  // I don't know what is going on here, please don't touch it
  setTimeout(() => {
    element.classList.add('choice-hover');
    updateSelected(element);
  }, timeoutInterval-(timeoutInterval/10));

  timeout = setTimeout(() => {
    if (count == newArr.length-1) {
      element.classList.add('choice-hover');
      computerSelected = document.querySelector('.right .rps-choice img').src;
      computerSelected = re.exec(computerSelected)[0];
      playGame();
      enableOptions();
    }
    else {element.classList.remove('choice-hover')}
  }, timeoutInterval);
}

function loopArr() {
  newArr = Array(30).fill(rpsArr).flat();
  let computerChoice = Math.floor(Math.random()*3);
  for (let i = 0; i < computerChoice; i++) {
    newArr.push(rpsArr[i]);
  }
  
/* 
  some maths for the time
  some other time too much maths here

  let timeArr = Array(newArr.length).fill(1000);
  let timeNewArr = [];
  for (let i = 0; i < timeArr.length; i++) {
    timeNewArr.push(Math.ceil(Math.pow(1000, ((i+1)/timeArr.length))));
  }

  for (let i = 0; i < timeNewArr.length; i++) {
    timeArr[i] = timeArr[i] - timeNewArr[timeNewArr.length-(i+1)];
  }
*/
  
  for (let i = 0; i < newArr.length; i++) {
    let timeoutInterval = Math.pow(5000, i/newArr.length);
    setTimeout(() => changeSlotScreen(newArr[i], timeoutInterval, i), timeoutInterval); 
  }
}

//computerStartBtn.addEventListener('click', loopArr);


// Code for the UI

let rpsOptions = document.querySelectorAll('.left .rps-options div');
let rpsChoice;

rpsOptions.forEach(el => el.addEventListener("click", optionClicked));

function optionClicked(e) {
  if (gameRounds != 5) {
    updateSelected(e.target);
    humanSelected = e.target.src;
    humanSelected = re.exec(humanSelected)[0];
    loopArr();
    disableOptions();  
  }
}

replayButton.addEventListener('click', ()=>{
  clearScoreBoard();
  finishedPopup.style.transform = "translateY(200px)";
});

function endGame() {
    finishedPopup.style.transform = "translateY(-20px)";
    disableOptions();

    let pText = finishedPopup.childNodes[1];
    if (humanScore > computerScore) {
      pText.textContent = "Hoooman Wins!!!";
      startConfetti();
    } else if (computerScore > humanScore) {
      pText.textContent = "Hooman will try again";
    } else {
      pText.textContent = "Computer did not win!";
    }
    
    humanScore = 0;
    computerScore = 0; 
    console.log('game finished');
}

function disableOptions() {
  rpsOptions.forEach(el => {
    let image = el.firstElementChild;
    image.classList.remove('hover');
    image.style.cursor = "auto";
    el.removeEventListener("click", optionClicked);
  });
}

function enableOptions() {
  rpsOptions.forEach(el => {
    let image = el.firstElementChild;
    image.classList.add('hover');
    image.style.cursor = "pointer";
    el.addEventListener("click", optionClicked);
  });
}

function updateSelected(element) {
  rpsChoice = element.closest('.rps-options').nextElementSibling;
  rpsChoice.innerHTML = '';
  const img = document.createElement('img');
  img.src = element.src ;
  img.classList.add('selected-option');
  rpsChoice.appendChild(img);
}


function changeBgColor(humanSide, computerSide, winner, animateColor) {
  if (winner === 'human') {
    humanSide.style.backgroundColor = winColor;
    computerSide.style.backgroundColor = loseColor;
  } else if (winner === 'computer') {
    computerSide.style.backgroundColor = winColor;
    humanSide.style.backgroundColor = loseColor;   
  } else if (winner === 'draw') {
    humanSide.style.backgroundColor = computerSide.style.backgroundColor = drawColor;
  }
  
  if (animateColor === true) {
    setTimeout(() => {
      humanSide.style.backgroundColor = computerSide.style.backgroundColor = normalColor;
    }, 300); 
  }
}

function updateScoreBoard() {

  let scoreImage = document.createElement('img');
  scoreImage.classList.add('score-img');

  // human
  scoreImage.src = `./images/${humanSelected}.png`;
  humanScoreBoard[gameRounds-1].appendChild(scoreImage.cloneNode(true));
  
  // computer
  scoreImage.src = `./images/${computerSelected}.png`;
  computerScoreBoard[gameRounds-1].appendChild(scoreImage.cloneNode(true));
}

function clearScoreBoard() {
  gameRounds = 0;
  let scoreBoard = document.querySelectorAll('.score-board div');
  
  document.querySelectorAll('.rps-choice').forEach((el) => {
  if (el.firstChild) el.removeChild(el.firstChild) 
  });
  
  scoreBoard.forEach((el) => {
    el.style.backgroundColor = normalColor;
    
    if(el.firstChild) {
      el.removeChild(el.firstChild);
    };
  });
}

// Confetti Script

function startConfetti() {
  const duration = 5 * 1000,
    animationEnd = Date.now() + duration,
    defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
}


// dialog script

let dialogBox = document.querySelector('dialog');
let warningButton = document.querySelector('.bottom-div > button');
let dialogCloseBtn = document.querySelector('dialog .top button');

warningButton.addEventListener('click', () => {
  dialogBox.show();
})

dialogCloseBtn.addEventListener('click', () => {
  dialogBox.close();
})
