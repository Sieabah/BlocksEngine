import { Game } from 'engine';

export abstract class Level {
    abstract setup(game: Game): void;

    abstract onBeginPlay(game: Game): void;
}