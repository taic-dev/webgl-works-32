import { Spaceship } from "./Spaceship";
import { Setup } from "./Setup";
import { Space } from "./Space";
import { Animation } from "./Animation";
import { button } from "../modules/button";
import { Star } from "./Star";
import { Meteorite } from "./Meteorite";

export class App {
  setup: Setup
  spaceship: Spaceship
  star: Star
  space: Space
  meteorite: Meteorite
  animation: Animation

  constructor() {
    this.setup = new Setup();
    this.space = new Space(this.setup);
    this.spaceship = new Spaceship(this.setup);
    this.star = new Star(this.setup);
    this.meteorite =  new Meteorite(this.setup)
    this.animation = new Animation(this.setup, this.spaceship, this.star, this.meteorite, this.space);
    button(this.animation);
  }

  init() {
    this.spaceship.init();
    this.star.init();
    this.space.init();
    this.meteorite.init();
  }

  render() {
    if(!this.setup.scene || !this.setup.camera) return
    this.setup.renderer?.render(this.setup.scene, this.setup.camera);
    this.star.raf();
    this.space.raf();
    this.meteorite.raf();
  }

  resize() {
    this.setup.resize();
    this.space.resize();
  }
}