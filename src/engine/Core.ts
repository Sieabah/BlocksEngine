import {
    SRenderer,
    SActor,
    SActorManager,
} from './Render';
import { Mouse } from './Util';
import { SAudio } from './Audio';
import { Game } from './CoreGame';
import { Repeater } from './Repeater';
import { SPhysics } from './SPhysics';


export class Core {
    private conf: any;
    private name: string;
    private renderer: SRenderer;
    private audio: SAudio;
    private physics: SPhysics;

    private entities: SActorManager;

    constructor(conf?: Object){
        console.log('Core');
        this.conf = Core.defaultConfig();
        if(conf != undefined) this.config(conf);

        this.renderer = new SRenderer();
        this.audio = new SAudio();

        this.entities = new SActorManager();

        new Mouse();

        /*
        Mouse.registerClickTrigger((x,y) => {
            this.getRenderer().click(x,y);
        });
        */
        window.onresize = () => {this.getRenderer().resize();};
    }

    public getRenderer(): SRenderer{ return this.renderer; }
    public getPhysics(): SPhysics{ return this.physics; }
    public getAudio(): SAudio{ return this.audio; }
    public manager(): SActorManager{ return this.entities; }

    public getActor(actor: string): SActor{
        return this.entities.getActor(actor);
    }

    public static defaultConfig(): Object{
        return {}
    }

    public config(conf: any): void{
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
            engine.manager().tick(dtime);
            engine.getRenderer().update(engine.manager().actors());
        }
    }

    run(game: Game): void{
        console.log('Core.run');
        this.manager().beginPlay();
        this.name = Core.repeater(this.loop(game, this));
    }
}