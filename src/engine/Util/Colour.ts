import { Color } from './Color';

export class Colour {
    constructor(
        public r: number = 0,
        public g: number = 0,
        public b: number = 0,
        public a: number = 1
    ){
    }

    public copy(){
        return new Colour(this.r, this.g, this.b, this.a);
    }

    public hex(): number{
        return Color.colorHex(this);
    }

    public hexStr(): string{
        return Color.colorHexStr(this);
    }

    public toString(): string{
        return Color.colorStr(this);
    }
}