var app = require('express')();
var server = require('http').createServer(app);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var io = require('socket.io').listen(server);

var port = process.env.OPENSHIFT_INTERNAL_PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;

var sockets = [];

io.on('connection', function(socket){
	sockets.push(socket);
	console.log('a user connected');
	socket.emit('connection');

	socket.on('testMessage', function() {
		setTimeout(function() { sockets.forEach(f => f.emit('hello', Math.random())) },1); 
	});
	
	socket.on('disconnect', function() {
      console.log('Got disconnect!');

      var i = allClients.indexOf(socket);
      sockets.splice(i, 1);
   });
});

server.listen(port, function(){
  console.log('listening on *:' + port);
});
