
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


// get sounds
const mainSound = document.getElementById("main-sound");
const rollSound = document.getElementById("roll-sound");
const swooshSound = document.getElementById("swoosh-sound");
const winSound = document.getElementById("win-sound");
const errorSound = document.getElementById("error-sound");
const startSound = document.getElementById("start-sound");






// global virables
let startPlayer = pickPlayer();

// StartGame Button
startGameBtn.addEventListener("click", () => {
  if (p1.value === p2.value) {
    errorSound.play();

    alert("choose different names");
    return;
  }

  if (p1.value && p2.value && winScore.value > 0) {
    playerOne.innerText = p1.value;
    playerTwo.innerText = p2.value;
    overlay.style.display = "none";
    startPlayer = pickPlayer();
    console.log(startPlayer);
    document.querySelector(".status-left").innerText = ``;
    document.querySelector(".status-right").innerText = ``;
    mainSound.play();
    mainSound.loop = true;
    mainSound.volume = 0.3;
    startSound.play();
    startSound.volume = 1;


  } else {
    alert("Please fill up all the fields");
  }
})


// pressing on new Game
// restat game
newGameBtn.addEventListener("click", () => {
  startSound.play();
  startSound.volume = 1;
  document.querySelector(".right-box").classList.remove("player-fail");
  document.querySelector(".left-box").classList.remove("player-fail");
  box1.style.opacity = "1";
  box2.style.opacity = "1";
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

  debugger
  rollSound.pause();
  rollSound.play();
  rollSound.volume = 1;
  if (startPlayer === playerOne.innerText) {
    let total;
    box2.style.opacity = ".5";
    box1.style.opacity = "1";
    let res1 = generateChance();
    let res2 = generateChance();
    diceOne.src = "./imgs/dice-" + res1 + ".png";
    diceTwo.src = "./imgs/dice-" + res2 + ".png";
    if (res1 === 6 && res2 === 6) {
      errorSound.play();
      errorSound.volume = 1;
      box2.style.opacity = ".5";
      box1.style.opacity = "1";
      startPlayer = playerTwo.innerText;
      current_1.innerText = "0";
      alert("you got 6 - 6 ,your current 0 the turn gose to opponent");
      return;
    }
    let before = parseInt(current_1.innerText);
    total = res1 + res2 + before
    current_1.innerText = total;


  } else if (startPlayer === playerTwo.innerText) {
    let total;
    box1.style.opacity = ".5";
    box2.style.opacity = "1";
    let res1 = generateChance();
    let res2 = generateChance();

    diceOne.src = "./imgs/dice-" + res1 + ".png";
    diceTwo.src = "./imgs/dice-" + res2 + ".png";
    if (res1 === 6 && res2 === 6) {
      errorSound.play();
      errorSound.volume = 1;
      box1.style.opacity = "1";
      box2.style.opacity = ".5";
      startPlayer = playerOne.innerText;
      current_2.innerText = "0";
      alert("you got 6 - 6 ,your current now is 0 the turn gose to opponent");
      console.log("6-6");
      return;
    }
    total = res1 + res2 + parseInt(current_2.innerText);
    current_2.innerText = total;
  }
})



