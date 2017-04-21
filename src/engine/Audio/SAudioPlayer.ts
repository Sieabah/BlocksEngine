export class SAudioPlayer{
    private player: HTMLAudioElement;

    constructor(){
        this.player = document.createElement('audio');
    }

    public getPlayer(): HTMLAudioElement{
        return this.player;
    }
}