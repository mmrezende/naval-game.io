const socketio = require('socket.io');
const server = require('./server.js')
const cookie = require("cookie")

// Setup socket.io
const io = socketio(server,{
    cookie: true
});

// Setup server managers

const socketManager = require('./singletons/SocketManager.js')
const roomManager = require('./singletons/RoomManager.js')




// Listen for socket.io connections

// chamado apenas uma vez
io.engine.on("initial_headers", (headers, request) => {
    const cookies = cookie.parse(request.headers.cookie);
    if(!cookies || !cookies.uuid){
        headers["set-cookie"] = cookie.serialize("uuid", v4(), { sameSite: "strict" });
    }
});
  
// called for each HTTP request (including the WebSocket upgrade)
io.engine.on("headers", (headers, request) => {
    // if (!request.headers.cookie) return;
    //     const cookies = cookie.parse(request.headers.cookie);
});

io.on('connection', socket => {
    const cookies = cookie.parse(socket.handshake.headers.cookie);
    const uuid = cookie.uuid;
    const player = roomManager.loadPlayer(uuid);
    console.log('Jogador conectado!', socket.id);
    console.log(cookies);
    socketManager.setSocket(socket,cookie.uuid);

    socket.on(Constants.MSG_TYPES.CREATE_GAME, function(){
        const roomGame = roomManager.createRoomGame();
        roomGame.setPlayer1(player);
        player.getSocket().join(roomGame.uuid);
    });
    socket.on(Constants.MSG_TYPES.JOIN_GAME, function(){

    });
    socket.on(Constants.MSG_TYPES.UPDATE_GAME, function(){

    });
    socket.on(Constants.MSG_TYPES.INPUT_GAME, function(){

    });
    socket.on('disconnect', function(){

    });
});

roomManager.start();
