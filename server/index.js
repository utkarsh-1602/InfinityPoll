require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('https'); // Import the http module
const routes = require('./routes');
const handle = require('./handlers');

const app = express();
const PORT = process.env.PORT || 4000;

const whitelist = [
  '*' // Allow requests from all origins, you can specify specific origins here if needed
];

app.use((req, res, next) => {
  const origin = req.get('Origin');
  const isWhitelisted = whitelist.includes('*') || whitelist.includes(origin);
  if (isWhitelisted) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
  }
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Middleware to parse incoming JSON data
app.use(express.json());
app.use(cors())


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create an HTTP server instance
const server = http.createServer(app);
let users = [];

const socketIO = require('socket.io')(server, {
  cors: {
      origin: `https://infinity-poll-client.vercel.app`,
      methods: ["GET", "POST"]
  }
});

try {
  socketIO.on('connect', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

      //Listens and logs the message to the console
      socket.on('message', (data) => {
        console.log(data);
        socketIO.emit('messageResponse', data);
      });

  socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));

  //Listens when a new user joins the server
  socket.on('newUser', (data) => {
    //Adds the new user to the list of users
    users.push(data);
    // console.log(users);
    //Sends the list of users to the client
    socketIO.emit('newUserResponse', users);
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

// Reference: https://stackoverflow.com/questions/59749021/socket-io-error-access-to-xmlhttprequest-has-been-blocked-by-cors-policy