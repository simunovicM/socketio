var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);;
io.on('connection', function(socket){
  console.log('a user connected');
  socket.emit('connection');
});

server.listen(8000, function(){
  console.log('listening on *:8000');
});
