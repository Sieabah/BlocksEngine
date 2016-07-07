/// <reference path="../Include.ts" />

class Colour {
    public r;
    public g;
    public b;
    public a;

    constructor(r: number = 0, g: number = 0, b: number = 0, a: number = 1){
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    public copy(){
        return new Colour(this.r, this.g, this.b, this.a);
    }

    public hex(): number{
        return Color.colorHex(this);
    }

    public toString(): string{
        return Color.colorStr(this);
    }
}

class Color {
    public static colorStr(color: {r: number, g: number, b: number, a:number}):string {
        return 'rgba('+color.r+','+color.g+','+color.b+','+color.a+')';
    }

    public static colorHex(color: {r: number, g: number, b: number, a:number}): number{
        let colorstr = StrUtil.leftpad(color.r.toString(16),2,'0')+
            StrUtil.leftpad(color.g.toString(16),2,'0')+
            StrUtil.leftpad(color.b.toString(16),2,'0');
        return parseInt('0x'+colorstr, 16);
    }

    public static random(){
        let min = 0;
        let max = 255;
        let r = Math.floor(Math.random() * (max - min)) + min;
        let g = Math.floor(Math.random() * (max - min)) + min;
        let b = Math.floor(Math.random() * (max - min)) + min;
        return new Colour(r,g,b,1);
    }

    public static HSVtoRGB (h, s, v) {

        let color: {
            r: number,
            g: number,
            b: number
        } = {
            r: null, g: null, b: null
        };

        var i = Math.floor(h * 6);
        var f = h * 6 - i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);

        switch (i % 6)
        {
            case 0:
                color.r = v;
                color.g = t;
                color.b = p;
                break;
            case 1:
                color.r = q;
                color.g = v;
                color.b = p;
                break;
            case 2:
                color.r = p;
                color.g = v;
                color.b = t;
                break;
            case 3:
                color.r = p;
                color.g = q;
                color.b = v;
                break;
            case 4:
                color.r = t;
                color.g = p;
                color.b = v;
                break;
            case 5:
                color.r = v;
                color.g = p;
                color.b = q;
                break;
        }

        color.r = Math.floor(color.r * 255);
        color.g = Math.floor(color.g * 255);
        color.b = Math.floor(color.b * 255);

        return color;
    }
}