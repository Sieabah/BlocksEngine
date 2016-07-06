/// <reference path="../Renderer/Render.ts" />
/// <reference path="../SRenderable.ts" />

class SActor extends SRenderable {
    constructor(position?: Point, rotation?: Rotator, scale?: number, color?: Colour){
        super(position, rotation, scale, color);
    }
    
    private _doesTick = false;

    public doesTick(doesTick?: boolean): boolean {
        if(doesTick)
            this._doesTick = doesTick;
        else
            return this._doesTick;
    }

    public tick(dtime: number): void {}

    public beginPlay(): void{

    }
}