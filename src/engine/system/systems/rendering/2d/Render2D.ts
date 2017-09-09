import { RenderSystem } from '../RenderSystem';
import { AddElementToDom, FullscreenElement, OnScreenResize  } from 'engine/lib';
import { RenderComponent } from "engine/component/components/rendering";

import {
  Container,
  SystemRenderer,
  autoDetectRenderer,
  utils
} from 'pixi.js';

export class Render2D extends RenderSystem<SystemRenderer> {
  protected _stage: Container = null;
  protected _renderer: SystemRenderer = null;
  protected _meshes: any = [];

  get stage(): Container { return this._stage; }

  constructor(...args){
    super();

    this.register(...args);
  }

  protected register(width: number = 1280, height: number = 720, options: any = { backgroundColor: 0xFF0000 }): void {
    utils.skipHello();

    this._stage = new Container();

    this._renderer = autoDetectRenderer(width, height, options);
    this._renderer.autoResize = true;
  }

  protected element: HTMLElement = null;

  private _hooks: Array<Function> = [];

  public init(): void {
    this.element = AddElementToDom(this.renderer.view);
    FullscreenElement(this.element);

    const observable = OnScreenResize().subscribe(({width, height}) => this.renderer.resize(width, height));

    this._hooks.push(() => observable.unsubscribe());
  }

  public update(dtime: number): void {
    for(const component of this._components)
      this.stage.addChild(component.mesh());

    this.renderer.render(this.stage);
    this.stage.removeChildren();
  }

  protected _components: Array<RenderComponent> = [];

  public destroy(): void {
    for(const hook of this._hooks)
      hook();

    this.stage.destroy();
    this.renderer.destroy();
  }

  public SendMessage( event: any ): void {

  }
}
