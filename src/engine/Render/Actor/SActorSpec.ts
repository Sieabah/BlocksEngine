import {
    Point,
    Rotator
} from 'engine/Math';

import { SActor } from './SActor';

export class SActorSpec extends SActor {
    constructor(position?: Point, rotation?: Rotator, scale?: number, color?: Colour){
        super(position, rotation, scale, color);
    }

    private tickFunc: Function = null;

    public setTick(func: Function): void{
        this.tickFunc = func;
        this.doesTick(true);
    }

    public tick(dtime: number): void {
        if(this.tickFunc)
            this.tickFunc(dtime);

        super.tick(dtime);
    };
}