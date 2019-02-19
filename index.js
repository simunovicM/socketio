var app = require('express')();
var server = require('http').createServer(app);

// app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // next();
// });

var io = require('socket.io').listen(server);

var port = process.env.OPENSHIFT_INTERNAL_PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;

io.on('connection', function(socket){
  console.log('a user connected');
  socket.emit('connection');
  
  socket.on('testMessage', function() {
	 setTimeout(function() { socket.emit('hello', Math.random()) },1); 
  });
});

server.listen(port, function(){
  console.log('listening on *:' + port);
});
