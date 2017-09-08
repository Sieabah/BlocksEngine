import { Vec3 } from 'alfador';

declare type Clamp = { min?: number, max?: number, value?: number }

export function clamp(clamped: Clamp, value: number){
  if(value < clamped.min) return clamped.min;
  if(value > clamped.max) return clamped.max;

  return value;
}

export type MovementDirection = {
  forward: boolean,
  backward: boolean,
  left: boolean,
  right: boolean,
  up: boolean,
  down: boolean,
}

export type MovementState = {
  running: boolean,
  jumping: boolean,
  speed: MovementTypes,
}

export type MovementTypes = {
  [key: string]: MovementType,
  acceleration: Vec3,
}

export type MovementType = {
  acceleration?: {
    left_right?: Clamp,
    forward_back?: Clamp,
    up_down?: Clamp,
    damping?: number,
  },
  speed_limit?: Clamp,
}
