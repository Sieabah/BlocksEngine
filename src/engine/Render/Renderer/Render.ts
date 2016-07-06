/// <reference path="../../../definitions/pixi.js.d.ts" />
/// <reference path="../../../definitions/pixi-spine.js.d.ts" />
/// <reference path="../../../definitions/pixi-particles.js.d.ts" />

class SRenderer {
    public resize(): void{
        /*
        this.pieces['backdrop'].style.width = String(window.innerWidth)+'px';
        this.pieces['backdrop'].style.height = String(window.innerHeight)+'px';

        for(let canvas in this.pieces['canvas']){
            if(!this.pieces['canvas'].hasOwnProperty(canvas)) continue;
            let element = this.pieces['canvas'][canvas];

            element.width = window.innerWidth;
            element.height = window.innerHeight;
        }
        */
    }

    private _stage = null;
    private _renderer = null;

    private registerRenderer(width: number = 1280, height: number = 720, options: Object= {}): PIXI.SystemRenderer {
        return PIXI.autoDetectRenderer(width, height, options);
    }

    private registerStage(): PIXI.Container {
        return new PIXI.Container();
    }

    protected renderer(): PIXI.SystemRenderer {
        if(!this._renderer) throw new Error('Renderer not initialized');
        return this._renderer;
    }

    protected stage(): PIXI.Container {
        if(!this._stage) throw new Error('Stage not initialized');
        return this._stage;
    }

    protected setup(){
        let bodies: NodeListOf<HTMLBodyElement> = document.getElementsByTagName('body');

        if(bodies.length < 1)
            throw new Error('Cannot find body!');

        let body = bodies[0];
        body.innerHTML = '';

        this._renderer = this.registerRenderer(window.innerWidth, window.innerHeight, {antialias: true});
        this._stage = this.registerStage();

        this.renderer().view.style.width = window.innerWidth + "px";
        this.renderer().view.style.height = window.innerHeight + "px";
        this.renderer().view.style.display = "block";

        this.position(this.renderer().view);
        body.appendChild(this.renderer().view);
    }

    public gfx: PIXI.Graphics;

    constructor(){
        this.setup();

        this.gfx = new PIXI.Graphics();
        this.stage().addChild(this.gfx);
    }

    protected position (element: HTMLElement, zindex: string = '1000'): void{
        element.style.position = 'absolute';
        element.style.zIndex = zindex;
        element.style.top = '0';
        element.style.left = '0';
    }

    public update(){

        this.renderer().render(this.stage());
    }
}