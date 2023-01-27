console.log("hello");


// get all the buttons&texts 
const newGameBtn = document.querySelector(".new-game-btn");
const RollBtn = document.querySelector(".roll-dice-btn");
const holdBtn = document.querySelector(".hold-btn");
const playerOneScore = document.querySelector(".s1");
const playerTwoScore = document.querySelector(".s2");
const playerOne = document.querySelector(".p1");
const playerTwo = document.querySelector(".p2");
const current_1 = document.querySelector(".c1");
current_1.innerText = "0"
const current_2 = document.querySelector(".c2");
current_2.innerText = "0"
const diceOne = document.querySelector(".left-dice");
const diceTwo = document.querySelector(".right-dice");


// ovelay:=> 
const overlay = document.querySelector(".overlay");
const p1 = document.getElementById("player1-name");
const p2 = document.getElementById("player2-name");
const winScore = document.getElementById("win-score");
const startGameBtn = document.getElementById("start-game-btn");
const box2 = document.querySelector(".right-box");
const box1 = document.querySelector(".left-box");
const winnerPos = document.getElementById("winnerName");

// global virables
let startPlayer = pickPlayer();


// StartGame Button
startGameBtn.addEventListener("click", () => {
  if (p1.value && p2.value && winScore.value > 0) {
    playerOne.innerText = p1.value;
    playerTwo.innerText = p2.value;
    overlay.style.display = "none";
    startPlayer = pickPlayer();
    console.log(startPlayer);
    document.querySelector(".status-left").innerText = ``;
    document.querySelector(".status-right").innerText = ``;

  } else {
    alert("Please fill up all the fields");
  }
})


// pressing on new Game
// restat game
newGameBtn.addEventListener("click", () => {
  overlay.style.display = "block";
  playerTwoScore.innerText = "0";
  playerOneScore.innerText = "0";
  current_1.innerText = "0";
  current_2.innerText = "0";

});



// pick Player =>
function pickPlayer() {
  let rnd = Math.floor(Math.random() * 2) + 1;
  if (rnd === 1) {
    return playerOne.innerText;
  } else {
    return playerTwo.innerText;
  }
}

// generateNumberbtw 1 -6 
function generateChance() {
  return Math.floor(Math.random() * 6) + 1;
}


// roll button =>
RollBtn.addEventListener("click", () => {



  if (startPlayer === playerOne.innerText) {
    let total;
    box2.style.opacity = ".5";
    let res1 = generateChance();
    res2 = generateChance();
    diceOne.src = "./imgs/dice-" + res1 + ".png";
    diceTwo.src = "./imgs/dice-" + res2 + ".png";
    let before = parseInt(current_1.innerText);
    total = res1 + res2 + before
    current_1.innerText = total;


  } else if (startPlayer === playerTwo.innerText) {
    let total;
    box1.style.opacity = ".5";
    let res1 = generateChance();
    let res2 = generateChance();
    diceOne.src = "./imgs/dice-" + res1 + ".png";
    diceTwo.src = "./imgs/dice-" + res2 + ".png";
    total = res1 + res2 + parseInt(current_2.innerText);
    current_2.innerText = total;
  }
})



// hold button 
holdBtn.addEventListener("click", () => {
  debugger
  let total_2 = Number(playerTwoScore.innerText);
  let total_1 = Number(playerOneScore.innerText);
  let test2 = total_2 + Number(current_2.innerText)
  let test1 = total_1 + Number(current_1.innerText)


  //check if current before hold
  if (current_1.innerText === "0" && current_2.innerText === "0") {
    alert("You Can't hold withOut To Roll First")
    return;
  }

//check winner
  if (startPlayer === playerTwo.innerText && test2 > Number(winScore.value) || test1 === Number(winScore.value)) {
    document.getElementById("alert-message").innerText = `Player ${playerOne.innerText} wins!`;
    document.getElementById("alert-overlay").style.display = "block";
    document.querySelector(".status-left").innerText = `Win!`;
    document.querySelector(".status-right").innerText = `Fail!`;
    playerTwoScore.innerText = "0";
    playerOneScore.innerText = "0";
    current_1.innerText = "0";
    current_2.innerText = "0";
  } else if (startPlayer === playerOne.innerText && test1 > Number(winScore.value) || test2 === Number(winScore.value)) {
    document.getElementById("alert-message").innerText = `Player ${playerTwo.innerText} wins!`;
    document.querySelector(".status-left").innerText = `faill!`;
    document.querySelector(".status-right").innerText = `Win!`;
    document.getElementById("alert-overlay").style.display = "block";
    playerTwoScore.innerText = "0";
    playerOneScore.innerText = "0";
    current_1.innerText = "0";
    current_2.innerText = "0";


  }



//changin players
  if (startPlayer === playerTwo.innerText) {
    playerTwoScore.innerText = Number(current_2.innerText) + total_2;
    box1.style.opacity = "1";
    startPlayer = playerOne.innerText;
    current_2.innerText = "0"
  } else if (startPlayer === playerOne.innerText) {
    playerOneScore.innerText = Number(current_1.innerText) + total_1;
    box2.style.opacity = "1";
    startPlayer = playerTwo.innerText;
    current_1.innerText = "0"
  }
})


// play agian
function playAgain() {
  debugger
  document.getElementById("alert-overlay").style.display = "none";
  overlay.style.display = "block";
  playerTwoScore.innerText = "0";
  playerOneScore.innerText = "0";
  current_1.innerText = "0";
  current_2.innerText = "0";
}