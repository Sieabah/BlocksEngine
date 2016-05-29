/// <reference path="SMath.ts" />

var HSVtoRGB = function (h, s, v) {

    var out = {
        r: 0,
        g: 0,
        b: 0
    };

    var r, g, b;
    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    switch (i % 6)
    {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        case 5:
            r = v;
            g = p;
            b = q;
            break;
    }

    out.r = Math.floor(r * 255);
    out.g = Math.floor(g * 255);
    out.b = Math.floor(b * 255);

    return out;
};

interface Renderable {
    draw(canvas: Board): void;
    bounds: Array<Point>;
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
        this.position(backdrop, '-1');

        let board = document.createElement('canvas');
        board.width = window.innerWidth;
        board.height = window.innerHeight;

        this.position(board);

        body.innerHTML = '';
        body.appendChild(board);
        body.appendChild(backdrop);
        this.pieces['board'] = board;
        this.pieces['backdrop'] = backdrop;
    }

    private position (element: HTMLElement, zindex?: string): void{
        element.style.position = 'absolute';
        element.style.zIndex = zindex ? zindex : '1000';
        element.style.top = '0';
        element.style.left = '0';
    }

    public setBackdrop(r: number, g: number, b: number){
        if(isNaN(r) || isNaN(g) || isNaN(b)) return;

        let backdrop: HTMLElement = this.pieces['backdrop'];

        backdrop.style.backgroundColor = 'rgba('+r+','+g+','+b+',1)';
    }
}

class SRender {
    board: Board;
    constructor(){
        console.log('SRender');
        this.board = new Board();
    }

    update(){
        console.log('SRender.update');
        let offset = Math.floor(Date.now()/50);
        offset = Math.abs(Math.sin(offset*(Math.PI/180)));
        let color = HSVtoRGB(offset,1,1);
        console.log(offset, color);
        this.board.setBackdrop(color.r, color.g, color.b);
    }
}