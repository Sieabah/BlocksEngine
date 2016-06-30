/// <reference path="Renderable.ts" />
/// <reference path="../SMath.ts" />
/// <reference path="../Util/Color.ts" />

class Board {
    public resize(){
        this.pieces['backdrop'].style.width = String(window.innerWidth)+'px';
        this.pieces['backdrop'].style.height = String(window.innerHeight)+'px';

        for(let canvas in this.pieces['canvas']){
            if(!this.pieces['canvas'].hasOwnProperty(canvas)) continue;
            let element = this.pieces['canvas'][canvas];

            element.width = window.innerWidth;
            element.height = window.innerHeight;
        }
    }

    private pieces: Object = {};
    constructor(){
        let bodies = document.getElementsByTagName('body');
        if(bodies.length != 1)
            throw new Error('Too many or not enough body tags');
        let body = bodies[0];

        let backdrop = document.createElement('div');
        backdrop.style.width = String(window.innerWidth)+'px';
        backdrop.style.height = String(window.innerHeight)+'px';
        backdrop.style.backgroundColor = 'rgba(0,0,0,0.1)';
        Board.position(backdrop, '0');

        let canvas1 = document.createElement('canvas');

        Board.position(canvas1);

        let canvas2 = document.createElement('canvas');

        Board.position(canvas2);
        canvas2.style.display = 'none';

        body.innerHTML = '';
        body.appendChild(canvas1);
        body.appendChild(canvas2);
        body.appendChild(backdrop);
        this.pieces['canvas'] = {
            front: canvas1,
            back: canvas2
        };
        this.pieces['backdrop'] = backdrop;

        this.resize();
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

    public draw(points: Array<Point>, actor?: Renderable){
        let ctx = this.getContext();

        if(actor)
            ctx.fillStyle = Color.colorStr(actor.color);

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        points.shift();

        for(let point of points){
            ctx.lineTo(point.x, point.y);
        }

        ctx.closePath();

        ctx.fill();
    }

    public text(message:string = '', x: number = 0, y: number = 0, font:string = '48x serif'){
        let ctx = this.getContext();
        ctx.font = font;
        ctx.fillText(message, x, y);
    }

    private static clear(canvas: HTMLCanvasElement){
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    }

    public clearFront(){
        Board.clear(this.getCanvas('front'));
    }

    public clearBack(){
        Board.clear(this.getCanvas('back'));
    }

    public swap(){
        let back = this.getCanvas('back');
        let front = this.getCanvas('front');

        back.style.display = 'block';
        front.style.display = 'none';

        this.setCanvas('front', back);
        this.setCanvas('back', front);
    }

    public setBackdrop(r: number, g: number, b: number){
        if(isNaN(r) || isNaN(g) || isNaN(b)) return;

        let backdrop: HTMLElement = this.pieces['backdrop'];

        this.getBackdrop().style.backgroundColor = 'rgba('+r+','+g+','+b+',0.2)';
    }
}
