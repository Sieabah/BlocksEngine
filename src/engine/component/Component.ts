
export abstract class Component {
  protected abstract _name: string;

  get name(): string { return this._name };
}
