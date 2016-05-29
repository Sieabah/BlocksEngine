
class Repeater {
    public static repeaters = {};
    constructor(){}
    public static start(name: string, func: Function, loopRate: Function, autostart?: boolean): string{
        name = name+Date.now()+''+String(Math.random()).replace('.','');

        Repeater.repeaters[name] = {
            func: func,
            rate: loopRate(),
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
            setTimeout(function () {
                var now = Date.now();
                var dtime = now - Repeater.getRepeater(name).lastRun;
                Repeater.getRepeater(name).lastRun = now;

                Repeater.getRepeater(name).func(dtime);
                Repeater.repeat(name);
            }, Repeater.getRepeater(name).rate);
        } else
            Repeater.getRepeater(name).endFunc();
    }
}