import express from "express";
import { WebSocketServer } from "ws";
import GameManager from "./GameManager";

const app = express();
const httpServer = app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

const wss = new WebSocketServer({ server: httpServer });

const gamerManager = new GameManager();

wss.on("connection", (ws) => {
  gamerManager.addUser(ws);

  ws.on("error", (err) => {
    console.log(err);
  });
});
