import {
    Menu,
    Game,
    SText,
    Point,
    Mouse,
    Colour
} from 'engine';

import { MousePoint } from 'game/Actors';

export class GBMainMenu extends Menu {
    constructor(){
        super();
    }

    public play(game: Game){
        game.engine().getAudio().play(require('assets/menuMusic.ogg'));
    }

    private _mouse = new Mouse();

    public setup(game: Game){
        game.engine().manager().addActor(new MousePoint());

        let fps: SText = new SText('fps', new Point(10,10));
        fps.setTick((dtime: number) => fps.setText('dtime: '+String(dtime)));

        game.engine().manager().addActor(fps);

        let ms: SText = new SText('ms', new Point(10,25), null, undefined, undefined,new Colour(255,80,80));
        ms.setTick((dtime: number) => ms.setText('FPS: '+String(Math.round(1000/dtime))));

        game.engine().manager().addActor(ms);

        let text: SText = new SText('mouse', new Point(10,40));
        text.setTick((dtime: number) => {
            //console.log(this, this.x, this.y);
            text.setText([this._mouse.x,this._mouse.y].join(', '))
        });

        console.log(this);

        game.engine().manager().addActor(text);
        
        super.setup(game);
    }
}