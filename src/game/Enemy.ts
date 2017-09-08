import { Player } from './Player';
import { InputComponent, MovementComponent, TranslateComponent } from 'engine/component';
import { InputSystem } from 'engine/system';
import { Vec3 } from 'alfador';
import * as almostEqual from 'almost-equal';

export class Enemy extends Player {
  constructor(input: InputSystem, private player: Player){
    super(input);

    const movement: MovementComponent = this.getComponent(MovementComponent);
    movement.state.speed.walk = {
      acceleration: {
        left_right: { min: -3, max: 3, value: 10 },
        forward_back: { min: 0, max: 0, value: 0 },
        up_down: { min: -3, max: 3, value: 10 },
        damping: 0.85,
      }
    }
  }

  public onBeginPlay(): void {}

  public onEndPlay(){
    const input: InputComponent = this.getComponent(InputComponent);

    if(input)
      input.unbindAll();
  }

  public think(dtime: number){
    const target: TranslateComponent = this.player.getComponent(TranslateComponent);
    const movement: MovementComponent = this.getComponent(MovementComponent);
    const translate: TranslateComponent = this.getComponent(TranslateComponent);

    const ray: Vec3 = target.position.sub(translate.position);

    const stopDistance = 50;

    if(translate.position.equals(target.position, stopDistance)) {
      for (const direction in movement.direction)
        movement.direction[direction] = false;

      return ray;
    }

    /*if(ray.length() > stopDistance*2.5)
      movement.run();
    else
      movement.walk();*/

    if(!almostEqual(ray.x, 0, 10)) {
      if (ray.x < 0) {
        movement.direction.left = true;
        movement.direction.right = false;
      }
      if (ray.x > 0) {
        movement.direction.right = true;
        movement.direction.left = false;
      }
    } else {
      movement.direction.left = false;
      movement.direction.right = false;
    }

    if(!almostEqual(ray.y, 0, 10)) {
      if (ray.y > 0) {
        movement.direction.down = true;
        movement.direction.up = false;
      }
      if (ray.y < 0) {
        movement.direction.up = true;
        movement.direction.down = false;
      }
    } else {
      movement.direction.down = false;
      movement.direction.up = false;
    }

    return ray;
  }

  public update(dtime: number){
    const ray: Vec3 = this.think(dtime);

    const movement: MovementComponent = this.getComponent(MovementComponent);
    const translate: TranslateComponent = this.getComponent(TranslateComponent);
    movement.update(dtime);

    document.getElementById('enemyInfo').innerHTML = `
      <h5>Enemy</h5>
      ${(Date.now() % 2 ? '/' : '\\')} ${JSON.stringify(translate.position)} <br/>
      <h6>State</h6>
      <pre>Running:${JSON.stringify(movement.state.running)}</pre>
      <pre>${JSON.stringify(movement.state.speed.acceleration, null, ' ')}</pre>
      <h6>Direction</h6>
      <pre>${JSON.stringify(movement.direction, null, ' ')}</pre>
      <h6>Ray</h6>
      <pre>${JSON.stringify(ray, null, ' ')})</pre>
    `;

    document.getElementById('enemy').style.left = translate.position.x+'px';
    document.getElementById('enemy').style.top = translate.position.y+'px';
  }
}
