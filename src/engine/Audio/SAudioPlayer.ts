export class SAudioPlayer {
    private player: Howl;

    constructor(src: string, loop: boolean){
        this.player = new Howl({
            src, loop
        });
    }

    public getPlayer(): Howl{
        return this.player;
    }
}