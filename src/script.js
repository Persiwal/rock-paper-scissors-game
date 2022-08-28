const score = document.querySelector(".score");
const optionScene = document.querySelector(".options");
const fightScene = document.querySelector(".fight");
const options = document.querySelectorAll(".options .option");
const playerPick = document.querySelector(".fight__playerPick .option");
const playerPickImg = document.querySelector(".fight__playerPick img");
const computerPickContainer = document.querySelector(".fight__computerPick");
const computerPick = document.querySelector(".fight__computerPick .option");
const computerPickImg = document.querySelector(".fight__computerPick img");
const pickPlaceholder = document.querySelector(".pickPlaceholder");
const result = document.querySelector(".fight__result");
const resultText = document.querySelector(".fight__result h4");
const playAgainButton = document.querySelector(".fight__result .button");

const state = {
  playerScore: localStorage.getItem("playerScore") | 0,
  computerScore: localStorage.getItem("computerScore") | 0,
};

const setCurrentScore = () => {
  score.innerText = state.playerScore - state.computerScore;
};

setCurrentScore();

options.forEach((option) =>
  option.addEventListener("click", (e) => {
    createFightScene(e.currentTarget.id);
  })
);

const resetScene = () => {
  result.classList.add("hide");
  fightScene.classList.add("hide");
  optionScene.classList.remove("hide");
  computerPick.classList.add("hide");
  computerPickContainer.appendChild(pickPlaceholder);
};

const generateComputerPick = () => {
  //create random number between in interval 0-2
  const randomPick = Math.floor(Math.random() * (2 - 0 + 1)) + 0;

  computerPickContainer.removeChild(pickPlaceholder);
  computerPick.id = options[randomPick].id;
  computerPickImg.src = `./src/images/icon-${computerPick.id}.svg`;
  computerPickImg.alt = computerPick.id;
  computerPick.classList.remove("hide");
};

const chooseWinner = () => {
  result.classList.remove("hide");

  if (playerPick.id === computerPick.id) {
    resultText.innerText = "DRAW";
  } else if (playerPick.id === "scissors" && computerPick.id === "paper") {
    resultText.innerText = "YOU WIN";
  } else if (playerPick.id === "paper" && computerPick.id === "scissors") {
    resultText.innerText = "YOU LOSE";
  } else if (playerPick.id === "rock" && computerPick.id === "scissors") {
    resultText.innerText = "YOU WIN";
  } else if (playerPick.id === "scissors" && computerPick.id === "rock") {
    resultText.innerText = "YOU LOSE";
  } else if (playerPick.id === "paper" && computerPick.id === "rock") {
    resultText.innerText = "YOU WIN";
  } else if (playerPick.id === "rock" && computerPick.id === "paper") {
    resultText.innerText = "YOU LOSE";
  }

  if (resultText.innerHTML === "YOU WIN") {
    state.playerScore++;
    localStorage.setItem("playerScore", state.playerScore);
    setCurrentScore();
  } else if (resultText.innerHTML === "YOU LOSE") {
    state.computerScore++;
    localStorage.setItem("computerScore", state.computerScore);
    setCurrentScore();
  }
};

const createFightScene = (pick) => {
  optionScene.classList.add("hide");
  fightScene.classList.remove("hide");

  playerPick.id = pick;
  playerPickImg.src = `./src/images/icon-${pick}.svg`;

  setTimeout(() => {
    generateComputerPick();
    chooseWinner();
  }, 1000);
};

playAgainButton.addEventListener("click", () => {
  resetScene();
});
