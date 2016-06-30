/// <reference path="../Util/Color.ts" />
/// <reference path="../SMath.ts" />
/// <reference path="Renderable.ts" />
/// <reference path="Board.ts" />

class Actor implements Renderable{
    private tickFunc = null;
    protected _doesTick = false;
    public bounds;
    public position;
    public rotation;
    public scale;
    public color;

    constructor(bounds: Array<Point> = [],
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

    draw(board: Board): void{
        let bounds: Array<Point> = [];

        for(let point of this.bounds){
            let scaledPoint: Point = new Point(point.x, point.y);
            scaledPoint.x = scaledPoint.x * this.scale;
            scaledPoint.y = scaledPoint.y * this.scale;

            bounds.push(new Point(this.position.x+scaledPoint.x, this.position.y+scaledPoint.y));
        }

        board.draw(bounds, this);
    };
}