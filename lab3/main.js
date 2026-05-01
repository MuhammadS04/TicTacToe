console.log("JavaScript is running");

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let isPlayerX = true;
let xMoves = [];
let oMoves = [];
let XScores = 0;
let OScores = 0;
let gameover = false;

const squares = document.querySelectorAll("[data-index]");
const displayPlayer = document.querySelector(".display_player");
const XScoreDisplay = document.querySelector(".x_score");
const OScoreDisplay = document.querySelector(".o_score");

displayPlayer.textContent = "It's X's turn";

function CheckWinner(Moves) {
  return winningCombinations.some((combo) => {
    return combo.every((number) => Moves.includes(number));
  });
}

function computerMove() {
  let index;
  do {
    index = Math.floor(Math.random() * 9);
  } while (xMoves.includes(index) || oMoves.includes(index));

  oMoves.push(index);
  squares[index].querySelector(".xo").textContent = "O";

  if (CheckWinner(oMoves)) {
    displayPlayer.textContent = "O Wins!";
    OScores++;
    OScoreDisplay.textContent = OScores;
    gameover = true;
    return;
  }

  if (xMoves.length + oMoves.length === 9) {
    displayPlayer.textContent = "It's a tie!";
    gameover = true;
    return;
  }

  isPlayerX = true;
  displayPlayer.textContent = "It's X's turn";
}

squares.forEach((square) => {
  square.addEventListener("click", function (e) {
    if (gameover || !isPlayerX) return;

    const index = parseInt(e.currentTarget.dataset.index);

    if (xMoves.includes(index) || oMoves.includes(index)) {
      displayPlayer.textContent = "Square already taken!";
      return;
    }

    e.currentTarget.querySelector(".xo").textContent = "X";
    xMoves.push(index);

    if (CheckWinner(xMoves)) {
      displayPlayer.textContent = "X Wins!";
      XScores++;
      XScoreDisplay.textContent = XScores;
      gameover = true;
      return;
    }

    if (xMoves.length + oMoves.length === 9) {
      displayPlayer.textContent = "It's a tie!";
      gameover = true;
      return;
    }

    isPlayerX = false;
    displayPlayer.textContent = "Computer is thinking...";
    setTimeout(computerMove, 500);
  });
});

const newGameBtn = document.querySelector(".new_game");
const resetBtn = document.querySelector(".reset");

newGameBtn.addEventListener("click", function () {
  squares.forEach((square) => {
    square.querySelector(".xo").textContent = "";
  });
  xMoves = [];
  oMoves = [];
  isPlayerX = true;
  gameover = false;
  displayPlayer.textContent = "It's X's turn";
});

resetBtn.addEventListener("click", function () {
  squares.forEach((square) => {
    square.querySelector(".xo").textContent = "";
  });
  xMoves = [];
  oMoves = [];
  isPlayerX = true;
  gameover = false;
  XScores = 0;
  OScores = 0;
  XScoreDisplay.textContent = 0;
  OScoreDisplay.textContent = 0;
  displayPlayer.textContent = "It's X's turn";
});
