import * as PIXI from "pixi.js";
import MapEntity from "./MapEntity";

class Tile extends MapEntity {

    public getX() : number {
        return this.width * this.col;
    }

    public getY() : number {
        return this.height * this.line;
    }

    public render(): PIXI.DisplayObject {
        const tile = new PIXI.Graphics();
        tile.beginFill(0x000000);
        tile.drawCircle(this.getX(), this.getY(),8);
        tile.endFill();
        tile.width = this.width;
        tile.height = this.height;
        
        return tile;
    }
}

export default Tile;