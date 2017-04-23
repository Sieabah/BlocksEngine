import { Point } from 'engine/Math';
import { SActor } from 'engine/Actor';

export class SRenderer {
    private debug: boolean = true;

    private _stage: PIXI.Container = null;
    private _renderer: PIXI.SystemRenderer = null;

    private registerRenderer(width: number = 1280, height: number = 720, options: any = {}): PIXI.SystemRenderer {
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
        this._renderer = this.registerRenderer(window.innerWidth, window.innerHeight, { antialias: true });
        this._stage = this.registerStage();

        this.renderer().view.style.width = "100%";
        this.renderer().view.style.height = "100%";
        this.renderer().view.style.display = "block";

        this.position(this.renderer().view);
        document.body.appendChild(this.renderer().view);

        window.onresize = () => this.renderer().resize(window.innerWidth, window.innerHeight);
    }

    constructor(){
        this.setup();
    }

    protected position (element: HTMLElement, zindex: string = '1000'): void{
        element.style.position = 'absolute';
        element.style.zIndex = zindex;
        element.style.top = '0';
        element.style.left = '0';
    }

    public update(actors?: SActor[]){
        this.draw(actors);
        this.renderer().render(this.stage());
        this.stage().removeChildren();
    }

    public debugtext(text: string, point: Point): PIXI.Text{
        let txt: PIXI.Text = new PIXI.Text(
            text+' '+point.x+','+point.y,{
                fill: '#FFFFFF'
            });

        txt.x = point.x;
        txt.y = point.y;

        return txt;
    }

    protected draw(actors: SActor[]){
        for(let actor of actors) {
            actor.draw(this.stage());
        }
    }
}