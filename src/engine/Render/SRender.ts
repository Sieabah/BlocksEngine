import { Board } from './Board';
import { Actor } from 'engine/Actor';
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

    public click(x: number, y: number){
        let pos = new Point(x, y);

        for(let actor of this.queue){
            if(actor.isHit(pos))
                actor.onClick(actor);
        }
    }

    update(dtime: number){
        for(let actor of this.queue){
            if(actor.doesTick())
                actor.tick(dtime);
        }
    }
}