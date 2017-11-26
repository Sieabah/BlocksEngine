import { System } from 'engine/system';
import { Ticks } from 'engine/lib/Ticks';

export abstract class RenderSystem<T> extends System {
  protected abstract _renderer: T;

  get renderer(): T { return this._renderer; }

  protected abstract _meshes: Array<any> = [];

  public addMesh(mesh: any){
    this._meshes.push(mesh);
  }
}
