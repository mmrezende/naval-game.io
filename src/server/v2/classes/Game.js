
const Constants = require('../../../shared/constants');
const Player = require('./Player.js')


class Game{

    constructor(uuid) {
        this.uuid = uuid;
        this.running = false;
        this.lastTime = 0;
    }




    //Start the room and the room start running
    start(){
        this.running = true;
        this.lastTime = this.getCurrentTime();
    }
    //Return if the room is running a game and need run ticks 
    isRunning(){
        return this.running;
    }




    //Emit all changes to all players in game
    emit(){
        const self = this;
        const newTime = this.getCurrentTime();
        //run a tick of game
        this.tick(newTime - this.lastTime);
        this.lastTime = newTime;

        //Send all player the feedback
        const players = this.getPlayers();
        players.map((player)=>{
            const state = self.gameForPlayer(player);
            player.getSocket().emit(Constants.MSG_TYPES.UPDATE_GAME,state);
        })
    }

    //Add player to room. Return if the player cam be adeded
    addPlayer(player){}
    //Return all players in this room
    getPlayers(){}
    //Return if the room cam start 
    camStart(){}
    //Return a game state for each player
    gameForPlayer(player){}
    //Run a game tick
    tick(delta){}
    //Input of player and the data he have send
    input(player,data){}
    



    //Auxiliar function 

    getCurrentTime(){
        const hrTime = process.hrtime();
        return hrTime[0] * 1000000 + hrTime[1] / 1000;
    }

    lock(){
        this.locked = true;
    }

    unlock(){
        this.locked = false;
    }
}


module.exports = Game;