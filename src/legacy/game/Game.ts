import { Game } from 'engine/CoreGame';
import { GBMainMenu } from './Levels';

export class GetBlocks extends Game {
    public setup(){
        this.loadLevel(new GBMainMenu());
    }
}