const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Sert les fichiers statiques (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Route racine → renvoie la page HTML principale
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "morpion.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur le port ${PORT}`);
});
