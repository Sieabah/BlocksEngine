import { GameObject } from './GameObject';
import { Ticks } from 'engine/lib';

export abstract class Actor extends GameObject implements Ticks {
  public update(dtime: number): void {};

  public onBeginPlay(): void {};
  public onEndPlay(): void {};
}
