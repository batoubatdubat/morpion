const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "morpion.html"));
});

// 🧠 Quand un joueur se connecte
io.on("connection", (socket) => {
  console.log("👤 Nouveau joueur :", socket.id);

  // Le joueur rejoint une "room" (ex : morpion-simple, morpion-2...)
  socket.on("rejoindre_room", (roomName) => {
    socket.join(roomName);
    console.log(`➡️ ${socket.id} a rejoint la room ${roomName}`);
  });

  // Quand un joueur joue un coup
  socket.on("jouer_coup", (data) => {
    // Envoie le coup à l’autre joueur de la même room
    socket.to(data.room).emit("maj_grille", data);
  });

  socket.on("disconnect", () => {
    console.log("❌ Joueur déconnecté :", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`✅ Serveur Socket.IO lancé sur le port ${PORT}`);
});
