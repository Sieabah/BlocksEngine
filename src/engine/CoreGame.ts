/// <reference path="Core.ts" />

import { Core } from "./Core";
import { Level } from "./Level";

export abstract class Game {
    private _engine: Core;
    public engine(): Core{ return this._engine; }

    private name: string = '';

    constructor(name: string = ''){
        this.name = name;
        this._engine = new Core();
    }

    protected loadLevel(level: Level){
        level.setup(this);
    }

    public getName():string{ return this.name; }

    abstract setup(): void;

    run(){
        this.setup();
        this.engine().run(this);
    }

    public loop(dtime: number): void{}
}