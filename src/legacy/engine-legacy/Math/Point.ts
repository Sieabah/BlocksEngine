export class Point {
    x: number;
    y: number;
    constructor(x?: number, y?: number){
        this.x = x ? x : 0;
        this.y = y ? y : 0;
    }

    public scaled(scale: number){
        return new Point(this.x*scale, this.y*scale);
    }

    public scale(scale: number){
        this.x *= scale;
        this.y *= scale;

        return this;
    }

    public move(pt: Point){
        this.x += pt.x;
        this.y += pt.y;

        return this;
    }

    public moved(pt: Point){
        return new Point(this.x + pt.x, this.y + pt.y);
    }
}