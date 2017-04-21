import { Board } from './Board';
import { Actor } from './Actor';
import { Mouse, Color } from 'engine/Util';

import {
    Point
} from 'engine/Math';

export class SRender {
    private board: Board;
    private queue: Array<Actor>;

    constructor(){
        this.board = new Board();
        this.queue = [];
    }

    public actors(): Array<Actor>{
        return this.queue;
    }

    public addActor(actor: Actor): number{
        this.queue.push(actor);
        return this.queue.length-1;
    }

    private getBoard(): Board{
        return this.board;
    }

    public getActor(actor: number): Actor{
        return this.queue[actor];
    }

    public resize(){
        this.getBoard().resize();
    }

    public click(x: number, y: number){
        let pos = new Point(x, y);

        for(let actor of this.queue){
            if(actor.isHit(pos))
                actor.onClick(actor);
        }
    }

    update(dtime: number){
        let offset = Math.floor(Date.now()/50);
        offset = Math.abs(Math.sin(offset*(Math.PI/180)));
        let color = Color.HSVtoRGB(offset,1,1);
        this.board.setBackdrop(color.r, color.g, color.b);

        let pos = new Point(Mouse.x, Mouse.y);

        this.board.clear();

        for(let actor of this.queue){
            if(actor.doesTick())
                actor.tick(dtime);

            if(actor.isHit(pos))
                actor.onHover(actor);
            else
                actor.offHover(actor);

            actor.draw(this.getBoard())
        }

        this.board.swap();
    }
}