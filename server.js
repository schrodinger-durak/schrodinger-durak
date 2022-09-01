var express = require('express');

var app = express();
var server = app.listen(process.env.PORT || 8888);
console.log(process.env.PORT || 8888)

app.use(express.static('public'));

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);
var counter = 0;
var limit = 2;

function newConnection(socket) {
  var id = counter;
  socket.emit('getID', id);
  counter++;
  console.log('Client connected: ' + socket.id);

  socket.on('mouse', mouseMsg);

  function mouseMsg(data) {

    socket.broadcast.emit('mouse', data);
    // console.log(data);
  }

  socket.on('turn', turnMsg);

  function turnMsg(data) {
    socket.broadcast.emit('turn',0);
  }

  socket.on('addMove', moveMsg);

  function moveMsg(data) {
    io.sockets.emit('addMove',data);
    // console.log(data);
  }

  socket.on('disconnect', () => console.log('Client disconnected: ' + socket.id));
}
