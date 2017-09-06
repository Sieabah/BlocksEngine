import { Component, TranslateComponent } from 'Engine/Component';

export class GameObject {
  /**
   * Core component map
   * @private
   */
  protected _componentMap: {
    [key: string]: Component
  } = {};

  /**
   * Get component from GameObject
   * @param {Component | Function} component Component to retrieve
   */
  public getComponent( component: Component | Function ): Component | null {
    const name = typeof component === 'object' ? component.constructor.name : component.name;

    if(this.hasComponent(component))
      return this._componentMap[name];

    return null;
  }

  /**
   * Add component to GameObject
   * @param {Component} component Component to add
   */
  public addComponent(component: Component): void {
    if(this.hasComponent(component))
      throw new Error('Preexisting component');

    this._componentMap[component.constructor.name] = component;
  }

  /**
   * Check if GameObject has given Component
   * @param {Component | Function} component Component to check
   * @return {boolean}
   */
  public hasComponent( component: Component | Function ): boolean {
    const name: string = typeof component === 'object' ? component.constructor.name : component.name;
    return !!this._componentMap[name];
  }

  constructor() {
    //Core Component
    this.addComponent(new TranslateComponent());
  }
}
