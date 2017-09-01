import { Component } from './Component';

export class GameObject {
  protected _componentMap: {
    [key: string]: Component
  };

  public getComponent( id: string ): Component | null {
    if(this.hasComponent(id))
      return this._componentMap[id];

    return null;
  }

  public addComponent(component: Component): void {
    const componentName = component.name;

    if(this.hasComponent(componentName))
      throw new Error('Preexisting component');

    this._componentMap[componentName] = component;
  }

  public hasComponent( id: string ): boolean {
    return id in this._componentMap;
  }
}
