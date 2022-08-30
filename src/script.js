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

const winningsResultsMap = {
  paper: ["rock"],
  rock: ["scissors"],
  scissors: ["paper"],
};

const setCurrentScore = () => {
  score.innerText = state.playerScore - state.computerScore;
};

setCurrentScore();

options.forEach((option) =>
  option.addEventListener("click", (e) => {
    createFightScene(e.currentTarget.dataset.id);
  })
);

const resetScene = () => {
  result.classList.add("hide");
  fightScene.classList.add("hide");
  optionScene.classList.remove("hide");
  computerPick.classList.add("hide");
  computerPickContainer.appendChild(pickPlaceholder);
  playerPick.classList.remove("winner");
  computerPick.classList.remove("winner");
};

const createFightScene = (pick) => {
  optionScene.classList.add("hide");
  fightScene.classList.remove("hide");

  playerPick.dataset.id = pick;
  playerPickImg.src = `./src/images/icon-${pick}.svg`;

  setTimeout(() => {
    generateComputerPick();
    showResult();
  }, 1000);
};

const generateComputerPick = () => {
  //create random number in interval 0-2
  const randomPick = Math.floor(Math.random() * options.length);

  computerPickContainer.removeChild(pickPlaceholder);
  computerPick.dataset.id = options[randomPick].dataset.id;
  computerPickImg.src = `./src/images/icon-${computerPick.dataset.id}.svg`;
  computerPickImg.alt = computerPick.dataset.id;
  computerPick.classList.remove("hide");
};

const showResult = () => {
  result.classList.remove("hide");

  if (playerPick.dataset.id === computerPick.dataset.id) {
    resultText.innerText = "DRAW";
  } else if (
    winningsResultsMap[playerPick.dataset.id].includes(computerPick.dataset.id)
  ) {
    resultText.innerText = "YOU WIN";
    state.playerScore++;
    localStorage.setItem("playerScore", state.playerScore);
    playerPick.classList.add("winner");
    setCurrentScore();
  } else {
    resultText.innerText = "YOU LOSE";
    state.computerScore++;
    localStorage.setItem("computerScore", state.computerScore);
    computerPick.classList.add("winner");
    setCurrentScore();
  }
};

playAgainButton.addEventListener("click", () => {
  resetScene();
});
