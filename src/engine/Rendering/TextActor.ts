/// <reference path="../Math/SMath.ts" />
/// <reference path="Renderable.ts" />
/// <reference path="Board.ts" />
/// <reference path="Actor.ts" />

class TextActor extends Actor {
    private _str;
    public font;
    protected _width;

    constructor(text: string='<TextActor>',
                position: Point = new Point(),
                color: Colour = new Colour(),
                font: string='50px serif',
                rotation: Rotator = new Rotator()){

        super([], position, rotation, 1, color);
        this._str = text;
        this.font = font;
    };

    public setText(str: string){
        this._str = str;
    };

    public height(){
        return parseFloat(this.font.split(' ')[0]);
    }

    public width(){
        return this._width;
    }

    public box(){
        return new Quad(
            this.position.moved(new Point(this.width(), 0)),
            this.position,
            this.position.moved(new Point(0, -this.height())),
            this.position.moved(new Point(this.width(), -this.height()))
        );
    }

    draw(board: Board): void{
        board.text(this._str, this.position.x, this.position.y, this.font, this.color);
        this._width = board.textSize(this._str, this.position.x, this.position.y, this.font).width;
    };

    public isHit(pt: Point): boolean{
        return SMath.PointInQuad(pt, this.box());
    }
}