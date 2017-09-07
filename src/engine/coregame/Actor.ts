import { GameObject } from './GameObject';

export abstract class Actor extends GameObject {
  public update(dtime: number): void {};

  public onBeginPlay(): void {};
  public onEndPlay(): void {};
}
