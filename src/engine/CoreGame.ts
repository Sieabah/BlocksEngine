/// <reference path="../engine/Core.ts" />
/// <reference path="../engine/Rendering/TextActor.ts" />
/// <reference path="../engine/Util/Mouse.ts" />
/// <reference path="../engine/Level/Level.ts" />

abstract class Game {
    engine: Core;
    private name: string;
    private actors: Array<number>;
    constructor(){
        this.name = 'GetBlocks';
        this.engine = new Core();
        this.actors = [];
    }

    getName():string{ return this.name; }
    resize():void{
        this.engine.getRenderer().resize();
    }

    protected loadLevel(level: Level){
        level.setup(this);
    }

    public addActor(actor: Actor): number{
        this.actors.push(this.engine.getRenderer().addActor(actor));
        return this.actors.length-1;
    }

    abstract setup(): void;

    run(){
        this.setup();
        this.engine.run(this);
    }

    loop(dtime: number){
        for(let actor of this.engine.getRenderer().actors()){
            if(actor.doesTick())
                actor.tick(dtime);
        }
    }
}