
class Mouse {
    public static x: number;
    public static y: number;

    public mouseMove(event){
        Mouse.x = event.pageX;
        Mouse.y = event.pageY;
    }

    constructor(){
        if(document.onmousemove == null)
            document.onmousemove = this.mouseMove;
    }
}