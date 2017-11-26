
export class Asset {
  protected _source: string = null;

  set source(src: string){
    if(src !== null)
      throw Error('Cannot mutate non null source');

    this._source = src;
  }

  public resource(): string {
      return this._source;
  }
}
