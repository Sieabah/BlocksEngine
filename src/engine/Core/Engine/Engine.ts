
import { System } from "./System";

export class Engine{
  public update( dtime: number ): void {

  }

  public mainloop(): void {

  }

  public add( sys: System ): void {
    this._systems.push(sys);
  }

  protected _systems: Array<System> = [];
}
