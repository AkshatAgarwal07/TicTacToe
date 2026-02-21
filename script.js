// Select elements
const cells = document.querySelectorAll(".cell");
const player1Text = document.getElementById("player1");
const player2Text = document.getElementById("player2");
const resultText = document.getElementById("result");
const resetBtn = document.getElementById("resetBtn");
// Game state
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X"; // Player 1 = X, Player 2 = O
let gameActive = true;

// Winning combinations
const winPatterns = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

// Add click event to each cell
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleCellClick(cell, index));
});

function handleCellClick(cell, index) {

  if (board[index] !== "" || !gameActive) return;

  // Place symbol
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  // Check winner
  if (checkWinner()) {
    if (currentPlayer === "X") {
      player1Text.textContent = "Player 1 Wins!";
      player2Text.textContent = "";
      resultText.textContent = "Player 1 Wins!";
      resultText.classList.add("show-result");
    } else {
      player2Text.textContent = "Player 2 Wins!";
      player1Text.textContent = "";
      resultText.textContent = "Player 2 Wins!";
      resultText.classList.add("show-result");
    }
    gameActive = false;
    return;
  }

  // Check draw
  if (!board.includes("")) {
    player1Text.textContent = "Game Draw!";
    player2Text.textContent = "";
    resultText.textContent = "Game Draw!";
    resultText.classList.add("show-result");
    gameActive = false;
    return;
  }

  // Switch player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateTurnText();
}

function checkWinner() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    );
  });
}
function updateTurnText() {

  player1Text.classList.remove("active-player");
  player2Text.classList.remove("active-player");

  if (currentPlayer === "X") {
    player1Text.textContent = "Player 1's turn";
    player2Text.textContent = "";
    player1Text.classList.add("active-player");
  } else {
    player2Text.textContent = "Player 2's turn";
    player1Text.textContent = "";
    player2Text.classList.add("active-player");
  }
}
resetBtn.addEventListener("click", resetGame);

function resetGame() {

  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";

  cells.forEach(cell => {
    cell.textContent = "";
    cell.style.backgroundColor = "#111827";
  });

  resultText.textContent = "Who's the WINNER..!";
  resultText.classList.remove("show-result");

  updateTurnText();
}