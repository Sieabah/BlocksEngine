import { System } from '../System';
import { EngineEvent } from 'engine/lib';

import * as keyboardJS from 'keyboardjs';
import { Callback } from 'keyboardjs';

export const enum InputEvent {
  DISABLE, ENABLE, RESET
}

declare const window: any;

export class InputSystem extends System {
  public init(): void {
    keyboardJS.watch(window);
  }

  public update(): void {}

  public destroy(): void {
    keyboardJS.reset()
  }

  public switchContext(){

  }

  public keybind(keyCombo: string | string[], pressed: Callback, released?: Callback, preventRepeatByDefault?: boolean): void {
    return keyboardJS.bind(keyCombo, pressed, released, preventRepeatByDefault);
  }

  public keyunbind(keyCombo: string | string[], pressed?: Callback, released?: Callback): void {
    return keyboardJS.unbind(keyCombo, pressed, released);
  }

  public SendMessage(event: EngineEvent): void {
    switch(event.action){
      case InputEvent.ENABLE:
        return keyboardJS.resume();
      case InputEvent.DISABLE:
        return keyboardJS.pause();
      case InputEvent.RESET:
        return keyboardJS.reset();
    }
  }
}
