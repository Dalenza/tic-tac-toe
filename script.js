import utils from "./utils.js";

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

const winningConfigs = utils.winningConfigs;

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
const tieMsg = "draw";

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
    if (utils.checkForWin(arrX, win)) {
      overlay.classList.remove("is-hidden");
      msg.classList.remove("is-hidden");
      winMsg = "player X won the game";
      msg.append(winMsg);
      return;
    }
    if (utils.checkForWin(arrO, win)) {
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
