import { SAudioPlayer } from './SAudioPlayer';

export class SAudio {
    private audio: Array<SAudioPlayer>;
    constructor(){
        this.audio = [];
    }

    private load_sound(path: string, loop:boolean=false) {
        let player = new SAudioPlayer(path, loop);
        
        player.getPlayer().load();

        return player;
    }

    public play(path: string, loop:boolean=false){
        let player = this.load_sound(path, loop);

        player.getPlayer().play();
        this.audio.push(player);

        return player;
    }
}