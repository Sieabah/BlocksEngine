
import { Singleton } from 'engine/lib';

import { Render2D, System } from './system/';
import {
  InputSystem
} from './system';
import {RenderSystem} from "engine/system/systems/rendering";

export type EngineOptions = {
  input?: InputSystem,
  renderer?: RenderSystem<Render2D>
}

export class Engine extends Singleton {
  private frame: any = null;
  private _time: number = Date.now();

  /**
   * Update loop
   * @param {number} dtime
   */
  public update( dtime: number ): void {
    for(const system of this._systems)
      if(system.ticks)
        system.update(dtime);
  }

  /**
   * Engine mainloop
   */
  public mainloop(): void {
    const now = Date.now();
    const dtime = now - this._time;
    this._time = now;

    this.update(dtime);

    this.frame = window.requestAnimationFrame(() => this.mainloop());
  }

  /**
   * Initialize Engine Systems
   */
  public init(): void {
    for(const system of this._systems)
      system.init();

    this.start();
  }

  /**
   * Start Engine
   */
  public start(): void {
    if(!this.frame)
      this.mainloop();
  }

  /**
   * Stop Engine
   */
  public stop(): void {
    if(this.frame) {
      window.cancelAnimationFrame(this.frame);
      this.frame = null;
    }
  }

  /**
   * Stop Engine and shutdown
   */
  public shutdown(): void {
    this.stop();
    for(const system of this._systems)
      system.destroy();
  }

  /**
   * Add System
   * @param {System} sys
   */
  public add( sys: System ): void {
    this._systems.push(sys);
  }

  /**
   * Get system
   * @param {Function} sys
   * @returns {any}
   */
  public getSystem( sys: Function ): any | null {
    let potential = [];

    for(const system of this._systems)
      if(system.constructor === sys)
        return system;
      else if(system instanceof sys)
        potential.push(system);

    if(potential.length > 0)
      return potential[0];

    return null;
  }

  protected _systems: Array<System> = [];

  private _renderType: Function;
  get RenderType(): Function { return this._renderType }

  constructor({
    input = null,
    renderer = null
  }: EngineOptions = {}) {
    super();

    const _renderer = renderer || new Render2D();

    this.add(input || new InputSystem());
    this.add(_renderer);
  }
}
