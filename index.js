var express=require('express')
var app =express();

var WebSocketServer=require('websocket').server
var http = require('http')

var server=http.createServer(app);

app.use(express.json());

const Port=80 ;

server.listen(Port,()=>{
  console.log('listening on port',Port);
});

const wsServer=new WebSocketServer({
  httpServer:server,
  autoAcceptConnections:false
})

wsServer.on('request',async(req)=>{
  var connection = await req.accept(null,req.origin);
  console.log('Ws connection')
  connection.on('message',(data)=>{
    console.log(data.utf8Data);
  })
})