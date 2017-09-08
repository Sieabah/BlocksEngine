
export class EngineEvent {
  constructor({
    system = null,
    action = null,
    data = null,
  } = {}){
    this._system = system;
    this._action = action;
    this._data = data;
  }

  protected _system: string | Function = null;
  protected _action: any = null;
  protected _data: Object = null;

  get system() { return this._system }
  get action() { return this._action }
  get data() { return this._data }
}
