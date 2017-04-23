import { 
    Tri,
    Point, 
    SMath 
} from 'engine/Math';

import { Colour, Color } from 'engine/Util';
import { Renderable } from './Renderable';

export class Board {
    private pieces: any = {};
    
    constructor(){
        let renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { antialias: true });
        Board.position(renderer.view);
        document.body.appendChild(renderer.view);

        renderer.autoResize = true
        renderer.view.style.display = "block";
        renderer.view.style.position = "absolute";
        renderer.backgroundColor = 0xFF0000;
        renderer.resize(window.innerWidth, window.innerHeight);

        let stage = new PIXI.Container();
        stage.interactive = true;

        let graphics = new PIXI.Graphics();
        stage.addChild(graphics);

        this.pieces['pixi'] = {
            stage, renderer, graphics
        };
        
        window.onresize = () => {
            console.log('resize');

            this.pieces.renderer.view.style.height = window.innerHeight+'px';
            this.pieces.renderer.view.style.width = window.innerWidth+'px';
            this.pieces.renderer.resize(window.innerWidth, window.innerHeight);
        };
    }

    private static position (element: HTMLElement, zindex?: string): void{
        element.style.position = 'absolute';
        element.style.zIndex = zindex ? zindex : '1000';
        element.style.top = '0';
        element.style.left = '0';
    }

    private getBackdrop(): HTMLElement{
        return this.pieces['backdrop'];
    }

    private getCanvas(chain?: string): HTMLCanvasElement{
        if(chain == 'front')
            return this.pieces['canvas']['front'];

        return this.pieces['canvas']['back'];
    }

    private setCanvas(chain: string, canvas: HTMLCanvasElement): void{
        this.pieces['canvas'][chain] = canvas;
    }

    private getContext(){
        return this.getCanvas().getContext('2d');
    }

    /*private drawTri(tri: Tri, color?: Colour){
        let ctx = this.getContext();
        let origColor = ctx.fillStyle;

        if(color == undefined)
            color = new Colour();

        ctx.fillStyle = Color.colorStr(color);

        ctx.beginPath();

        let points = tri.points();
        let tmp = points.shift();
        ctx.moveTo(tmp.x, tmp.y);

        /!*let textColor = new Colour(255,255,255,1);
        let x = SMath.truncate(tmp.x, 1);
        let y = SMath.truncate(tmp.y, 1);
        this.text(x+','+y, x, y, '10px serif', textColor);*!/

        for(let point of points){
            /!*let x = SMath.truncate(point.x, 1);
            let y = SMath.truncate(point.y, 1);
            this.text(x+','+y, x, y, '10px serif', textColor);*!/
            ctx.lineTo(point.x, point.y);
        }

        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = origColor;
    }*/

    private drawTri(tri: Tri, color?: Colour) {
        let gfx = this.pieces['pixi']['graphics'];

        if (color == undefined)
            color = new Colour();

        gfx.lineStyle(1, '0xFF3300', 1);
        gfx.beginFill('0xFF3300', 1);

        let points = tri.points();

        let tmp = points.shift();
        gfx.moveTo(tmp.x, tmp.y);

        for (let point of points) {
            let x = SMath.truncate(point.x, 1);
            let y = SMath.truncate(point.y, 1);
            gfx.lineTo(point.x, point.y);
        }

        gfx.endFill();
    }

    public draw(tris: Array<Tri>, actor?: Renderable){
        for(let tri of tris) {
            if (actor)
                this.drawTri(tri, actor.color);
            else
                this.drawTri(tri);
        }
    }

    public textSize(message:string = '', x: number = 0, y: number = 0, font:string = '12px serif'){
        let ctx = this.getContext();
        ctx.font = font;
        return ctx.measureText(message);
    }

    public text(message:string = '', x: number = 0, y: number = 0, font:string = '12px serif', color?: Colour){
        let ctx = this.getContext();
        let origColor = ctx.fillStyle;

        if(color == undefined)
            color = new Colour();

        ctx.fillStyle = Color.colorStr(color);

        ctx.font = font;
        ctx.fillText(message, x, y);

        ctx.fillStyle = origColor;
        return ctx;
    }

    private static clear(canvas: HTMLCanvasElement){
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    }

    public swap(){

        this.pieces['pixi']['renderer'].render(this.pieces['pixi']['stage']);
    }

    public clear(){
        this.pieces['pixi']['graphics'].clear();
    }

    public setBackdrop(r: number, g: number, b: number){
        if(isNaN(r) || isNaN(g) || isNaN(b)) return;

        let backdrop: HTMLElement = this.pieces['backdrop'];

        this.getBackdrop().style.backgroundColor = 'rgba('+r+','+g+','+b+',0.2)';
    }
}
