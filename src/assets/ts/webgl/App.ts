import { Model } from "./Model";
import { Setup } from "./Setup";
import { Space } from "./Space";
import { Animation } from "./Animation";
import { mouse } from "../modules/mouse";

export class App {
  setup: Setup
  model: Model
  space: Space
  animation: Animation

  constructor() {
    this.setup = new Setup();
    this.space = new Space(this.setup);
    this.model = new Model(this.setup);
    this.animation = new Animation(this.setup, this.model, this.space);
    mouse(this.animation);
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