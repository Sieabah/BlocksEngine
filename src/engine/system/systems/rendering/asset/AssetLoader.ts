import { Observable } from 'rxjs';

class AssetLoader {
  protected static _assets = [];
  protected static _sources = {};
  constructor() {

  }

  public static load(source: string) {
    if(source in this._sources)
      return this._assets[this._sources[source]];

    return Observable;
  }
}
