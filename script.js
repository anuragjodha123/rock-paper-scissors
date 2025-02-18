
let humanScore = 0;
let computerScore = 0;

var re = new RegExp('(?<=images\/)(.*?)(?=\.png)');

let humanSelected;
let computerSelected;

function playGame() {  
    if (
      humanSelected === 'rock' && computerSelected === 'scissors' ||
      humanSelected === 'paper' && computerSelected === 'rock' ||
      humanSelected === 'scissors' && computerSelected === 'paper') 
    {
      humanScore++;
    } else if (humanSelected == computerSelected){
      console.log('draw');
    } else {
      computerScore++;
    }

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
  updateSelected(e.target);
  humanSelected = e.target.src;
  humanSelected = re.exec(humanSelected)[0];
  loopArr();

  disableOptions();
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

