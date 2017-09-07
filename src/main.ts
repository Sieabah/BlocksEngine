//import { GetBlocks } from 'game/Game';

//(new GetBlocks()).run();

//import { Player } from 'game/player';

//const ply = new Player();

//console.log(ply);

import { Game } from 'game/Game';

const game = new Game();

try {
  game.play();
} catch (e){
  game.endPlay();
  game.stop();

  throw e;
}
