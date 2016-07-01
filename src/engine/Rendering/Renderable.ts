/// <reference path="Board.ts" />
/// <reference path="../Math/SMath.ts" />
/// <reference path="../Math/Tri.ts" />

interface Renderable {
    draw(canvas: Board): void;
    bounds: Array<Tri>;
    position: Point;
    rotation: Rotator;
    scale: number;
    color: Colour;
}