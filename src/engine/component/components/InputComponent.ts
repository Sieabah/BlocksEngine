
import { Component } from "../Component";
import { TranslateComponent } from './TranslateComponent';

export class InputComponent extends Component {
  protected _name: string = 'input-component';

  protected _translate: TranslateComponent;

  constructor(translateComponent: TranslateComponent){
    super();

    this._translate = translateComponent;
  }
}
