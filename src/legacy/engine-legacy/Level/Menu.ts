import { Level } from './Level';
import { MenuOption } from './MenuOption';
import { Game } from '../CoreGame';

export abstract class Menu extends Level {
    protected options: Array<MenuOption>;

    constructor(){
        super();

        this.options = [];
    }

    public setup(game: Game){
        /*
        let middle = new Point(window.innerWidth/2, window.innerHeight/2);

        for(let option of this.options){
            let actor = new TextActor(option.getName(), new Point(middle.x, middle.y-100), new Colour(255,255,255,1));

            actor.onClick = (actor) => {
                option.activate(actor);
            };

            actor.onHover = (actor) => {
                option.hover(actor);
            };

            actor.offHover = (actor) => {
                option.offhover(actor);
            };

            game.addActor(actor);
        }*/
    }
}