const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const socketio = require('socket.io');
const { v4 }  = require('uuid');
const { serialize, parse } = require("cookie");

const Constants = require('../shared/constants');
const Game = require('./game');
const webpackConfig = require('../../webpack.dev.js');

// Setup an Express server
const app = express();
app.use(express.static('public'));

if (process.env.NODE_ENV === 'development') {
  // Setup Webpack for development
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler));
} else {
  // Static serve the dist/ folder in production
  app.use(express.static('dist'));
}

// Listen on port
const port = process.env.PORT || 3000;
const server = app.listen(port);
console.log(`Server listening on port ${port}`);

// Setup socket.io
const io = socketio(server);

// Listen for socket.io connections
io.engine.on("initial_headers", (headers, request) => {
    const cookies = parse(request.headers.cookie);
    if(!cookies || !cookies.uuid){
        headers["set-cookie"] = serialize("uuid", v4(), { sameSite: "strict" });
    }
});
io.engine.on("headers", (headers, request) => {
    if (!request.headers.cookie) return;
        const cookies = parse(request.headers.cookie);
        
    console.log('tens um cookie');
    console.log(cookies);
    if (!cookies.randomId) {
        headers["set-cookie"] = serialize("randomId", "abc", { maxAge: 86400 });
    }
});
io.on('connection', socket => {
  console.log('Player connected!', socket.id);

  var cookies = parse(socket.handshake.headers.cookie);
  console.log('Jogador conectado!', socket.id);
  console.log(cookies);
  
  socket.on(Constants.MSG_TYPES.JOIN_GAME, joinGame);
  socket.on(Constants.MSG_TYPES.INPUT, handleInput);
  socket.on('disconnect', onDisconnect);
});

// Setup the Game
const game = new Game();

function joinGame(username) {
  game.addPlayer(this, username);
}

function handleInput(dir) {
  game.handleInput(this, dir);
}

function onDisconnect() {
  game.removePlayer(this);
}
