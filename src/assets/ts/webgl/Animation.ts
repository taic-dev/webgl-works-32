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
    const tl = gsap.timeline();
    const modelGroup = this.model.modelGroup
    const spaceMaterial = (this.space.material as any).uniforms;
    const modelPosition = modelGroup.position;
    const modelScale = modelGroup.scale;
    const modelRotate = modelGroup.rotation;
    const interval = spaceMaterial.uInterval;
    const angle = spaceMaterial.uAngle;
    const speed = spaceMaterial.uSpeed;
    gsap.killTweensOf(modelPosition);

    tl.to(modelPosition, {
      y: -0.1,
      ease: EASING.TRANSFORM,
      duration: DURATION.BASE,
    }).to(interval, {
      value: 0.8,
      ease: 'linear',
      duration: 1,
    }, '<=').to(angle, {
      value: 0.1,
      ease: 'linear',
      duration: 2.,
    }).to(modelRotate, {
      y: Math.PI / 4,
      ease: EASING.TRANSFORM,
      duration: 4,
      delay: 1,
    }, '<=').to(speed, {
      value: 100,
      ease: 'linear',
      duration: 2,
    }, '<=').to(interval, {
      value: 5,
      ease: 'linear',
      duration: 1,
    }, '+=1').to(modelScale, {
      x: 0,
      y: 0,
      z: 0,
      ease: 'linear',
      duration: 0.1,
      delay: 0.5,
    }).to(modelPosition, {
      y: 0,
      ease: 'linear',
      duration: 0.1,
    }, '<=').to(interval, {
      value: 0,
      ease: 'linear',
      duration: 0.1,
      delay: 0.1
    }, '<=').to(angle, {
      value: 10,
      ease: 'linear',
      duration: 0.1,
      delay: 0.1
    }, '<=').to(speed, {
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
