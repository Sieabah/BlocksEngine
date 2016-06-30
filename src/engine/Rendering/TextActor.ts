/// <reference path="../SMath.ts" />
/// <reference path="Renderable.ts" />
/// <reference path="Board.ts" />
/// <reference path="Actor.ts" />

class TextActor extends Actor {
    private _str;
    public font;

    constructor(text: string='<TextActor>',
                position: Point = new Point(),
                color: Colour = new Colour(),
                font: string='48x serif',
                rotation: Rotator = new Rotator()){

        super([], position, rotation, 1, color);
        this._str = text;
        this.font = font;
    };

    public setText(str: string){
        this._str = str;
    };

    draw(board: Board): void{
        board.text(this._str, this.position.x, this.position.y, this.font);
    };
}