import { Server } from "socket.io";
import { handleRfid } from "../Controllers/rfidController.js";

let io;

export function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("message", (data) => {
      console.log("Message from client:", data);

      socket.emit("message", `Server received: ${data}`);
    });

    socket.on("rfid", (data) => {
      console.log("Received RFID data:", data);
      handleRfid(data, socket);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
}
