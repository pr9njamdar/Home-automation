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

app.get('/',(req,res)=>{
  res.sendFile(__dirname+'/templates/index.html')
})

const wsServer=new WebSocketServer({
  httpServer:server,
  autoAcceptConnections:false
})
var clients=[]
wsServer.on('request',async(req)=>{
  var connection = await req.accept(null,req.origin);
  console.log('Ws connection')
  clients.push(connection)
  connection.on('message',(data)=>{
    clients.forEach((client)=>{
      client.send(data.utf8Data)
    })
  console.log(data.utf8Data);

 
  })
})