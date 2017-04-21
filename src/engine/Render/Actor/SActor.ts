import {
    Point,
    Rotator
} from 'engine/Math';

import { Colour } from 'engine/Util';
import { SRenderable } from '../SRenderable';

export class SActor extends SRenderable {
    constructor(position?: Point, rotation?: Rotator, scale?: number, color?: Colour){
        super(position, rotation, scale, color);
    }
    
    private _doesTick = false;

    public doesTick(doesTick?: boolean): boolean {
        if(doesTick)
            this._doesTick = doesTick;
        else
            return this._doesTick;
    }

    public tick(dtime: number): void {}

    public beginPlay(): void{

    }

    public draw(stage: PIXI.Container){
        let gfx = new PIXI.Graphics();
        stage.addChild(gfx);

        let color = this.color();

        for (let tri of this.tris()) {
            gfx.beginFill(color.hex(), color.a);

            let points = tri.points();

            for(let index in points) {
                if(!points.hasOwnProperty(index)) continue;

                var point: Point = points[index].scaled(this.scale()).moved(this.position());

                switch(parseInt(index)){
                    case 0:
                        gfx.moveTo(point.x, point.y);
                        break;
                    default:
                        gfx.lineTo(point.x, point.y);
                        break;
                }
            }

            gfx.endFill();
        }
    }
}