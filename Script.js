const choices = ["Rock", "Paper", "Scissors"];
let humanScore = 0;
let computerScore = 0;
let buttonStrategyListeners = true;

document.querySelector(".player.score").textContent = humanScore;
document.querySelector(".computer.score").textContent = computerScore;

function getComputerChoice() {
  let indexChoice = Math.floor(Math.random() * choices.length);
  const computerChoice = choices[indexChoice].toLowerCase();
  return computerChoice;
}

const buttons = document.querySelectorAll(".control > button");
function startRound(event) {
  humanChoice = event.target.id;
  computerChoice = getComputerChoice();
  playRound(humanChoice, computerChoice);
}
buttons.forEach((button) => {
  button.addEventListener("click", startRound);
});

function playRound(humanChoice, computerChoice) {
  const playerScoreField = document.querySelector(".player");
  const computerScoreField = document.querySelector(".computer");
  const winnerField = document.querySelector(".winner");
  const roundWinnerField = document.querySelector(".round-winner");
  switch (humanChoice) {
    case "rock":
      switch (computerChoice) {
        case "rock":
          roundWinnerField.textContent = "Tie! Both players have chosen rock.";
          break;
        case "paper":
          roundWinnerField.textContent = "You lose! Paper beats Rock.";
          ++computerScore;
          break;
        case "scissors":
          roundWinnerField.textContent = "You win! Rock beats Scissors.";
          ++humanScore;
          break;
      }
      break;
    case "paper":
      switch (computerChoice) {
        case "rock":
          roundWinnerField.textContent = "You win! Paper beats Rock.";
          ++humanScore;
          break;
        case "paper":
          roundWinnerField.textContent = "Tie! Both players have chosen paper.";
          break;
        case "scissors":
          roundWinnerField.textContent = "You lose! Scissors beats Paper.";
          ++computerScore;
          break;
      }
      break;
    case "scissors":
      switch (computerChoice) {
        case "rock":
          roundWinnerField.textContent = "You lose! Rock beats Scissors.";
          ++computerScore;
          break;
        case "paper":
          roundWinnerField.textContent = "You win! Scissors beats paper.";
          ++humanScore;
          break;
        case "scissors":
          roundWinnerField.textContent =
            "Tie! Both players have chosen scissors.";
          break;
      }
      break;
  }
  playerScoreField.textContent = `${humanScore}`;
  computerScoreField.textContent = `${computerScore}`;
  if (humanScore === 5) {
    if (winnerField.classList.contains("computer-win")) {
      winnerField.classList.remove("computer-win");
    }
    winnerField.classList.add("player-win");
    winnerField.textContent = "You win the game!";
    buttons.forEach((button) =>
      button.removeEventListener("click", startRound)
    );
    buttonStrategyListeners = false;
  } else if (computerScore === 5) {
    if (winnerField.classList.contains("player-win")) {
      winnerField.classList.remove("player-win");
    }
    winnerField.classList.add("computer-win");
    winnerField.textContent = "Computer wins the game!";
    buttons.forEach((button) =>
      button.removeEventListener("click", startRound)
    );
    buttonStrategyListeners = false;
  }
}

const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", () => {
  humanScore = 0;
  computerScore = 0;
  document.querySelector(".round-winner").textContent = "";
  document.querySelector(".winner").textContent = "";
  document.querySelector(".player.score").textContent = humanScore;
  document.querySelector(".computer.score").textContent = computerScore;
  if (!buttonStrategyListeners) {
    buttons.forEach((button) => {
      button.addEventListener("click", startRound);
    });
  }
});
