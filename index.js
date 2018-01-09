const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.broadcast.emit('hi');
  console.log('a user connected', socket.id);
  socket.on('disconnect', function(){
    console.log('user disconnected');
  })
  socket.on('chat message', function(msg){
    socket.broadcast.emit('chat message', msg);
    console.log('message: ' + msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});