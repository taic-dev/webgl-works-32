import { Model } from "./Model";
import { Setup } from "./Setup";

export class App {
  setup: Setup
  model: Model

  constructor() {
    this.setup = new Setup();
    this.model = new Model(this.setup);
  }

  init() {
    this.model.init();
  }

  render() {
    if(!this.setup.scene || !this.setup.camera) return
    this.setup.renderer?.render(this.setup.scene, this.setup.camera)
    this.model.raf();
  }

  update() {

  }

  resize() {
    this.setup.resize();
  }
}