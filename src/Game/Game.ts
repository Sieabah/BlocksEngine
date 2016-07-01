/// <reference path="../engine/Include.ts" />
/// <reference path="Levels/MainMenu.ts" />

class GetBlocks extends Game {
    public setup(){
        this.loadLevel(new GBMainMenu());
        //this.engine.getAudio().play('media/menuMusic.ogg', true);
    }
}