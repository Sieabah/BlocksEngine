
export abstract class System {
  public abstract update( dtime: number ): void;

  public abstract init(): void;

  public abstract SendMessage( event: any ): void;
}
