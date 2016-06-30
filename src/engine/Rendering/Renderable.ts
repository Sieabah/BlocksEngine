/// <reference path="Board.ts" />
/// <reference path="../SMath.ts" />

interface Renderable {
    draw(canvas: Board): void;
    bounds: Array<Point>;
    position: Point;
    rotation: Rotator;
    scale: number;
    color: Colour;
}