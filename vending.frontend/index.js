var camIn = require('http').createServer();
var camOut = require('http').createServer();
var ioIn = require('socket.io')(camIn);
var ioOut = require('socket.io')(camOut);

var socketIn = {};
var socketOut = {};

ioIn.on('connection', function(socket){
  socketIn = socket;
  console.log("CAM CONNECTED");
  
  socket.on('canvas', function(data){
  	if (socketOut) socketOut.emit("canvas",data);
  	console.log("GOT DATA");
  });
  
  socket.on('disconnect', function(){});
});

ioOut.on('connection', function(socket){
  socketOut = socket;
  console.log("ADMIN CONNECTED");

  socket.on('event', function(data){
  	if (socketOut) socketOut.emit("event",data);
  	console.log("SENT EVENT");
  });

  socket.on('disconnect', function(){});
});


camIn.listen(3000);
camOut.listen(3001);