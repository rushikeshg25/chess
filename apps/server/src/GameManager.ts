import WebSocket from "ws";
import { INIT_GAME } from "./messages";

interface Game {
  id: Number;
  name: String;
  player1: WebSocket;
  player2: WebSocket;
}

export default class GameManager {
  private games: Game[];
  private pendingUser: WebSocket | null;
  private users: WebSocket[];
  constructor() {
    this.games = [];
    this.pendingUser = null;
    this.users = [];
  }
  addUser(socket: WebSocket) {
    this.users.push(socket);
    // this.addHandler(socket);
  }

  removeUser(socker: WebSocket) {
    this.users = this.users.filter((user) => user !== socker);
  }

  private addHandler(socket: WebSocket) {
    socket.on("message", (data) => {
      const message = JSON.parse(data.toString());

      if (message.type === INIT_GAME) {
        if (this.pendingUser) {
        } else {
          this.pendingUser = socket;
        }
      }
    });
  }
}
