const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Handle incoming socket.io connections
io.on('connection', (socket) => {
  console.log('A client connected.');

  // Handle custom events from the client
  socket.on('customEvent', (data) => {
    console.log('Received custom event:', data);

    // Emit a response event back to the client
    socket.emit('responseEvent', 'Hello from the server!');
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('A client disconnected.');
  });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/templates/index.html');
  });

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
