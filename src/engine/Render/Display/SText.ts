import {
    Point,
    Rotator
} from 'engine/Math';

import { Colour } from 'engine/Util';
import { TextStyle } from './TTextStyle';
import { SActorSpec } from '../Actor/SActorSpec';

export class SText extends SActorSpec {
    private _text: string;
    private _style: any = {
        fontFamily: 'serif',
        fontSize: '12px',
        fill: '#FFFFFF'
    };

    constructor(message: string = 'EGAD', position?: Point, style: any = null,
                rotation?: Rotator, scale?: number, color?: Colour){
        super(position, rotation, scale);

        this.setText(message);

        if(style)
            for(let key in style)
                if (style.hasOwnProperty(key))
                    this._style[key] = style[key];

        if(color)
            this._style['fill'] = '#'+color.hexStr();

        console.log(this._style);
    }

    public setText(message: string): void {
        this._text = message;
    }

    public draw(stage: PIXI.Container){
        let text = new PIXI.Text(this._text, this._style);
        text.x = this.position().x;
        text.y = this.position().y;

        stage.addChild(text);
    }
}