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
console.log(squares);

function CheckWinner(Moves) {
  return winningCombinations.some((combo) => {
    return combo.every((number) => Moves.includes(number));
  });
}

squares.forEach((square) => {
  square.addEventListener("click", function (e) {
    if (gameover) {
      return;
    }

    console.log(e.currentTarget.dataset.index);
    const index = parseInt(e.currentTarget.dataset.index);

    if (xMoves.includes(index) || oMoves.includes(index)) {
      console.log("Square already taken");
      displayPlayer.textContent = "Square already taken!";
      return;
    }

    const symbol = isPlayerX ? "X" : "O";
    e.currentTarget.querySelector(".xo").textContent = symbol;

    if (isPlayerX) {
      xMoves.push(index);
    } else {
      oMoves.push(index);
    }

    const currentMoves = isPlayerX ? xMoves : oMoves;

    if (CheckWinner(currentMoves)) {
      displayPlayer.textContent = symbol + " Wins!";
      console.log(symbol + " Wins!");

      if (symbol === "X") {
        XScores++;
        XScoreDisplay.textContent = XScores;
      } else {
        OScores++;
        OScoreDisplay.textContent = OScores;
      }

      gameover = true;
      return;
    }

    console.log("X Moves: ", xMoves);
    console.log("O Moves: ", oMoves);

    isPlayerX = !isPlayerX;
    displayPlayer.textContent = isPlayerX
      ? "It's X's turn"
      : "It's O's turn";
  });
});