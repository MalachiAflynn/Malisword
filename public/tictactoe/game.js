const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const statusEl = document.querySelector("#status");
const squares = [...document.querySelectorAll(".square")];
const restartButton = document.querySelector("#restart");

let board = Array(9).fill(null);
let currentPlayer = "X";
let gameOver = false;

function findWinningLine() {
  return WINNING_LINES.find(
    ([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c],
  );
}

function handleClick(event) {
  const index = Number(event.currentTarget.dataset.index);
  if (gameOver || board[index]) return;

  board[index] = currentPlayer;
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  render();
}

function render() {
  squares.forEach((square, i) => {
    square.textContent = board[i] ?? "";
    square.disabled = Boolean(board[i]) || gameOver;
    square.classList.remove("winning");
    if (board[i]) {
      square.dataset.player = board[i];
    } else {
      delete square.dataset.player;
    }
  });

  const line = findWinningLine();

  if (line) {
    gameOver = true;
    statusEl.textContent = `${board[line[0]]} wins!`;
    line.forEach((i) => squares[i].classList.add("winning"));
    squares.forEach((square) => (square.disabled = true));
    return;
  }

  if (board.every(Boolean)) {
    gameOver = true;
    statusEl.textContent = "Draw.";
    return;
  }

  statusEl.textContent = `${currentPlayer}'s turn`;
}

function restart() {
  board = Array(9).fill(null);
  currentPlayer = "X";
  gameOver = false;
  render();
  statusEl.textContent = "X goes first";
}

squares.forEach((square) => square.addEventListener("click", handleClick));
restartButton.addEventListener("click", restart);
