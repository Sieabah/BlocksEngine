export class MenuOption {
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