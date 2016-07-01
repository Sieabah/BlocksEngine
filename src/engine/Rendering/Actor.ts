/// <reference path="../Include.ts" />

class Actor implements Renderable{
    private tickFunc = null;
    protected _doesTick = false;
    public bounds;
    public position;
    public rotation;
    public scale;
    public color;

    constructor(bounds: Array<Tri> = [],
                position: Point = new Point(),
                rotation: Rotator = new Rotator(),
                scale: number = 1,
                color: Colour = new Colour()){

        this.bounds = bounds;
        this.color = color;
        this.rotation = rotation;
        this.position = position;
        this.scale = scale;
    };

    public setPosition(x: number, y: number){
        this.position.x = x;
        this.position.y = y;
    };

    doesTick(state: boolean = null):boolean{
        if(state == null)
            return this._doesTick;
        else
            return this._doesTick = state;
    };

    setTick(func: Function): void{
        this.tickFunc = func;
    }

    tick(dtime: number): void {
        if(this.tickFunc)
            this.tickFunc(dtime);
    };

    protected getScaledBounds(): Array<Tri>{
        let bounds: Array<Tri> = [];

        for(let tri of this.bounds){
            let stri = tri.scaled(this.scale);
            bounds.push(stri.moved(this.position));
        }

        return bounds;
    }

    draw(board: Board): void{
        board.draw(this.getScaledBounds(), this);
    };

    public isHit(pt: Point){
        for(let tri of this.bounds){
            if(SMath.PointInTri(pt, tri))
                return true;
        }

        return false;
    }

    onClick(actor: Actor){}

    onHover(actor: Actor){}

    offHover(actor: Actor){}
}