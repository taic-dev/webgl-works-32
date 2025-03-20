import { Model } from "./Model";
import { Setup } from "./Setup";
import { Space } from "./Space";

export class App {
  setup: Setup
  model: Model
  space: Space

  constructor() {
    this.setup = new Setup();
    this.model = new Model(this.setup);
    this.space = new Space(this.setup);
  }

  init() {
    this.model.init();
    this.space.init();
  }

  render() {
    if(!this.setup.scene || !this.setup.camera) return
    this.setup.renderer?.render(this.setup.scene, this.setup.camera)
    this.model.raf();
    this.space.raf();
  }

  resize() {
    this.setup.resize();
    this.space.resize();
  }
}