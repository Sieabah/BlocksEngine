export class Singleton {
  private static instances: {[key: string]: Object} = {};

  constructor(){
    if(this.constructor.name in Singleton.instances)
      throw new Error(`'${this.constructor.name}' instantiated more than once [Singleton]`);

    Singleton.instances[this.constructor.name] = this;
  }

  protected static getInstance(type: Function): any {
    for(const instance of Object.keys(Singleton.instances))
      if(Singleton.instances[instance].constructor === type)
        return Singleton.instances[instance];
  }
}
