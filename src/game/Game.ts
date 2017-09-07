import { Engine } from 'engine/Engine';
import { Actor } from 'engine/coregame/Actor';

import { Player } from './Player';
import { InputSystem } from 'engine/system';

export class Game extends Engine {
  constructor(){
    super();

    this.addActor(new Player(this.getSystem( InputSystem )));
    super.init();
  }

  public play(){
    for(const actor of this._actors)
      actor.onBeginPlay();
  }

  public endPlay(){
    for(const actor of this._actors)
      actor.onEndPlay();
  }

  private _data = {
    min: Infinity,
    dtime: 0,
    max: 0,
  };
  public update(dtime: number){
    super.update(dtime);

    for(const actor of this._actors)
      if(actor.ticks)
        actor.update(dtime);

    this._data.dtime = dtime;
    this._data.min = this._data.min > dtime ? dtime : this._data.min;
    this._data.max = this._data.max < dtime ? dtime : this._data.max;

    document.getElementById('engineloop').innerText = `${Date.now() % 2 ? '/' : '\\'} ${JSON.stringify(this._data)}`;
  }

  public addActor(actor: any | Object ): void{
    let _actor = typeof actor === 'function' ? new actor() : actor;

    if(_actor instanceof Actor)
      this._actors.push(actor);
    else
      throw new Error(`Tried to add actor ${actor.constructor} but is not 'Actor'`);
  }

  protected _actors: Array<Actor> = [];
}
