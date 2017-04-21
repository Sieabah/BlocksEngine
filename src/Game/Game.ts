import { Game } from 'engine/CoreGame';
import { MainMenu } from './Levels/MainMenu';

export class GetBlocks extends Game {
    public setup(){
        this.loadLevel(new GBMainMenu());
    }
}