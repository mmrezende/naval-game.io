import Container from "./Container";
import Tile from "./Tile";

class Map extends Container {
    constructor(width: number, height: number, regionWidth: number, regionHeight: number) {
        super(width, height, {top: 60, left: 60});

        const entitySize = Math.min(
            window.innerWidth / this.width,
            window.innerHeight / this.height
        );

        for(let col = 0; col < width; col++) {
            for(let line = 0; line < height; line++) {
                this.addChild(new Tile(col, line, entitySize, entitySize));
            }
        }
    }
}

export default Map;