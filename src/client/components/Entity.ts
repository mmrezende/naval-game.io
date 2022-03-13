import * as PIXI from 'pixi.js';

abstract class Entity {
    protected x: number;
    protected y: number;

    abstract getX() : number;
    abstract getY() : number;

    abstract render() : PIXI.DisplayObject;
}

export default Entity;