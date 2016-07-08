/// <reference path="../../Include.ts" />

class SText extends SActorSpec{
    private _text: string;
    private _style: Object = {
        font: '12px serif',
        fill: '#FFFFFF'
    };

    constructor(message: string = 'EGAD', position?: Point, style: Object = null,
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

    public draw(stage){
        let text = new PIXI.Text(this._text, this._style);
        text.x = this.position().x;
        text.y = this.position().y;

        stage.addChild(text);
    }
}