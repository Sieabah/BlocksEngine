import { Component } from 'engine/component';

export class RenderComponent extends Component {
  protected _name: string = 'render-component';

  protected _mesh: any = null;

  constructor(mesh: any = null){
    super();


    this._mesh = mesh;
  }

  public mesh(): any{
    return this._mesh;
  }
}
