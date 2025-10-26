const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// sert les fichiers HTML / CSS / JS du dossier public
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur le port ${PORT}`);
});
