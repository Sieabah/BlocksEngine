/// <reference path="../../Include.ts" />

class SActorText extends SActor{
    constructor(position?: Point, rotation?: Rotator, scale?: number, color?: Colour){
        super(position, rotation, scale, color);
    }

    public text: string;

    private tickFunc = null;

    setTick(func: Function): void{
        this.tickFunc = func;
    }

    tick(dtime: number): void {
        if(this.tickFunc)
            this.tickFunc(dtime);
    };

    public draw(stage){
        let text = new PIXI.Text(this.text, {
            font: '12px serif',
            fill: '#FFFFFF'
        });
        text.x = this.position().x;
        text.y = this.position().y;

        stage.addChild(text);
    }
}