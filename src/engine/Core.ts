/// <reference path="Repeater.ts" />

/// <reference path="SEntity.ts" />
/// <reference path="Util/Mouse.ts" />

/// <reference path="Rendering/SRender.ts" />
/// <reference path="SAudio.ts" />
/// <reference path="SPhysics.ts" />

/// <reference path="../game/Game.ts" />

class Core {
    private conf: Object;
    private name: string;
    private renderer: SRender;
    private audio: SAudio;
    private physics: SPhysics;

    private entities: Array<SEntity>;

    constructor(conf?: Object){
        console.log('Core');
        this.conf = Core.defaultConfig();
        if(conf != undefined) this.config(conf);

        this.renderer = new SRender();
        this.audio = new SAudio();

        this.entities = [];

        new Mouse();

        window.onresize = () => {this.getRenderer().resize();};
    }

    public getRenderer(){ return this.renderer; }
    public getPhysics(){ return this.physics; }
    public getAudio(){ return this.audio; }

    public getActor(actor: number): Actor{
        return this.getRenderer().getActor(actor);
    }

    public static defaultConfig(): Object{
        return {
        }
    }

    public config(conf: Object): void{
        for(let key in conf){
            if(!conf.hasOwnProperty(key)) continue;

            this.setConfValue(key, conf[key]);
        }
    }

    public setConfValue(key: string, value: any): void{
        if(this.conf[key] == undefined
            || this.conf[key] == null
            || typeof this.conf[key] == typeof value)
            this.conf[key] = value;
        else
            throw new Error('Expecting type: '+typeof this.conf[key]+' but got '+typeof value+' for '+key);
    }

    public getConfValue(key: string): any{
        return this.conf[key];
    }

    private static repeater(func: Function): string{
        return Repeater.start('core', func, true);
    }

    private loop(game: Game, engine: Core): Function{
        return function(dtime: number){
            game.loop(dtime);
            engine.getRenderer().update(dtime);
        }
    }

    run(game: Game): void{
        console.log('Core.run');
        this.name = Core.repeater(this.loop(game, this));
    }
}