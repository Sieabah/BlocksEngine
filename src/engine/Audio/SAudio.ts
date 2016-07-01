class SAudioPlayer{
    private player: HTMLAudioElement;

    constructor(){
        this.player = document.createElement('audio');
    }

    public getPlayer(): HTMLAudioElement{
        return this.player;
    }
}

class SAudio {
    private audio: Array<SAudioPlayer>;
    constructor(){
        this.audio = [];
    }
    private static createAudio(){
        return new SAudioPlayer();
    }

    private load_sound(path: string, loop:boolean=false) {
        let player = SAudio.createAudio();

        let audio = player.getPlayer();

        audio.src = path;
        audio.loop = loop;
        audio.load();

        return player;
    }

    public play(path: string, loop:boolean=false){
        let player = this.load_sound(path, loop);
        player.getPlayer().play();
        this.audio.push(player);
    }
}