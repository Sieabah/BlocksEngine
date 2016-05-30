/// <reference path="SMath.ts" />
/// <reference path="Util/Color.ts" />

interface Renderable {
    draw(canvas: Board): void;
    bounds: Array<Point>;
    position: Point;
    rotation: Rotator;
    scale: number;
    color: { r: number, g: number, b: number, a: number };
}

class Actor implements Renderable{
    constructor(){
        this.bounds = [];
        this.color = {
            r: 0, g: 0, b: 0, a: 1
        };
        this.rotation = new Rotator();
        this.position = new Point();
        this.scale = 1;
    }

    public setPosition(x: number, y: number){
        this.position.x = x;
        this.position.y = y;
    }

    draw(board: Board): void{
        let bounds: Array<Point> = [];

        for(var point of this.bounds){
            let scaledPoint: Point = new Point(point.x, point.y);
            scaledPoint.x = scaledPoint.x * this.scale;
            scaledPoint.y = scaledPoint.y * this.scale;

            bounds.push(new Point(this.position.x+scaledPoint.x, this.position.y+scaledPoint.y));
        }

        board.draw(bounds, this);
    }
    bounds; position; rotation; scale; color;
}

class Board {
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
        Board.position(backdrop, '-1');

        let canvas1 = document.createElement('canvas');
        canvas1.width = window.innerWidth;
        canvas1.height = window.innerHeight;

        Board.position(canvas1);

        let canvas2 = document.createElement('canvas');
        canvas2.width = window.innerWidth;
        canvas2.height = window.innerHeight;

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

    public draw(points: Array<Point>, actor?: Renderable){
        let ctx = this.getCanvas().getContext('2d');

        if(actor)
            ctx.fillStyle = Color.colorStr(actor.color);

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        points.shift();

        for(var point of points){
            ctx.lineTo(point.x, point.y);
        }

        ctx.closePath();

        ctx.fill();
    }

    private clear(canvas: HTMLCanvasElement){
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    }

    public clearFront(){
        this.clear(this.getCanvas('front'));
    }

    public clearBack(){
        this.clear(this.getCanvas('back'));
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

class SRender {
    private board: Board;
    private queue: Array<Actor>;

    constructor(){
        console.log('SRender');
        this.board = new Board();
        this.queue = [];
    }

    public addActor(actor: Actor): number{
        this.queue.push(actor);
        return this.queue.length-1;
    }

    private getBoard(): Board{
        return this.board;
    }

    public getActor(actor: number): Actor{
        return this.queue[actor];
    }

    update(){
        let offset = Math.floor(Date.now()/50);
        offset = Math.abs(Math.sin(offset*(Math.PI/180)));
        let color = Color.HSVtoRGB(offset,1,1);
        this.board.setBackdrop(color.r, color.g, color.b);


        this.board.clearBack();

        for(var actor of this.queue){
            actor.draw(this.getBoard())
        }

        this.board.swap();
    }
}