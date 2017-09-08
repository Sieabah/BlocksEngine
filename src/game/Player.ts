
import { Actor } from 'engine/coregame/Actor';
import { InputComponent, MovementComponent, TranslateComponent } from 'engine/component';
import { InputSystem } from 'engine/system';

export class Player extends Actor {
  constructor(input: InputSystem){
    super();
    this.doesTick = true;

    const translate: TranslateComponent = this.getComponent(TranslateComponent);

    super.addComponent(new InputComponent(input));
    super.addComponent(new MovementComponent(translate));
  }

  public onBeginPlay(){
    const input: InputComponent = this.getComponent(InputComponent);
    const movement: MovementComponent = this.getComponent(MovementComponent);

    const keybind = {
      'up': ['w', () => movement.direction.up = true, () => movement.direction.up = false],
      'down': ['s', () => movement.direction.down = true, () => movement.direction.down = false],
      'left': ['a', () => movement.direction.left = true, () => movement.direction.left = false],
      'right': ['d', () => movement.direction.right = true, () => movement.direction.right = false],
      'sprint': ['shift', () => movement.run(), () => movement.walk()],
    };

    for(let bind in keybind)
      input.keybind(keybind[bind][0], keybind[bind][1], keybind[bind][2]);
  }

  public onEndPlay(){
    const input: InputComponent = this.getComponent(InputComponent);

    if(input)
      input.unbindAll();
  }

  public update(dtime: number){
    const movement: MovementComponent = this.getComponent(MovementComponent);
    const translate: TranslateComponent = this.getComponent(TranslateComponent);

    movement.update(dtime);

    document.getElementById('playerInfo').innerHTML = `
      ${(Date.now() % 2 ? '/' : '\\')} ${JSON.stringify(translate.position)} <br/>
      <h5>Player</h5>
      <pre>Running:${JSON.stringify(movement.state.running)}</pre>
      <pre>${JSON.stringify(movement.state.speed.acceleration, null, ' ')}</pre>
      <h6>Direction</h6>
      <pre>${JSON.stringify(movement.direction, null, ' ')}</pre>
    `;

    document.getElementById('player').style.left = translate.position.x+'px';
    document.getElementById('player').style.top = translate.position.y+'px';
  }
}
