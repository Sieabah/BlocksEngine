/// <reference path="../../engine/Include.ts" />
/// <reference path="../Actors/MousePoint.ts" />

class GBMainMenu extends Menu {
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

        let fps: SActorText = new SActorText(new Point(10,10));
        fps.setTick(dtime => fps.text = 'dtime: '+String(dtime));
        fps.doesTick(true);

        game.engine().manager().addActor(fps);

        let ms: SActorText = new SActorText(new Point(10,25));
        ms.setTick(dtime => {
            let frames = Math.round(1000/dtime);
            ms.text = 'FPS: '+String(frames)
        });
        ms.doesTick(true);

        game.engine().manager().addActor(ms);

        let text: SActorText = new SActorText(new Point(10,40));
        text.setTick(dtime => {
            text.text = String(Mouse.x)+', '+String(Mouse.y)
        });
        text.doesTick(true);

        game.engine().manager().addActor(text);
        
        super.setup(game);
    }
}