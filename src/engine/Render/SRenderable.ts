/// <reference path="../Include.ts" />

class SRenderable {
    private _tris: Tri[] = [];
    protected tris(): Tri[] { return this._tris; }
    
    position: Point;
    rotation: Rotator;
    scale: number;
    color: Colour;
    
    
}