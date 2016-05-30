
class Point {
    x: number;
    y: number;
    constructor(x?: number, y?: number){
        this.x = x ? x : 0;
        this.y = y ? y : 0;
    }
}

class Rotator {
    yaw: number;
    pitch: number;
    roll: number;
    constructor(yaw?: number, pitch?: number, roll?: number){
        this.yaw = yaw ? yaw : 0;
        this.pitch = pitch ? pitch : 0;
        this.roll = roll ? roll : 0;
    }
}