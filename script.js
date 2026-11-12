const setupForm = document.querySelector("#setup-form");
const playerInput = document.querySelector("#player-input");
const nameError = document.querySelector("#name-error");
const playArea = document.querySelector("#play-area");
const playerName = document.querySelector("#player-name");
const playerScoreLabel = document.querySelector("#player-score");
const computerScoreLabel = document.querySelector("#computer-score");
const playerNumberLabel = document.querySelector("#player-number");
const computerNumberLabel = document.querySelector("#computer-number");
const roundLabel = document.querySelector("#round-label");
const resultLabel = document.querySelector("#result");
const playButton = document.querySelector("#play-button");
const restartButton = document.querySelector("#restart-button");

let playerScore = 0;
let computerScore = 0;
let round = 1;
let gameOver = false;

setupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = playerInput.value.trim();

  if (!name) {
    nameError.textContent = "Будь ласка, введи своє ім’я.";
    playerInput.setAttribute("aria-invalid", "true");
    playerInput.focus();
    return;
  }

  nameError.textContent = "";
  playerInput.removeAttribute("aria-invalid");
  playerName.textContent = name;
  setupForm.hidden = true;
  playArea.hidden = false;
  playButton.focus();
});

playButton.addEventListener("click", () => {
  if (gameOver) return;

  const playerNumber = Math.floor(Math.random() * 100) + 1;
  const computerNumber = Math.floor(Math.random() * 100) + 1;

  playerNumberLabel.textContent = playerNumber;
  computerNumberLabel.textContent = computerNumber;

  if (playerNumber > computerNumber) {
    playerScore += 1;
    resultLabel.textContent = `${playerName.textContent} отримує очко!`;
  } else if (computerNumber > playerNumber) {
    computerScore += 1;
    resultLabel.textContent = "Очко комп’ютера!";
  } else {
    resultLabel.textContent = "Нічия — жодного очка не нараховано.";
  }

  playerScoreLabel.textContent = playerScore;
  computerScoreLabel.textContent = computerScore;

  if (playerScore === 3 || computerScore === 3) {
    gameOver = true;
    playButton.disabled = true;
    restartButton.hidden = false;
    resultLabel.textContent = playerScore === 3
      ? `Вітаю, ${playerName.textContent}! ви перемогли!`
      : "Комп’ютер переміг. Спробуйте ще раз";
    restartButton.focus();
    return;
  }

  round += 1;
  roundLabel.textContent = `Раунд ${round}`;
});

restartButton.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  round = 1;
  gameOver = false;
  playerScoreLabel.textContent = "0";
  computerScoreLabel.textContent = "0";
  playerNumberLabel.textContent = "—";
  computerNumberLabel.textContent = "—";
  roundLabel.textContent = "Раунд 1";
  resultLabel.textContent = "Натисни кнопку, щоб зіграти!";
  playButton.disabled = false;
  restartButton.hidden = true;
  playButton.focus();
});
