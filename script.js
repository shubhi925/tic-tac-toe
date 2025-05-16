let player1 = true;
let playerXWins = 0;
let playerOWins = 0;

const showPlayer = document.querySelector(".showPlayer");
const scoreBox = document.querySelector(".scoreBox");

const resetBtn = document.querySelector(".resetBtn");

resetBtn.addEventListener("click", () => {
  resetBoard();
});
const boxes = document.querySelectorAll(".box");
boxes.forEach((box, index) => {
  box.classList.add(
    "border",
    "border-white",
    "text-2xl",
    "aspect-square",
    "flex",
    "items-center",
    "justify-center",
    "text-center",
    "w-full",
    "h-full",
    "border-box"
  );

  box.addEventListener("click", () => {
    handleClick(index);
  });
});

const winningCases = [
  // columns
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonals
  [0, 4, 8],
  [2, 4, 6],
];

function isBoardFull() {
  return [...boxes].every((box) => box.textContent !== "");
}

function resetBoard() {
  boxes.forEach((box) => {
    box.textContent = "";
  });

  player1 = true;
  playerXWins = 0;
  playerOWins = 0;

  showPlayer.textContent = "Player X's turn";
}

function checkScore(player) {
  return winningCases.reduce((acc, winningCase) => {
    const iswinningCombo = winningCase.every(
      (index) => boxes[index].textContent === player
    );
    return acc + (iswinningCombo ? 1 : 0);
  }, 0);
}

function handleClick(index) {
  if (boxes[index].textContent !== "") {
    return;
  }
  const currentPlayer = player1 ? "X" : "O";
  boxes[index].textContent = currentPlayer;

  playerXWins = checkScore("X");
  playerOWins = checkScore("O");

  if (isBoardFull()) {
    if (playerXWins > playerOWins) {
      scoreBox.textContent = "Player X won! ";
    } else if (playerXWins < playerOWins) {
      scoreBox.textContent = "Player O won!";
    } else {
      scoreBox.textContent = "It's a draw! ";
    }

    setTimeout(resetBoard, 3000);
    return;
  }

  player1 = !player1;
  showPlayer.textContent = player1 ? `Player X's turn` : `Player O's turn`;
}
