const score = document.querySelector(".score");
const optionScene = document.querySelector(".options");
const fightScene = document.querySelector(".fight");
const options = document.querySelectorAll(".options .option");
const playerPick = document.querySelector(".fight__playerPick .option");
const playerPickImg = document.querySelector(".fight__playerPick img");

const state = {
  playerScore: localStorage.getItem("playerScore"),
  computerScore: localStorage.getItem("computerScore"),
};

//set current score
score.innerText = state.playerScore - state.computerScore;

options.forEach((option) =>
  option.addEventListener("click", (e) => {
    createFightScene(e.currentTarget.id);
  })
);

const createOptionsScene = () => {};

const createFightScene = (pick) => {
  console.log(pick);
  optionScene.classList.add("hide");
  fightScene.classList.remove("hide");

  playerPick.id = pick;
  playerPickImg.src = `./src/images/icon-${pick}.svg`;
};
