
const socketManager = require('../singletons/SocketManager.js')

class Player{

    constructor(uuid){
        this.uuid = uuid;
    }

    getSocket(){
        return socketManager.getSocket(this.uuid);
    }
}

module.exports = Player;