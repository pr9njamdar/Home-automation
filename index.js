const express = require("express");
const WebSocket = require("ws");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/templates/index.html");
});

const wss = new WebSocket.Server({ noServer: true });

var clients = [];
wss.on("connection", (ws) => {
  clients.push(ws);
  console.log(clients.length);
  clients.forEach((client) => {
    client.send("A new ws connected");
  });
  console.log("Websocket connected");

  ws.on("message", (message) => {
    const messageString = message.toString("utf8");
    console.log("Received message from a client", messageString);

    clients.forEach((client) => {
      client.send(messageString);
    });
  });

  ws.on("close", () => {
    const index = clients.indexOf(ws);
    if (index !== -1) {
      clients.splice(index, 1);
    }
    console.log("WebSocket connection closed");
  });
});

const server = app.listen(3000, () => {
  console.log(`Server is running on 3000`);
});

server.on("upgrade", (request, socket, head) => {
  const key = request.headers["sec-websocket-key"];
  if (key && key === "your_esp32_websocket_key") {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  } else {
    socket.destroy();
  }
});
