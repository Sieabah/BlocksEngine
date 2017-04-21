export class Mouse {
    public static x: number;
    public static y: number;

    private static clickTriggers: Array<Function> = [];

    public static mouseMove(event: MouseEvent){
        Mouse.x = event.pageX;
        Mouse.y = event.pageY;
    }

    public static mouseUp(event: MouseEvent){
        Mouse.x = event.pageX;
        Mouse.y = event.pageY;

        for(let trigger of Mouse.clickTriggers){
            trigger(Mouse.x, Mouse.y);
        }
    }

    public static registerClickTrigger(func: Function){
        Mouse.clickTriggers.push(func);
    }

    constructor(){
        if(document.onmousemove == null)
            document.onmousemove = Mouse.mouseMove;

        if(document.onmouseup == null)
            document.onmouseup = Mouse.mouseUp;
    }
}