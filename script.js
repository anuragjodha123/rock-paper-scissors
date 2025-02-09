function getComputerChoice() {
    let a = Math.ceil(Math.random()*3);

    switch(a) {
        case 1:
            console.log('rock');
            break;
        case 2:
            console.log('paper');
            break;
        case 3:
            console.log('scissors')
            break;
    }
}

function getHumanChoice() {
    return parseInt(prompt("Write your choice in the prompt below. \n 1. Rock \n 2. Paper \n 3. Scissors"));
}