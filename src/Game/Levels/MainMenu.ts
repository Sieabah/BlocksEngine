import { Menu } from 'engine';
import { MousePoint } from '../Actors/MousePoint';

export class GBMainMenu extends Menu {
    constructor(){
        super();
    }

    public play(game: Game){
        game.engine().getAudio().play('media/menuMusic.ogg');
    }

    public setup(game: Game){
        /*this.options = [
            new MenuOption('Play', () => {
                this.play(game);
            }, (actor) => {
                actor.color = new Colour(255,0,255);
            }, (actor) => {
                actor.color = new Colour(255,255,255);
            })
        ];*/

        game.engine().manager().addActor(new MousePoint());

        let fps: SText = new SText('fps', new Point(10,10));
        fps.setTick(dtime => fps.setText('dtime: '+String(dtime)));

        game.engine().manager().addActor(fps);

        let ms: SText = new SText('ms', new Point(10,25), null, undefined, undefined,new Colour(255,80,80));
        ms.setTick(dtime => ms.setText('FPS: '+String(Math.round(1000/dtime))));

        game.engine().manager().addActor(ms);

        let text: SText = new SText('mouse', new Point(10,40));
        text.setTick(dtime => text.setText(String(Mouse.x)+', '+String(Mouse.y)));

        game.engine().manager().addActor(text);
        
        super.setup(game);
    }
}