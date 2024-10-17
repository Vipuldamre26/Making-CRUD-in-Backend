const http = require('http');
const express = require('express');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.use(express.static(path.resolve("./public")))


app.get('/', (req, res) => {
    res.sendFile('/public/index.html');
})

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
        
    })
})


server.listen(3000, () => console.log('server started on port 3000'))