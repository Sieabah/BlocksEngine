
import { System } from './system/';
import {
  InputSystem
} from './system/systems';

export class Engine {
  private frame: any = null;
  private _time: number = Date.now();

  /**
   * Update loop
   * @param {number} dtime
   */
  public update( dtime: number ): void {
    for(const system of this._systems)
      system.update(dtime);

    document.getElementById('engineloop').innerText = `${Date.now()} dtime: ${dtime}`;
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

  protected _systems: Array<System> = [];

  constructor({ input = null }: EngineOptions = {}) {
    this.add(input || new InputSystem());
  }
}

export type EngineOptions = {
  input?: InputSystem
}
