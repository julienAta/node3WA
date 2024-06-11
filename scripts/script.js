const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const main = async () => {
  console.info("Bienvenue dans le jeu de devinettes interactif !");
  let exit = false;

  while (!exit) {
    console.log("\nChoisissez une option :");
    console.log("1. Jouer à un jeu de devinettes");
    console.log("2. Quitter");

    const choice = await askQuestion("Votre choix : ");

    switch (choice) {
      case "1":
        const secretNumber = randomInt(1, 100);
        let guess = null;
        console.log(
          "\nJ'ai choisi un nombre entre 1 et 100. Pouvez-vous le deviner ?"
        );
        while (guess !== secretNumber) {
          guess = parseInt(await askQuestion("Entrez votre devinette : "));
          if (guess < secretNumber) {
            console.log("Trop bas !");
          } else if (guess > secretNumber) {
            console.log("Trop haut !");
          } else {
            console.log("Bravo ! Vous avez deviné le nombre !");
          }
        }
        break;
      case "2":
        exit = true;
        break;
      default:
        console.log("Option non valide. Veuillez choisir 1 ou 2.");
    }
  }

  console.error("Ah c'est comme ça... Au revoir !");
  rl.close();
};

main();
