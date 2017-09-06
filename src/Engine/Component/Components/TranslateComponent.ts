import { Vec3 } from 'alfador';
import { Component } from '../Component';

export class TranslateComponent extends Component {
  protected _name: string = 'translate-component';

  protected position: Vec3;

  constructor(){
    super();
    this.position = new Vec3(0,0,0);
  }
}