// hold button 
holdBtn.addEventListener("click", () => {
  debugger
  swooshSound.play();
  swooshSound.volume = 1;
  let total_2 = Number(playerTwoScore.innerText);
  let total_1 = Number(playerOneScore.innerText);
  let test2 = total_2 + Number(current_2.innerText)
  let test1 = total_1 + Number(current_1.innerText)

  
  //check if current before hold
  if (current_1.innerText === "0" && current_2.innerText === "0") {
    alert("You Can't hold withOut To Roll First")
    return;
  }

  debugger
  //check winner
  if (startPlayer === playerTwo.innerText && test2 > Number(winScore.value) || test1 === Number(winScore.value)) {
    winSound.play();
    document.getElementById("alert-message").innerText = `Player ${playerOne.innerText} wins!`;
    document.querySelector(".p1").innerText = playerOne.innerText;
    document.querySelector(".p2").innerText = playerTwo.innerText;
    addToLocal(playerTwo.innerText);
    let getH1 = getFromLocalSpecific(playerOne.innerText);
    let getH2 = getFromLocalSpecific(playerTwo.innerText);
    if(!getH1){
      getH1=0;
    }
    if(!getH2){
      getH2=0;
    }
    document.querySelector(".p2-score").innerText = getH2.toString();
    document.querySelector(".p1-score").innerText = getH1.toString();
    document.querySelector(".status-left").innerText = `Win!`;
    document.querySelector(".status-right").innerText = `Fail!`;
    document.querySelector(".right-box").classList.add("player-fail");
    
    playerTwoScore.innerText = "0";
    playerOneScore.innerText = "0";
    current_1.innerText = "0";
    current_2.innerText = "0";
  
    document.getElementById("alert-overlay").style.display = "block";

  } else if (startPlayer === playerOne.innerText && test1 > Number(winScore.value) || test2 === Number(winScore.value)) {
    debugger
    winSound.play();
    document.getElementById("alert-message").innerText = `Player ${playerTwo.innerText} wins!`;
    document.querySelector(".p1").innerText = playerOne.innerText;
    document.querySelector(".p2").innerText = playerTwo.innerText;
    addToLocal(playerOne.innerText);
    let getH1 = getFromLocalSpecific(playerOne.innerText);
    let getH2 = getFromLocalSpecific(playerTwo.innerText);
    if(!getH1){
      getH1=0;
    }
    if(!getH2){
      getH2=0;
    }

    document.querySelector(".p2-score").innerText = getH2.toString();
    document.querySelector(".p1-score").innerText = getH1.toString();
    document.querySelector(".status-left").innerText = `faill!`;
    document.querySelector(".status-right").innerText = `Win!`;
    document.querySelector(".left-box").classList.add("player-fail");
    playerTwoScore.innerText = "0";
    playerOneScore.innerText = "0";
    current_1.innerText = "0";
    current_2.innerText = "0";
    document.getElementById("alert-overlay").style.display = "block";


  }



  //changin players
  if (startPlayer === playerTwo.innerText) {
    playerTwoScore.innerText = Number(current_2.innerText) + total_2;
    box1.style.opacity = "1";
    box2.style.opacity = ".5";
    startPlayer = playerOne.innerText;
    current_2.innerText = "0"
  } else if (startPlayer === playerOne.innerText) {
    playerOneScore.innerText = Number(current_1.innerText) + total_1;
    box2.style.opacity = "1";
    box1.style.opacity = ".5";
    startPlayer = playerTwo.innerText;
    current_1.innerText = "0"
  }
})


// play agian
function playAgain() {
  debugger
  startSound.play();
  debugger
  document.querySelector(".right-box").classList.remove("player-fail");
  document.querySelector(".left-box").classList.remove("player-fail");
  document.getElementById("alert-overlay").style.display = "none";
  box1.style.opacity = "1";
  box2.style.opacity = "1";

  playerTwoScore.innerText = "0";
  playerOneScore.innerText = "0";
  current_1.innerText = "0";
  current_2.innerText = "0";
  overlay.style.display = "block";
}




// game setting
const exitBtn = document.querySelector(".exit");
exitBtn.addEventListener("click", () => {
  document.querySelector(".sseting").style.display = "none";

})

const settingBtn = document.querySelector(".settings-button");
settingBtn.addEventListener("click", () => {
  document.querySelector(".sseting").style.display = "block";
});


// mute music
function muteMusic() {
  debugger
  if (mainSound.muted) {
    mainSound.muted = false;
    document.querySelector(".mute-btn").innerText = "Mute";
  } else {
    mainSound.muted = true;
    document.querySelector(".mute-btn").innerText = "UnMute";
  }

}

function muteSoundEffects() {
  if (swooshSound.muted) {
    swooshSound.muted = false;
    winSound.muted = false;
    rollSound.muted = false;
    errorSound.muted = false;
    startSound.muted = false;
    document.querySelector(".mute-btn-sfx").innerText = "Mute";
  } else {
    swooshSound.muted = true;
    winSound.muted = true;
    rollSound.muted = true;
    errorSound.muted = true;
    startSound.muted = true;
    document.querySelector(".mute-btn-sfx").innerText = "UnMute";
  }
}




// add and get from local storage
function addToLocal(winnerName) {
  let Wins = JSON.parse(localStorage.getItem(winnerName));
  if (Wins) {
    let newScore = parseInt(Wins) + 1;
    localStorage.setItem(winnerName, newScore);
    return;
  }
  localStorage.setItem(winnerName, "1");

}

function getFromLocalSpecific(winnerName) {
  return localStorage.getItem(winnerName);
}

// clear localstorage
function clearCache(){
  localStorage.clear();
  let res1 = getFromLocalSpecific(playerOne.innerText);
  let res2 = getFromLocalSpecific(playerTwo.innerText);
  if (res1===null&&res2===null) {
    document.querySelector(".p1-score").innerText = "0";
    document.querySelector(".p2-score").innerText = "0";
  
  }
}