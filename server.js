// Importer le module HTTP
import http from "http";

// Définir le port d'écoute
const PORT = 3000;

// Créer le serveur
const server = http.createServer((req, res) => {
  // Définir les en-têtes de réponse par défaut
  res.setHeader("Content-Type", "text/plain");

  // Gérer les différentes routes
  if (req.method === "GET") {
    switch (req.url) {
      case "/":
        res.statusCode = 200;
        res.end("Bienvenue à la page d'accueil");
        break;
      case "/about":
        res.statusCode = 200;
        res.end("À propos de nous");
        break;
      case "/data":
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;
        res.end(JSON.stringify({ message: "Route /data atteinte" }));
        break;
      default:
        res.statusCode = 404;
        res.end("Page non trouvée");
        break;
    }
  } else if (req.method === "POST" && req.url === "/submit") {
    let body = "";

    // Collecter les données du corps de la requête
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    // Traiter les données une fois reçues
    req.on("end", () => {
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 200;
      res.end(JSON.stringify({ receivedData: body }));
    });
  } else {
    res.statusCode = 405;
    res.end("Méthode non autorisée");
  }
});

// Démarrer le serveur
server.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
