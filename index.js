// index.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Données en mémoire (on pourrait remplacer par une DB)
let items = [
  { id: 1, name: "Item 1", description: "Premier item" },
  { id: 2, name: "Item 2", description: "Deuxième item" }
];

// -------- ROUTES CRUD --------

// Welcome route
app.get('/', (req, res) => {
  res.json({ message: "Bienvenue sur l'API Node.js déployée sur Azure, liste des items sur: https://api-demo-azure-groupe9-cwe6a7fvfzgabgf4.swedencentral-01.azurewebsites.net/api/items" });
});

// GET : récupérer tous les items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// GET : récupérer un item par ID
app.get('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ error: "Item introuvable" });
  res.json(item);
});

// POST : ajouter un nouvel item
app.post('/api/items', (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ error: "Le champ 'name' est obligatoire" });

  const newItem = {
    id: Date.now(),
    name,
    description: description || ""
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT : modifier un item existant
app.put('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ error: "Item introuvable" });

  const { name, description } = req.body;
  if (name) item.name = name;
  if (description) item.description = description;

  res.json(item);
});

// DELETE : supprimer un item
app.delete('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(i => i.id === id);
  if (index === -1) return res.status(404).json({ error: "Item introuvable" });

  const deleted = items.splice(index, 1);
  res.json({ message: "Item supprimé", deleted });
});

// Bonus : route pour tester la connexion à une DB fictive (ex: Cosmos DB ou MongoDB)
// Ici on simule simplement une réponse
app.get('/api/db-test', (req, res) => {
  res.json({ message: "Connexion à la DB simulée réussie !" });
});


//  IMPORTANT : lancer le serveur
app.listen(port, () => {
  console.log(` Serveur démarré sur: http://localhost:${port}/`);
  console.log(` liste des items sur: http://localhost:${port}/api/items`);
});
