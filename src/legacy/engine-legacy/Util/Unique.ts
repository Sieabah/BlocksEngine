export class Unique {
    private static makeid(length: number)
    {
        let text = '';
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-!@#$%^&*()[]{}|\\<>,./?";

        for( let i = 0; i < length; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    
    private mapsize: number = 13;
    private static _map: string[] = [];
    private _description: string;
    private _key: string;

    public equals(unique: Unique): boolean{
        return this._key === unique._key;
    }

    constructor(description?: string){
        this._description = description;

        let key = Unique.makeid(this.mapsize);

        while(Unique._map.indexOf(key) != -1)
            key = Unique.makeid(this.mapsize);

        Unique._map.push(key);
        this._key = key;
    }

    toString(){
        return this._key+'';
    }
}