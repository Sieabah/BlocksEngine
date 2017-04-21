import { SActor } from 'engine';
import { Mouse, Colour, Color } from 'engine/Util';

import {
    Point,
    Rotator,
    Quad
} from 'engine/Math';

export class MousePoint extends SActor {
    constructor(){
        super(new Point(window.innerWidth/2, window.innerHeight/2), new Rotator(), 5, new Colour(255,255,255,1));
        this.bounds(new Quad(new Point(1, 1), new Point(-1, 1), new Point(-1, -1), new Point(1, -1)).tris());

        this.doesTick(true);
    }

    public tick(dtime: number): void{
        this.setPosition(Mouse.x, Mouse.y);

        let offset = Math.floor(Date.now()/50)*2;
        let color = Color.HSVtoRGB((offset%360/360),1,1);

        this.setColor(new Colour(color.r, color.g, color.b, this.color().a));
    }
}