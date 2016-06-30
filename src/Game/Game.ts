/// <reference path="../engine/CoreGame.ts" />

class GetBlocks extends Game {
    public setup(){
        let bounds: Array<Point> = [
            new Point(-1, 1), new Point(1, 1), new Point(1, -1), new Point(-1, -1)
        ];
        let actor: Actor = new Actor(bounds, new Point(window.innerWidth/2, window.innerHeight/2),
            new Rotator(), 5, new Colour(255,255,255,1));
        actor.setTick(()=>{
            actor.setPosition(Mouse.x, Mouse.y);
        });
        actor.doesTick(true);

        this.addActor(actor);

        let ms: TextActor = new TextActor('', new Point(10,20));
        ms.setTick(dtime =>{
            ms.setText(String(dtime)+' ms');
        });
        ms.doesTick(true);

        this.addActor(ms);

        let fps: TextActor = new TextActor('', new Point(10,40));
        fps.setTick(dtime =>{
            let frames = Math.round(1000/dtime);
            fps.setText(String(frames)+' fps');
        });
        fps.doesTick(true);

        this.addActor(fps);
    }
}