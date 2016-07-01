/// <reference path="Tri.ts" />
/// <reference path="Quad.ts" />

class Point {
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

class Rotator {
    yaw: number;
    pitch: number;
    roll: number;
    constructor(yaw?: number, pitch?: number, roll?: number){
        this.yaw = yaw ? yaw : 0;
        this.pitch = pitch ? pitch : 0;
        this.roll = roll ? roll : 0;
    }
}

class SMath {
    public static sign(p1: Point, p2: Point, p3: Point) {
        return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
    }

    public static PointInTri(point: Point, tri: Tri): boolean{
        let b1 = SMath.sign(point, tri.v1, tri.v2) < 0;
        let b2 = SMath.sign(point, tri.v2, tri.v3) < 0;
        let b3 = SMath.sign(point, tri.v3, tri.v1) < 0;

        return ((b1 == b2) && (b2 == b3));
    }

    public static PointInQuad(point: Point, quad: Quad): boolean{
        let [p1, p2, p3, p4] = quad.points();

        for(let tri of quad.tris()){
            if(SMath.PointInTri(point, tri))
                return true;
        }

        return false;
    }

    public static truncate(num: number, length: number){
        return Math.round(num*length)/length;
    }
}