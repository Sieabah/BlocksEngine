import {
    Point,
    Rotator,
    Quad,
    SMath
} from 'engine/Math';

import { Actor } from './Actor';
import { Board } from './Board';
import { Colour } from 'engine/Util';

class TextActor extends Actor {
    private _str: string;
    public fontFamily: string;
    public fontSize: string;
    protected _width: number;

    constructor(text: string='<TextActor>',
                position: Point = new Point(),
                color: Colour = new Colour(),
                font: string='50px serif',
                rotation: Rotator = new Rotator()){

        super([], position, rotation, 1, color);
        this._str = text;

        let tmp = this.fontFamily.split(' ');
        this.fontSize = tmp[0];
        this.fontFamily = tmp[1];
    };

    public setText(str: string){
        this._str = str;
    };

    public height(){
        return parseFloat(this.fontSize);
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
        board.text(this._str, this.position.x, this.position.y, this.fontFamily, this.color);
        this._width = board.textSize(this._str, this.position.x, this.position.y, this.fontFamily).width;
    };

    public isHit(pt: Point): boolean{
        return SMath.PointInQuad(pt, this.box());
    }
}