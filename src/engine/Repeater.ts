
export class Repeater {
    public static repeaters = {};
    constructor(){}
    public static start(name: string, func: Function, autostart?: boolean): string{
        name = name+Date.now()+''+String(Math.random()).replace('.','');

        Repeater.repeaters[name] = {
            func: func,
            canLoop: true,
            lastRun: null,
            endFunc: function(){}
        };

        if(autostart)
            Repeater.resume(name);

        return name;
    }

    public static getRepeater(name: string): any{
        return Repeater.repeaters[name];
    }

    public static resume(name: string): void{
        Repeater.getRepeater(name).canLoop = true;
        Repeater.getRepeater(name).lastRun = Date.now();

        Repeater.repeat(name);
    }

    public static pause(name: string): void{
        Repeater.getRepeater(name).canLoop = false;
    }

    public static stop(name: string): void{
        Repeater.getRepeater(name).endFunc = function(){
            Repeater.destroy(name);
        };

        Repeater.pause(name);
    }

    public static killall(): void{
        for(var name in Repeater.repeaters){
            if(!Repeater.repeaters.hasOwnProperty(name)) continue;

            console.info('Killing', name);
            Repeater.stop(name);
        }
    }

    public static destroy(name: string): void{
        delete Repeater.repeaters[name];
    }

    public static repeat(name: string): void{
        if(Repeater.getRepeater(name) == undefined) return;

        if(Repeater.getRepeater(name).canLoop) {
            window.requestAnimationFrame(() => {
                let repeater = Repeater.getRepeater(name);

                let now = Date.now();
                let dtime = now - repeater.lastRun;

                repeater.lastRun = now;
                repeater.func(dtime);

                this.repeat(name);
            });
        } else
            Repeater.getRepeater(name).endFunc();
    }
}