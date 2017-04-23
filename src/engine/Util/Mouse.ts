import { Observable, Observer, Subject } from 'rxjs';

export class Mouse {
    private static _mouseMove: Subject<MouseEvent> = null;
    private static _mouseClick: Subject<MouseEvent> = null;

    private static createSubjects(){
        Mouse._mouseMove = new Subject<MouseEvent>();
        Mouse._mouseClick = new Subject<MouseEvent>();

        document.onmouseup = (ev: MouseEvent) => Mouse._mouseClick.next(ev);
        document.onmousemove = (ev: MouseEvent) => Mouse._mouseMove.next(ev);
    }

    public static onMove(): Observable<MouseEvent>{
        if(Mouse._mouseMove == null)
            Mouse.createSubjects();

        return Mouse._mouseMove;
    }

    public static onClick(): Observable<MouseEvent>{
        if(Mouse._mouseMove == null)
            Mouse.createSubjects();

        return Mouse._mouseClick;
    }

    public x: number;
    public y: number;
    constructor(){
        Mouse.onMove().subscribe((ev: MouseEvent) => {
            this.x = ev.pageX;
            this.y = ev.pageY;
        })
    }
}