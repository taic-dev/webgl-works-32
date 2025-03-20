import { gsap } from "gsap";
import { EASING } from "../utils/constant";
import { Setup } from "./Setup";
import { Model } from "./Model";
import { Space } from "./Space";
import { DURATION } from "./constants";

export class Animation {
  setup: Setup;
  model: Model;
  space: Space;

  constructor(setup: Setup, model: Model, space: Space) {
    this.setup = setup;
    this.model = model;
    this.space = space;
  }

  init() {
    if (window.isPlaying) return;
    gsap.fromTo(
      this.model.modelGroup.position,
      {
        y: -0.2,
      },
      {
        y: -0.15,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      }
    );
  }

  play() {
    gsap.killTweensOf(this.model.modelGroup.position);
    const tl = gsap.timeline();

    tl.to(this.model.modelGroup.position, {
      y: -0.1,
      ease: EASING.TRANSFORM,
      duration: DURATION.BASE,
    }).to((this.space.material as any).uniforms.uInterval, {
      value: 0.8,
      ease: 'linear',
      duration: 1,
    }, '<=').to((this.space.material as any).uniforms.uAngle, {
      value: 0.1,
      ease: 'linear',
      duration: 2.,
    }).to((this.space.material as any).uniforms.uSpeed, {
      value: 100,
      ease: 'linear',
      duration: 2,
    }, '<=').to((this.space.material as any).uniforms.uInterval, {
      value: 5,
      ease: 'linear',
      duration: 1,
    }, '+=1').to(this.model.modelGroup.scale, {
      x: 0,
      y: 0,
      z: 0,
      ease: 'linear',
      duration: 0.1,
      delay: 0.5,
    }).to(this.model.modelGroup.position, {
      y: 0,
      ease: 'linear',
      duration: 0.1,
    }, '<=').to((this.space.material as any).uniforms.uInterval, {
      value: 0,
      ease: 'linear',
      duration: 0.1,
      delay: 0.1
    }, '<=').to((this.space.material as any).uniforms.uAngle, {
      value: 10,
      ease: 'linear',
      duration: 0.1,
      delay: 0.1
    }, '<=').to((this.space.material as any).uniforms.uSpeed, {
      value: 0,
      ease: 'linear',
      duration: 0.1,
      delay: 0.1,
      onComplete: () => {
        window.isPlaying = false
      }
    }, '<=')
  }
}
