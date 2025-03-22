import { Spaceship } from "./Spaceship";
import { Setup } from "./Setup";
import { Space } from "./Space";
import { Animation } from "./Animation";
import { mouse } from "../modules/mouse";
import { Star } from "./Star";

export class App {
  setup: Setup
  spaceship: Spaceship
  star: Star
  space: Space
  animation: Animation

  constructor() {
    this.setup = new Setup();
    this.space = new Space(this.setup);
    this.spaceship = new Spaceship(this.setup);
    this.star = new Star(this.setup);
    this.animation = new Animation(this.setup, this.spaceship, this.star, this.space);
    mouse(this.animation);
  }

  init() {
    this.spaceship.init();
    this.star.init();
    this.space.init();
  }

  render() {
    if(!this.setup.scene || !this.setup.camera) return
    this.setup.renderer?.render(this.setup.scene, this.setup.camera)
    this.spaceship.raf();
    this.star.raf();
    this.space.raf();
  }

  resize() {
    this.setup.resize();
    this.space.resize();
  }
}