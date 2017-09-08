import { Vec3 } from 'alfador';
import { Component } from 'engine/component';

export class TranslateComponent extends Component {
  protected readonly _name: string = 'translate-component';

  protected _position: Vec3;

  constructor(){
    super();
    this._position = new Vec3(0,0,0);
  }

  get position(): Vec3 {
    return this._position;
  }

  public translate({
    x = this.position.x,
    y = this.position.y,
    z = this.position.z,
                   }){
    this._position = new Vec3(x, y, z);
  }

  public move({
    x = 0,
    y = 0,
    z = 0,
              }){
    this._position = new Vec3(this.position.x + x, this.position.y + y, this.position.z + z)
  }
}
