import { Core } from "./Core";
import { Level } from "./Level";

export abstract class Game {
    private _engine: Core;
    public engine(): Core{ return this._engine; }

    private name: string = '';
    private _level: Level = null;

    constructor(name: string = ''){
        this.name = name;
        this._engine = new Core();
    }

    protected loadLevel(level: Level){
        this._level = level;
        level.setup(this);
    }

    public getName(): string { return this.name; }

    abstract setup(): void;

    run(){
        this.setup();
        this.engine().run(this);
        this._level.onBeginPlay(this);
    }

    public loop(dtime: number): void{}
}