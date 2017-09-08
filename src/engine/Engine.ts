
import { Singleton } from 'engine/lib';

import { System } from './system/';
import {
  InputSystem
} from './system';

export type EngineOptions = {
  input?: InputSystem
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
    for(const system of this._systems)
      if(system.constructor === sys)
        return system;

    return null;
  }

  protected _systems: Array<System> = [];

  constructor({ input = null }: EngineOptions = {}) {
    super();

    this.add(input || new InputSystem());
  }
}
