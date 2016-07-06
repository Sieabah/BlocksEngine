/// <reference path="../Renderer/Render.ts" />

class SActor extends SRenderable {
    constructor(){
        super();
    }
    private _doesTick = false;
    public doesTick(doesTick?: boolean): boolean | void { if(doesTick) this._doesTick = doesTick; else return this._doesTick }

    public tick(dtime: number): void {}

    public beginPlay(): void{

    }
}