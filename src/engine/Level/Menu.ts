/// <reference path="Level.ts" />
/// <reference path="../Math/SMath.ts" />

class MenuOption {
    private name: string;
    private _click: Function;
    private _onhover: Function;
    private _offhover: Function;

    constructor(name: string,
                click: Function = ()=>{},
                onhover: Function=()=>{},
                offhover: Function=()=>{}
    ){
        this.name = name;
        this._click = click;
        this._onhover = onhover;
        this._offhover = offhover;
    }

    public getName(): string{
        return this.name;
    }

    public activate(actor):void{
        this._click(actor);
    }

    public hover(actor):void{
        this._onhover(actor);
    }

    public offhover(actor):void{
        this._offhover(actor);
    }
}

class Menu extends Level {
    protected options: Array<MenuOption>;

    constructor(){
        super();

        this.options = [];
    }

    public setup(game: Game){
        let middle = new Point(window.innerWidth/2, window.innerHeight/2);

        for(let option of this.options){
            let actor = new TextActor(option.getName(), new Point(middle.x, middle.y-100), new Colour(255,255,255,1));

            actor.onClick = (actor) => {
                option.activate(actor);
            };

            actor.onHover = (actor) => {
                option.hover(actor);
            };

            actor.offHover = (actor) => {
                option.offhover(actor);
            };

            game.addActor(actor);
        }

        super.setup(game);
    }
}