const express = require('express');
const WebSocket = require('ws');
const app = express();

const server = app.listen(3000, () => {
  console.log(`Server is running on 3000`);
});

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/templates/index.html')
})

const wss = new WebSocket.Server({ server: server });

var clients=[]
wss.on('connection', (ws) => {
  clients.push(ws)
  console.log(clients.length)
  clients.forEach((client)=>{
    client.send('A new ws connected');
})  
  console.log('Websocket connected')
  
  ws.on('message', (message) => {
    const messageString = message.toString('utf8');
    console.log('Received message a client', messageString);
    
        clients.forEach((client)=>{
            client.send(messageString);
        })  
   
   
   
     
  });
  
  
  ws.on('close', () => {
    const index=clients.indexOf(ws)
    clients=clients.splice(index,1)
    console.log('WebSocket connection closed');
  });
});





server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});
