var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var port = process.env.OPENSHIFT_INTERNAL_PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;

io.on('connection', function(socket){
  console.log('a user connected');
  socket.emit('connection');
});

server.listen(port, function(){
  console.log('listening on *:' + port);
});
