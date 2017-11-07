import { Engine } from 'engine/Engine';
import { Actor } from 'engine/coregame/Actor';

import { Player } from 'engine/coregame/entities/pawn/Player';
import { Enemy } from 'engine/coregame/entities/pawn/Enemy';
import { InputSystem, RenderSystem } from 'engine/system';

import { RenderComponent } from "engine/component";

export class Game extends Engine {
  constructor(){
    super();

    const ply = new Player(this.getSystem( InputSystem ));
    this.addActor(ply);

    //const ai = new Enemy(this.getSystem( InputSystem ), ply);
    //this.addActor(ai);

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

    //document.getElementById('engineloop').innerText = `${Date.now() % 2 ? '/' : '\\'} ${JSON.stringify(this._data)}`;
  }

  public addActor(actor: any | Object ): void {
    let _actor = typeof actor === 'function' ? new actor() : actor;

    if(_actor instanceof Actor) {
      const renderMesh = _actor.getComponent(RenderComponent);

      if(renderMesh)
        this.getSystem(this.RenderType).addMesh(renderMesh);

      this._actors.push(actor);
    }
    else
      throw new Error(`Tried to add actor ${actor.constructor} but is not 'Actor'`);
  }

  protected _actors: Array<Actor> = [];
}
