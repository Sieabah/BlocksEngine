import {
    Tri,
    Point,
    Rotator,
    SMath
} from 'engine/Math';

import { Board, Renderable } from 'engine/Render';
import { Colour } from 'engine/Util';

export class Actor implements Renderable {
    private tickFunc: Function = null;
    protected _doesTick: boolean = false;

    constructor(
        public bounds: Array<Tri> = [],
        public position: Point = new Point(),
        public rotation: Rotator = new Rotator(),
        public scale: number = 1,
        public color: Colour = new Colour()
    ){
    };

    public setPosition(x: number, y: number){
        this.position.x = x;
        this.position.y = y;
    };

    doesTick(state: boolean = null):boolean{
        if(state == null)
            return this._doesTick;
        else
            return this._doesTick = state;
    };

    setTick(func: Function): void{
        this.tickFunc = func;
    }

    tick(dtime: number): void {
        if(this.tickFunc)
            this.tickFunc(dtime);
    };

    protected getScaledBounds(): Array<Tri>{
        let bounds: Array<Tri> = [];

        for(let tri of this.bounds){
            let stri = tri.scaled(this.scale);
            bounds.push(stri.moved(this.position));
        }

        return bounds;
    }

    draw(board: Board): void{
        board.draw(this.getScaledBounds(), this);
    };

    public isHit(pt: Point){
        for(let tri of this.bounds){
            if(SMath.PointInTri(pt, tri))
                return true;
        }

        return false;
    }

    onClick(actor: Actor){}

    onHover(actor: Actor){}

    offHover(actor: Actor){}
}