import express from "express";

const app = express();
const PORT = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Liste des tâches
let tasks = [];

// Route GET pour récupérer toutes les tâches
app.get("/tasks", (req, res) => {
  res.json({ tasks: tasks });
});

// Route POST pour ajouter une nouvelle tâche
app.post("/tasks", (req, res) => {
  const newTask = { id: tasks.length + 1, title: req.body.title };
  tasks.push(newTask);
  res.status(201).json({ message: "Tâche ajoutée avec succès", task: newTask });
});

// Route PUT pour mettre à jour une tâche par ID
app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Tâche non trouvée" });
  }

  tasks[taskIndex].title = req.body.title;
  res.json({
    message: "Tâche mise à jour avec succès",
    task: tasks[taskIndex],
  });
});

// Route DELETE pour supprimer une tâche par ID
app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Tâche non trouvée" });
  }

  const deletedTask = tasks.splice(taskIndex, 1);
  res.json({ message: "Tâche supprimée avec succès", task: deletedTask[0] });
});

// Middleware pour gérer les routes non trouvées et les erreurs
app.use((req, res) => {
  res.status(404).json({ error: "Route non trouvée" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: "Erreur interne du serveur" });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Le serveur est en écoute sur http://localhost:${PORT}`);
});
