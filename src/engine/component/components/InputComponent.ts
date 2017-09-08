
import { Component } from "engine/component";
import { TranslateComponent } from './TranslateComponent';
import { InputSystem } from 'engine/system';

import { Engine } from 'engine/Engine';
import { Callback } from 'keyboardjs';

export class InputComponent extends Component {
  protected readonly _name: string = 'input-component';

  protected _input: InputSystem = null;

  protected _binds: Array<Function> = [];

  /**
   * Unbind and cleanup binds array in the process
   * @param boundFunc Unbind function wrapper
   */
  protected keyunbind(boundFunc): void {
    for(let i = 0; i < this._binds.length; i++) {
      const bound = this._binds[i];
      if (boundFunc === bound) {
        bound();
        this._binds.splice(i, 1);
      }
    }
  }

  /**
   * Bind to input from keyboard
   * @param {string} keycombo
   * @param {Function} callback
   * @returns {Function} Function to call to unbind
   */
  public keybind(keycombo: string, pressed: Callback, released?: Callback): Function {
    this._input.keybind(keycombo, pressed, released);

    const unbindFunc = () => {
      this._input.keyunbind(keycombo, pressed, released);
    };

    this._binds.push(unbindFunc);

    return () => this.keyunbind(unbindFunc);
  }

  /**
   * Unbind all keyboard binds
   */
  public unbindAll(): void {
    for(const unbindFunc of this._binds)
      unbindFunc();

    this._binds = [];
  }

  public destroy(){
    this.unbindAll();
  }

  constructor(inputSystem: InputSystem){
    super();

    this._input = inputSystem;
  }
}
