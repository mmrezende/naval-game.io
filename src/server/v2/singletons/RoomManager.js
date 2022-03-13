
const BatalhaNaval = require('../classes/games/BatalhaNaval.js');
const Player = require('../classes/Player.js');
const { StaticPool } = require('node-worker-threads-pool');

const { v4 }  = require('uuid');


class RoomManager{
    constructor() {
        this.rooms = {};
        this.players = {};
    }


    createGameNaval(){
        const game=new BatalhaNaval(v4());
        this.rooms[uuid] = game;
        return game;
    }

    findGame(uuid){
        return this.rooms[uuid];
    }

    loadPlayer(uuid){
        if(!this.players[uuid]){
            this.players[uuid] = new Player(uuid);
        }
        return this.players[uuid];
    }


    start(){
        //10 ticks per second
        setInterval(this.tickEveryGame.bind(this), 1000 / 10);
        this.threadPool = new StaticPool({
            size: 4,
            task: async (game) => {
                game.lock();
                // Se o jogo estiver rodando apenas ocorre o emit que já executa o tick
                if(game.isRunning()){
                    game.emit();    
                }else 
                // Se o jogo pode iniciar então starta chama o emit que executa o tick
                if(game.camStart()){
                    game.start();
                    game.emit();
                }
                game.unlock();
            }
        });
    }


    tickEveryGame(){
        const self = this;
        Object.keys(this.rooms).map((game)=>{
            game = this.rooms[game];
            if(!game.locked)
                self.threadPool.exec(game);
        })
    }


}

//Singleton

module.exports = new RoomManager();