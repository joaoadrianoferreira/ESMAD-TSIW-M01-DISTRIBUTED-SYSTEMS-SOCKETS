var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use('/assets', express.static('assets'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {    
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('new member', (guest) => {
        io.emit('new member', guest);
    });
});

http.listen(3000, () => {
  console.log('Chat is running');
});