/// <reference path="../../Include.ts" />

class SActorSpec extends SActor {
    constructor(position?: Point, rotation?: Rotator, scale?: number, color?: Colour){
        super(position, rotation, scale, color);
    }

    private tickFunc = null;

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