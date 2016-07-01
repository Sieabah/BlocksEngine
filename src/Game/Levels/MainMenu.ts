/// <reference path="../../engine/Include.ts" />

class GBMainMenu extends Menu {
    constructor(){
        super();
    }

    public play(game: Game){
        game.engine.getAudio().play('media/menuMusic.ogg');
    }

    public setup(game: Game){
        this.options = [
            new MenuOption('Play', () => {
                this.play(game);
            }, (actor) => {
                actor.color = new Colour(255,0,255);
            }, (actor) => {
                actor.color = new Colour(255,255,255);
            })
        ];

        let bounds: Array<Tri> = new Quad(new Point(1, 1), new Point(-1, 1), new Point(-1, -1), new Point(1, -1)).tris();

        let actor: Actor = new Actor(bounds, new Point(window.innerWidth/2, window.innerHeight/2),
            new Rotator(), 5, new Colour(255,255,255,1));

        actor.setTick(()=>{
            actor.setPosition(Mouse.x, Mouse.y);
        });

        actor.doesTick(true);

        game.addActor(actor);

        let ms: TextActor = new TextActor('', new Point(10,50), new Colour(255,255,255,1));
        ms.setTick(dtime =>{
            ms.setText('dtime: '+String(dtime));
        });
        ms.doesTick(true);

        game.addActor(ms);

        let fps: TextActor = new TextActor('', new Point(10,100), new Colour(255,255,255,1));
        fps.setTick(dtime =>{
            let frames = Math.round(1000/dtime);
            fps.setText('FPS: '+String(frames));
        });
        fps.doesTick(true);

        game.addActor(fps);

        let mouse: TextActor = new TextActor('', new Point(10,150), new Colour(255,255,255,1));
        mouse.setTick(() =>{
            //mouse.setPosition(Mouse.x, Mouse.y);
            mouse.setText(String(Mouse.x)+', '+String(Mouse.y));
        });
        mouse.doesTick(true);

        game.addActor(mouse);

        super.setup(game);
    }
}