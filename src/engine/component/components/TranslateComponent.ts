import { Vec3 } from 'alfador';
import { Component } from '../Component';

export class TranslateComponent extends Component {
  protected _name: string = 'translate-component';

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
}
