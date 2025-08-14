const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 0; // 0 means Node.js will automatically find a free port

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve terrain tiles from the 'tiles' directory
app.use('/tiles', express.static(path.join(__dirname, 'tiles')));

// Serve custom data from the 'data' directory
app.use('/data', express.static(path.join(__dirname, 'data')));

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(PORT, () => {
    const { port } = server.address();
    console.log(`Server is running on port ${port}`);
    console.log(`Please open your browser at http://localhost:${port}`);
});
