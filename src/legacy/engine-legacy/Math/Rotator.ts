export class Rotator {
    yaw: number;
    pitch: number;
    roll: number;
    constructor(yaw?: number, pitch?: number, roll?: number){
        this.yaw = yaw ? yaw : 0;
        this.pitch = pitch ? pitch : 0;
        this.roll = roll ? roll : 0;
    }
}