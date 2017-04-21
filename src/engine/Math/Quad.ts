import { Point } from './Point';
import { Tri } from './Tri';

export class Quad{
    private _points: Array<Point> = [];
    private _tris: Array<Tri> = [];

    constructor(...pt:Array<Point>){
        if(pt.length != 4)
            throw new Error('Invalid Quad definition');

        for(let point of pt){
            this._points.push(point);
        }

        this._tris.push(new Tri(this._points[0], this._points[1], this._points[2]));
        this._tris.push(new Tri(this._points[2], this._points[3], this._points[0]));
    }

    public tris(): Array<Tri>{
        return this._tris;
    }

    public points(): Array<Point>{
        return this._points;
    }
}