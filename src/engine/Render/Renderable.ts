import { Board } from './Board';
import { Colour } from 'engine/Util';
import { 
    Tri,
    Point,
    Rotator
} from 'engine/Math';

export interface Renderable {
    draw(canvas: Board): void;
    bounds: Array<Tri>;
    position: Point;
    rotation: Rotator;
    scale: number;
    color: Colour;
}