
import { Singleton } from 'engine/lib';

export abstract class System extends Singleton {
  protected doesTick: boolean = false;

  get ticks(): boolean { return this.doesTick }

  public abstract update( dtime?: number ): void;

  public abstract init(): void;
  public abstract destroy(): void;

  public abstract SendMessage( event: any ): void;
}
