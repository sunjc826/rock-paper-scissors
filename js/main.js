function random(x) {
    return Math.floor(Math.random() * x);
}

/*
  JavaScript seems to use the remainder function (%) and not the mathematical modulo fn.
  This means that (-4) % 3 gives -1, and not 2 as in modulo arithmetic.
*/
function modulo(n, mod) {
    return n >= 0 ? (n % mod) : (n % mod + mod); 
}

function toStandardCase(str) {
    return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}

function strToNum(str) {
    str = toStandardCase(str);
    switch (str) {
        case "Rock":
            return 0;
        case "Paper":
            return 1;
        default:
            return 2;
    }
}

function numToStr(x) {
    switch (x) {
        case 0:
            return "Rock";
        case 1:
            return "Paper";
        case 2:
            return "Scissors";
    }
}

function computerPlay() {
    return random(3);
}

/*
function game(rounds) {
    let playerSelection, computerSelection;
    let playerScore = 0;
    let computerScore = 0;
    for (let i = 0; i < rounds; i++) {
        playerSelection = prompt("Please choose: rock, paper, scissors");
        computerSelection = computerPlay();
        let result = playRound(playerSelection, computerSelection);
        if (result == 1) {
            playerScore++;
        } else if (result == 2) {
            computerScore++;
        } else {
            playerScore += 0.5;
            computerScore += 0.5;
        }
    }

    let finalResult;

    if (playerScore > computerScore) {
        finalResult = "You Win!";
    } else if (computerScore > playerScore) {
        finalResult = "You Lose!";
    } else {
        finalResult = "Draw!";
    }

    finalResult += ` Final Score is ${playerScore} : ${computerScore}`;
    return finalResult;
}
*/


let playerScore = 0;
let computerScore = 0;
const ROUNDS = 5;
const resultDisplay = document.querySelector("#results");
const buttons = document.querySelectorAll(".play-button");
const playerDisplay = document.querySelector("#player-result");
const comDisplay = document.querySelector("#computer-result");
const roundDisplay = document.querySelector("#round-result");

buttons.forEach((btn)=> {
    btn.addEventListener("click", playerClick);
});

function playerClick(e) {
    let computerSelection = computerPlay();
    let playerSelection = this.getAttribute("id");
    let result = playRound(playerSelection, computerSelection);
    
    if (result == 1) {
        playerScore++;
    } else if (result == 2) {
        computerScore++;
    } else {
        playerScore += 0.5;
        computerScore += 0.5;
    }
    playerDisplay.textContent = playerScore;
    comDisplay.textContent = computerScore;
    
    
    checkWin();
}

function playRound(playerSelection, computerSelection) {
    playerSelection = strToNum(playerSelection);

    let state, winner, loser;
    let diff = modulo((playerSelection - computerSelection), 3);
    if (diff == 0) {
        state = "Draw"; // draw
        winner = playerSelection;
        loser = computerSelection;
    } else if (diff == 1) {
        state = "Win"; // b wins a
        winner = playerSelection;
        loser = computerSelection;
    } else {
        state = "Lose"; // b loses to a
        winner = computerSelection;
        loser = playerSelection;
    }
    
    
    roundDisplay.textContent = `You ${state}! ${numToStr(winner)} ${diff == 0 ? "draws with" : "beats"} ${numToStr(loser)}`;
    setTimeout(()=>{
        roundDisplay.textContent = "";
    }, 1000);
    return diff;
}

function checkWin() {
    
    if (playerScore + computerScore >= ROUNDS) {
        if (playerScore > computerScore) {
            alert("Player, you da best!");
        } else if (playerScore < computerScore) {
            alert("Player, get terminated.");
        } else {
            alert("Draw");
        }

        playerScore = 0;
        computerScore = 0;
        playerDisplay.textContent = playerScore;
        comDisplay.textContent = computerScore;
    }
    
}