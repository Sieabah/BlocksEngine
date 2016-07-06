class Unique {
    private makeid(length: number)
    {
        let text = '';
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-!@#$%^&*()[]{}|\\<>,./?";

        for( var i=0; i < length; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    
    private mapsize: number = 13;
    private static _map = {};
    private _description: string;
    private _key: string;

    public equals(unique: Unique): boolean{
        return this._key === unique._key;
    }

    constructor(description?: string){
        this._description = description;

        let key = this.makeid(this.mapsize);
        while(!(key in Unique._map)) key = this.makeid(this.mapsize);

        Unique._map[key] = key;
        this._key = key;
    }

    toString(){
        return this._key+'';
    }
}