// import utils from "./utils.js";
// console.log(utils);
function checkForWin(arr, winConfig) {
  // arr = [1,2,3,4]
  // generateCombos
  // while(i < n-2)
  // for(j = i+1 ; j < i+3)
  const n = arr.length;
  for (let i = 0; i < n - 2; i++) {
    let sub = arr[i];
    for (let k = i + 1; k < n - 1; k++) {
      sub = arr[i] + arr[k];
      for (let j = k + 1; j < n; j++) {
        sub += arr[j];
        if (sub === winConfig) {
          return true;
        }
        sub = arr[i] + arr[k];
      }
    }
    sub = arr[i];
  }
  return false;
}

function resetGame() {
  const resetBtn = document.querySelector(".btn--reset");
  resetBtn.addEventListener("click", () => {
    gameState = {
      counter: 0,
      turn: "x",
      playerX: {
        plays: [],
      },
      playerO: {
        plays: [],
      },
    };
    cells.forEach((cell) => {
      cell.innerHTML = "";
    });
  });
}

const winningConfigs = ["123", "456", "789", "147", "258", "369", "159", "357"];

let gameState = {
  counter: 0,
  turn: "x",
  playerX: {
    plays: [],
  },
  playerO: {
    plays: [],
  },
};

let winMsg;
const tieMsg = "tie";

//fillCell
//updateGameState
//resetGameState
//checkGameState

function fillCell(cell) {
  if (!cell.innerHTML) {
    cell.innerHTML = `<i class="fa-solid fa-${gameState.turn}"></i>`;
    setTimeout(() => {
      cell.firstChild.classList.add("active");
    }, 50);

    updateGameState(cell);
  }
}

function updateGameState(cell) {
  gameState.turn === "x"
    ? gameState.playerX.plays.push(cell.classList[1])
    : gameState.playerO.plays.push(cell.classList[1]);
  gameState.counter++;
  gameState.turn = gameState.turn === "x" ? "o" : "x";
}

function replayGame() {
  const replayBtn = document.querySelector(".btn--replay");
  replayBtn.addEventListener("click", () => {
    gameState = {
      counter: 0,
      turn: "x",
      playerX: {
        plays: [],
      },
      playerO: {
        plays: [],
      },
    };
    overlay.classList.add("is-hidden");
    msg.classList.add("is-hidden");
    msg.removeChild(msg.lastChild);
    cells.forEach((cell) => {
      cell.innerHTML = "";
    });
  });
}

function checkGameState() {
  const arrX = gameState.playerX.plays.sort((a, b) => a - b);
  const arrO = gameState.playerO.plays.sort((a, b) => a - b);
  for (let win of winningConfigs) {
    if (checkForWin(arrX, win)) {
      overlay.classList.remove("is-hidden");
      msg.classList.remove("is-hidden");
      winMsg = "player X won the game";
      msg.append(winMsg);
      return;
    }
    if (checkForWin(arrO, win)) {
      overlay.classList.remove("is-hidden");
      msg.classList.remove("is-hidden");
      winMsg = "player O won the game";
      msg.append(winMsg);
      return;
    }
  }
  if (gameState.counter === 9) {
    overlay.classList.remove("is-hidden");
    msg.classList.remove("is-hidden");
    msg.append(tieMsg);
    return;
  }
}

const cells = document.querySelectorAll(".cell");
const overlay = document.querySelector(".overlay");
const msg = document.querySelector(".msg");
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    fillCell(cell);
    checkGameState();
  });
});
resetGame();
replayGame();

// computer is going to pick a number , that number will be mapped to an html element through class
