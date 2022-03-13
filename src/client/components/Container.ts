import * as PIXI from 'pixi.js';
import Entity from './Entity';
import Padding from './interfaces/Padding';

class Container extends Entity{
    protected width: number;
    protected height: number;

    protected padding: Padding = {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
    };

    constructor(width: number, height: number, padding? : Padding) {
        super();
        this.width = width;
        this.height = height;
        this.padding = padding;
    }

    children: Array<Entity>;

    public addChild(child : Entity) : void {
        this.children.push(child);
    }

    public getX() : number{
        return this.x;
    }
    public getY() : number{
        return this.y;
    }
    
    public render() : PIXI.Container {
        const container = new PIXI.Container();
        for(let el of this.children) {
            container.addChild(el.render());
        }

        container.width = this.width - (this.padding.left + this.padding.right);
        container.height = this.height - (this.padding.top + this.padding.bottom);

        container.pivot.x = -this.padding.left;
        container.pivot.y = -this.padding.top;

        return container;
    };
}

export default Container;