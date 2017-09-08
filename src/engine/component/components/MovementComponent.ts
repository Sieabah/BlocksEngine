
import { Component } from '../Component';
import { TranslateComponent } from './TranslateComponent';
import { Ticks } from 'engine/lib';

export type MovementState = {
  running: boolean,
  jumping: boolean,
  speed: {
    walk: number,
    run: number
  }
}

export type MovementOptions = {
  speed?: {
    walk: number,
    run: number
  }
}

export class MovementComponent extends Component implements Ticks {
  protected _name: string = 'movement-component';

  protected _state: MovementState = null;
  protected _translate: TranslateComponent = null;

  get state(): MovementState { return this._state };

  get bJumping(): boolean { return this.state.jumping; };

  get bRunning(): boolean { return this.state.running; };

  get walkSpeed(): number { return this.state.speed.walk; };
  set walkSpeed(speed: number){ this.state.speed.walk = speed; }
  get runSpeed(): number { return this.state.speed.run; };
  set runSpeed(speed: number){ this.state.speed.run = speed; }

  get speed(): number {
    return this.bRunning ? this.runSpeed : this.walkSpeed
  }

  constructor(translate: TranslateComponent, state: MovementOptions = {}){
    super();

    const defaultOptions = {
      running: false,
      jumping: false,
      speed: {
        walk: 0,
        run: 0
      }
    };

    defaultOptions.speed = Object.assign(state.speed, defaultOptions.speed);

    this._state = defaultOptions;
  }

  public jump(){ this._state.jumping = true; }
  public stopJump(){ this._state.jumping = false; }

  public run(){ this._state.running = true; }
  public walk(){ this._state.running = false; }

  public update(dtime: number): void {

  }
}
