import { 
    Tri, 
    Point, 
    Rotator
} from 'engine/Math';

import { Colour } from 'engine/Util';

export class SRenderable {
    private _tris: Tri[];
    public tris(): Tri[] { return this._tris; }
    protected bounds(tris: Tri[]) { this._tris = tris; }

    private _position: Point;
    public position(): Point{ return this._position; }
    protected setPosition(x: number = 0, y: number = 0): void {
        this.setPositionByPoint(new Point(x,y))
    }
    protected setPositionByPoint(pt: Point = new Point(0,0)): void {
        this._position = pt
    }

    private _rotation: Rotator;
    public rotation(): Rotator{ return this._rotation; }
    protected setRotation(pitch: number = 0, yaw: number = 0, roll: number = 0): void {
        this.setRotationByRotator(new Rotator(pitch,yaw,roll))
    }
    protected setRotationByRotator(rot: Rotator = new Rotator(0,0,0)): void { this._rotation = rot }

    private _scale: number;
    public scale(): number { return this._scale; }
    protected setScale(scale: number = 1){ this._scale = scale; }

    private _color: Colour;
    public color(): Colour { return this._color; }
    protected setColor(color: Colour = new Colour(0,0,0,1)): void { this._color = color }

    constructor(position?: Point, rotation?: Rotator, scale?: number, color?: Colour){
        position ? this.setPositionByPoint(position) : this.setPosition();
        rotation ? this.setRotationByRotator(rotation) : this.setRotation();
        scale ? this.setScale(scale) : this.setScale();
        color ? this.setColor(color) : this.setColor();
    }
}