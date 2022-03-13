import * as PIXI from "pixi.js";
import MapEntity from "./MapEntity";

class Player extends MapEntity{

    public getX() : number {
        return this.width * this.col;
    }

    public getY() : number {
        return this.height * this.line;
    }
    
    public render(): PIXI.DisplayObject {
        const player = PIXI.Sprite.from('/assets/submarine.png', {});
        player.x = this.getX();
        player.y = this.getY();
        player.anchor.set(0.5);
        player.width = this.width;
        player.height = this.height;

        return player;
    }
}

export default Player;