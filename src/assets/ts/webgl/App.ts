import { Model } from "./Model";
import { MvMesh } from "./MvMesh";
import { Setup } from "./Setup";

export class App {
  setup: Setup
  model: Model
  mvMesh: MvMesh

  constructor() {
    this.setup = new Setup();
    this.model = new Model(this.setup);
    this.mvMesh = new MvMesh(this.setup);
  }

  init() {
    this.model.init();
    this.mvMesh.init();
  }

  render() {
    if(!this.setup.scene || !this.setup.camera) return
    this.setup.renderer?.render(this.setup.scene, this.setup.camera)
    this.model.raf();
  }

  update() {
    this.mvMesh.updateMesh();
  }

  resize() {
    this.setup.resize();
    this.mvMesh.resize();
  }
}