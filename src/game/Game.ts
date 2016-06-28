/// <reference path="../engine/Core.ts" />
/// <reference path="../engine/SRender.ts" />
/// <reference path="../engine/Util/Mouse.ts" />

class Game {
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
    run(){
        let actor: Actor = new Actor();
        actor.setPosition(window.innerWidth/2, window.innerHeight/2);
        actor.bounds.push(new Point(-1, 1));
        actor.bounds.push(new Point(1, 1));
        actor.bounds.push(new Point(1, -1));
        actor.bounds.push(new Point(-1, -1));
        actor.scale = 5;
        actor.color = {r: 255, g: 255, b: 255, a: 1};

        this.actors.push(this.engine.getRenderer().addActor(actor));

        this.engine.run(this);
    }
    
    loop(dtime: number){
        let actor: Actor = this.engine.getActor(this.actors[0]);

        actor.setPosition(Mouse.x, Mouse.y);
    }
}