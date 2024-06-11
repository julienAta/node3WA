import readline from "readline";
import { appendFile } from "fs";
import { join } from "path";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const choices = ["pierre", "feuille", "ciseau"];
let playerScore = 0;
let computerScore = 0;
let round = 0;
const totalRounds = 3;
const scoresFile = join(process.cwd(), "scores.txt");

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "tie";
  }
  if (
    (playerChoice === "pierre" && computerChoice === "ciseau") ||
    (playerChoice === "feuille" && computerChoice === "pierre") ||
    (playerChoice === "ciseau" && computerChoice === "feuille")
  ) {
    return "player";
  }
  return "computer";
}

function playRound() {
  rl.question("Choisissez pierre, feuille ou ciseau: ", (answer) => {
    const playerChoice = answer.toLowerCase();
    if (!choices.includes(playerChoice)) {
      console.log("Choix invalide, veuillez réessayer.");
      return playRound();
    }

    const computerChoice = getComputerChoice();
    console.log(`Ordinateur a choisi: ${computerChoice}`);

    const winner = determineWinner(playerChoice, computerChoice);
    if (winner === "player") {
      playerScore++;
      console.log("Vous avez gagné cette manche!");
    } else if (winner === "computer") {
      computerScore++;
      console.log("L'ordinateur a gagné cette manche!");
    } else {
      console.log("Égalité!");
    }

    round++;
    if (round < totalRounds) {
      playRound();
    } else {
      endGame();
    }
  });
}

function endGame() {
  console.log(
    `Score final: Joueur ${playerScore} - Ordinateur ${computerScore}`
  );
  const scoreLine = `Ordinateur ${computerScore} - Joueur ${playerScore}\n`;

  appendFile(scoresFile, scoreLine, (err) => {
    if (err) {
      console.error("Erreur lors de l'enregistrement des scores:", err);
    } else {
      console.log("Le score a été enregistré dans le fichier scores.txt");
    }
    rl.close();
  });
}

console.log("Bienvenue au jeu de Pierre-Feuille-Ciseau!");
playRound();
