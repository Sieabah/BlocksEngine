/// <reference path="../engine/Core.ts" />

class Game {
    engine: Core;
    private name: string;
    constructor(){
        this.name = 'GetBlocks';
        this.engine = new Core({
            fps: 60
        });
    }

    getName():string{ return this.name; }

    run(){
        this.engine.run(this);
    }
    
    loop(dtime: number){
        console.log(this.getName()+'_'+Date.now()+'|dtime:'+dtime);
    }
}