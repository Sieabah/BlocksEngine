
import { Actor } from 'engine/coregame/Actor';
import { InputComponent, TranslateComponent } from 'engine/component';
import { InputSystem } from 'engine/system';

export class Player extends Actor {
  constructor(input: InputSystem){
    super();
    this.doesTick = true;

    const translate = super.getComponent(TranslateComponent);
    super.addComponent(new InputComponent(translate, input));
  }

  protected movement = {
    up: false,
    down: false,
    left: false,
    right: false
  };

  public onBeginPlay(){
    const input: InputComponent = this.getComponent(InputComponent);

    if(input){
      input.keybind('w', () => {this.movement.up = true}, () => this.movement.up = false);
      input.keybind('s', () => this.movement.down = true, () => this.movement.down = false);
      input.keybind('a', () => this.movement.left = true, () => this.movement.left = false);
      input.keybind('d', () => this.movement.right = true, () => this.movement.right = false);
    }
  }

  public onEndPlay(){
    const input: InputComponent = this.getComponent(InputComponent);

    if(input)
      input.unbindAll();
  }

  public update(dtime: number){
    const translate: TranslateComponent = this.getComponent(TranslateComponent);

    //@todo Move to MovementComponent
    const speed = 120;
    const movement = speed / (1000/dtime);

    let newX = 0;
    let newY = 0;

    if(this.movement.up)
      newY -= movement;
    if(this.movement.down)
      newY += movement;

    if(this.movement.left)
      newX -= movement;
    if(this.movement.right)
      newX += movement;

    translate.translate({ x: translate.position.x + newX, y: translate.position.y + newY });

    document.getElementById('playerInfo').innerText = JSON.stringify(translate.position) + ' ' + (Date.now() % 2 ? '/' : '\\');
    document.getElementById('player').style.left = translate.position.x+'px';
    document.getElementById('player').style.top = translate.position.y+'px';
  }
}
