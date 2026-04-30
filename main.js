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

const squares = document.querySelectorAll("[data-index]");
console.log(squares);

squares.forEach((square) => {
  square.addEventListener("click", function (e) {
    console.log(e.target.dataset.index);

    const index = parseInt(e.target.dataset.index);

    if (xMoves.includes(index) || oMoves.includes(index)) {
      console.log("Square already taken");
      return;
    }
  });
});
