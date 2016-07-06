///<reference path="../../engine/Include.ts" />

class MousePoint extends SActor {
    constructor(){
        super(new Point(window.innerWidth/2, window.innerHeight/2), new Rotator(), 5, new Colour(255,255,255,1));
        this.bounds(new Quad(new Point(1, 1), new Point(-1, 1), new Point(-1, -1), new Point(1, -1)).tris());

        this.doesTick(true);
    }

    public tick(dtime: number): void{
        this.setPosition(Mouse.x, Mouse.y);
    }
}