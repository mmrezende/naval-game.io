import Entity from "./Entity";

abstract class MapEntity extends Entity{
    protected col: number;
    protected line: number;
    protected width: number;
    protected height: number;

    constructor(col: number, line: number, width: number, height: number) {
        super();
        this.col = col;
        this.line = line;
        this.width = width;
        this.height = height;
    }
}

export default MapEntity;