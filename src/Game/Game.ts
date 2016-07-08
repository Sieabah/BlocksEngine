/// <reference path="../engine/CoreGame.ts" />
/// <reference path="Levels/MainMenu.ts" />

class GetBlocks extends Game {
    public setup(){
        this.loadLevel(new GBMainMenu());
    }
}