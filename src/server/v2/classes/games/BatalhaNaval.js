const Game = require('../Game')


class BatalhaNaval extends Game{

    constructor(uuid){
        super(uuid);

        this.player1 = null;
        this.player2 = null;
    }

    //Add player to room 
    addPlayer(player){
        if(this.player1==null){
            this.player1=player;
            return true;
        }
        if(this.player2==null){
            this.player2=player;
            return true;
        }
        return false;
    }
    //Return all players in this room
    getPlayers(){
        return [this.player1,this.player2]
    }
    //Return if the room cam start 
    camStart(){
        return this.player1!=null && this.player2!=null;
    }


    //Return a game state for each player
    gameForPlayer(player){

    }
    //Input of player and the data he have send
    input(player,data){
        
    }
}

module.exports = BatalhaNaval;