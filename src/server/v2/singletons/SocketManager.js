
class SocketManager {
    
    constructor() {
        this.sockets = {};
    }

    setSocket(socket,uuid){
        this.sockets[uuid] = socket;
    }

    getSocket(uuid){
        return this.sockets[uuid];
    }

}

// Singleton

module.exports = new SocketManager();
