/// <reference path="../../Include.ts" />

class SActorManager {
    private _map: Object;
    private _actors: SActor[] = [];

    public addActor(actor: SActor): string {
        let sym = (new Unique()).toString();
        this._map[sym] = this._actors.push(actor)-1;
        return sym;
    }

    public getActor(id: string): SActor { return this._actors[this._map[id]]; }

    public beginPlay(){
        for(let actor of this._actors){
            actor.beginPlay();
        }
    }

    public tick(dtime: number){
        for(let actor of this._actors){
            if(actor.doesTick()) actor.tick(dtime);
        }
    }
}