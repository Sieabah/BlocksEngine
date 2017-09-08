import { Vec3 } from 'alfador';

import {Component, MovementType} from 'engine/component';
import { TranslateComponent } from '../TranslateComponent';
import { Ticks } from 'engine/lib';

import {
  MovementState,
  MovementDirection,
  clamp
} from './MovementTypes';

declare const window: any;

export class MovementComponent extends Component implements Ticks {
  protected _name: string = 'movement-component';

  protected _state: MovementState = null;
  protected _translate: TranslateComponent = null;

  public get state(): MovementState { return this._state };

  get bJumping(): boolean { return this.state.jumping; };

  get bRunning(): boolean { return this.state.running; };

  public direction: MovementDirection = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    up: false,
    down: false,
  };

  constructor(translate: TranslateComponent){
    super();

    this._translate = translate;

    const defaultOptions: MovementState = {
      running: false,
      jumping: false,
      speed: {
        walk: {
          acceleration: {
            left_right: { min: -7, max: 7, value: 120 },
            forward_back: { min: 0, max: 0, value: 0 },
            up_down: { min: -7, max: 7, value: 120 },
            damping: 0,
          }
        },
        run: {
          acceleration: {
            left_right: { min: -20, max: 20, value: 240 },
            forward_back: { min: 0, max: 0, value: 0 },
            up_down: { min: -20, max: 20, value: 240 },
            damping: 0.75,
          },
        },
        acceleration: new Vec3(0, 0, 0)
      }
    };

    this._state = defaultOptions;
  }

  public jump(){ this._state.jumping = true; }
  public stopJump(){ this._state.jumping = false; }

  public run(){ this._state.running = true; }
  public walk(){ this._state.running = false; }

  public update(dtime: number): void {
    const speed: MovementType = this.bRunning ? this.state.speed.run : this.state.speed.walk;

    //Frame speed modifier
    const speedModifier = (1000/dtime);

    let newSpeed: Vec3 = new Vec3(0, 0, 0);

    const upDownAccel = speed.acceleration.up_down.value / speedModifier;
    const leftRightAccel = speed.acceleration.up_down.value / speedModifier;

    if(this.direction.up)
      newSpeed = newSpeed.sub(new Vec3(0, upDownAccel, 0));
    if(this.direction.down)
      newSpeed = newSpeed.add(new Vec3(0, upDownAccel, 0));

    if(this.direction.left)
      newSpeed = newSpeed.sub(new Vec3(leftRightAccel, 0, 0));
    if(this.direction.right)
      newSpeed = newSpeed.add(new Vec3(leftRightAccel, 0, 0));

    this.state.speed.acceleration = new Vec3(
      clamp(speed.acceleration.left_right, Number.parseFloat((this.state.speed.acceleration.x + newSpeed.x).toFixed(7))),
      clamp(speed.acceleration.up_down, Number.parseFloat((this.state.speed.acceleration.y + newSpeed.y).toFixed(7))),
      0
    );

    const position = this._translate.position;

    const newX = position.x + this.state.speed.acceleration.x;
    const newY = position.y + this.state.speed.acceleration.y;

    const x = clamp({ min: 0, max: window.innerWidth }, newX);
    const y = clamp({ min: 0, max: window.innerHeight }, newY);

    let accel = new Vec3(1, 1, 1);

    if(newX != x)
      accel.x = 0;
    if(newY != y)
      accel.y = 0;

    this.state.speed.acceleration = new Vec3(
      accel.x * this.state.speed.acceleration.x,
      accel.y * this.state.speed.acceleration.y,
      accel.z * this.state.speed.acceleration.z,
    );

    this._translate.translate({ x, y });

    if(!(this.direction.up || this.direction.down))
      this.state.speed.acceleration.y = this.state.speed.acceleration.y * speed.acceleration.damping;

    if(!(this.direction.forward || this.direction.backward))
      this.state.speed.acceleration.z = this.state.speed.acceleration.z * speed.acceleration.damping;

    if(!(this.direction.left || this.direction.right))
      this.state.speed.acceleration.x = this.state.speed.acceleration.x * speed.acceleration.damping;
  }
}
