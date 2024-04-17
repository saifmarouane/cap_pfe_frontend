// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// io.on('connection', (socket) => {
//   console.log('User connected:', socket.id);

//   socket.on('send_message', (message) => {
//     io.emit('new_message', { author: 'User', text: message });
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });

// const PORT = process.env.PORT || 3001;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });