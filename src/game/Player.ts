
import { GameObject } from 'engine/coregame/gameobject';
import { InputComponent, TranslateComponent } from 'engine/component';

export class Player extends GameObject {
  constructor(){
    super();
    const translate = super.getComponent(TranslateComponent);

    super.addComponent(new InputComponent(translate));
  }
}
