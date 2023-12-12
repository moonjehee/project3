// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.use(express.static(`${__dirname}/public`));

io.on('connection', (socket) => {
    console.log('A user connected');
    // Listen for 'line' events from clients and broadcast to all clients
    socket.on('line', (data) => {
        io.emit('line', data);
    });
    // Disconnect event
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log('server running at http://localhost:3000');
});