/// <reference path="Repeater.ts" />

/// <reference path="SEntity.ts" />

/// <reference path="SRender.ts" />
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
    }

    public getRenderer(){ return this.renderer; }
    public getPhysics(){ return this.physics; }
    public getAudio(){ return this.audio; }

    public static defaultConfig(): Object{
        return {
            fps: 30
        }
    }

    public config(conf: Object): void{
        for(var key in conf){
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

    private repeater(func: Function, rate: number): string{
        return Repeater.start('core', func, function(){ return 1000/rate;}, true);
    }

    private loop(game: Game, engine: Core): Function{
        return function(dtime: number){
            game.loop(dtime);
            engine.getRenderer().update();
        }
    }

    run(game: Game): void{
        console.log('Core.run');
        this.name = this.repeater(this.loop(game, this), this.getConfValue('fps'));
        console.log(this.name);
    }
}