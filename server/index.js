require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http'); // Import the http module
const routes = require('./routes');
const handle = require('./handlers');

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create an HTTP server instance
const server = http.createServer(app);

const socketIO = require('socket.io')(server, {
  cors: {
      origin: `http://localhost:3000`
  }
});

try {
  socketIO.on('connect', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

      //Listens and logs the message to the console
      socket.on('message', (data) => {
        socketIO.emit('messageResponse', data);
      });

    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
    });
  });
} catch (error) {
  console.error('Error occurred while setting up socket connection:', error);
}



app.use('/api/auth', routes.auth);
app.use('/api/polls', routes.poll);

app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(handle.error);

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
