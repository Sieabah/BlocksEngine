import { Point } from './Point';
import { SMath } from './SMath';

export class Tri {
    constructor(
        public v1: Point, 
        public v2: Point, 
        public v3: Point
        ){
    }

    public points(){
        return [this.v1, this.v2, this.v3];
    }

    public scale(scale: number){
        this.v1.scale(scale);
        this.v2.scale(scale);
        this.v3.scale(scale);
        return this;
    }

    public scaled(scale: number){
        return new Tri(
            this.v1.scaled(scale),
            this.v2.scaled(scale),
            this.v3.scaled(scale)
        );
    }
    
    public move(pt: Point){
        this.v1.move(pt);
        this.v2.move(pt);
        this.v3.move(pt);
        return this;
    }

    public moved(pt: Point){
        return new Tri(this.v1.moved(pt),
        this.v2.moved(pt),
        this.v3.moved(pt));
    }

    public inBounds(point: Point){
        return SMath.PointInTri(point, this);
    }
}