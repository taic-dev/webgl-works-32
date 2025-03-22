import { gsap } from "gsap";
import { EASING } from "../utils/constant";
import { Setup } from "./Setup";
import { Spaceship } from "./Spaceship";
import { Space } from "./Space";
import { DURATION } from "./constants";
import { Star } from "./Star";
import { Meteorite } from "./Meteorite";

export class Animation {
  setup: Setup;
  spaceship: Spaceship;
  star: Star
  meteorite: Meteorite
  space: Space;

  constructor(setup: Setup, spaceship: Spaceship, star: Star, meteorite: Meteorite, space: Space) {
    this.setup = setup;
    this.spaceship = spaceship;
    this.star = star
    this.meteorite = meteorite;
    this.space = space;
  }

  init() {
    if (window.isPlaying) return;
    gsap.fromTo(
      this.spaceship.modelGroup.position,
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
    const text = document.querySelector('.js-text-wrapper');
    // spaceship
    const spaceship = this.spaceship.modelGroup;
    const spaceMaterial = (this.space.material as any).uniforms;
    const spaceshipPosition = spaceship.position;
    const spaceshipScale = spaceship.scale;
    const spaceshipRotate = spaceship.rotation;
    
    // star
    const star = this.star.modelGroup;
    const starScale = star.scale;

    // meteorite
    const firstMeteorites = this.meteorite.firstModels;
    const secondsModels = this.meteorite.secondsModels;

    // space
    const interval = spaceMaterial.uInterval;
    const angle = spaceMaterial.uAngle;
    const speed = spaceMaterial.uSpeed;
    gsap.killTweensOf(spaceshipPosition);

    tl.to(spaceshipPosition, {
      y: -0.1,
      ease: EASING.TRANSFORM,
      duration: DURATION.BASE,
    }).add(() => {
      firstMeteorites.forEach((v) => {
        gsap.to(v.position, {
          z: 5,
          ease: EASING.TRANSFORM,
          duration: 2,
        })
      })
    })
    .to(interval, {
      value: 0.8,
      ease: 'linear',
      duration: 1,
    }, '<=').to(angle, {
      value: 0.1,
      ease: 'linear',
      duration: 2.,
    }, '-=1')
        
    .to(spaceshipRotate, {
      y: Math.PI / -10,
      ease: EASING.TRANSFORM,
      duration: 3.1,
    })
    
    .add(() => {
      secondsModels.forEach((v) => {
        gsap.to(v.scale, {
          x: 1.8,
          y: 1.8,
          z: 1.8,
          ease: EASING.TRANSFORM,
          duration: 3,
          delay: 1
        })
      })

      gsap.to(secondsModels[0].position, {
        x: 1.08,
        ease: EASING.TRANSFORM,
        duration: 3,
        delay: 1
      })

      gsap.to(secondsModels[1].position, {
        x: -1.08,
        ease: EASING.TRANSFORM,
        duration: 3,
        delay: 1
      })
    }, '-=3.5')

    .add(() => {
      secondsModels.forEach((v) => {
        gsap.to(v.position, {
          z: 5,
          ease: EASING.TRANSFORM,
          duration: 2,
        })
      })
    })

    .to(speed, {
      value: 100,
      ease: 'linear',
      duration: 1,
    }, '+=1' // slow time
  ).to(interval, {
      value: 5,
      ease: 'linear',
      duration: 1,
    }, '+=1').to(spaceshipRotate, {
      y: Math.PI / 2,
      ease: EASING.TRANSFORM,
      duration: 0.5,
    }, '-=3').to(spaceshipPosition, {
      x: -0.05,
      ease: 'linear',
      duration: 0.5,
    }, '<=')
    .to(spaceshipPosition, {
      x: 0,
      ease: 'linear',
      duration: 0.5,
    }, '<=0.1')
    .to(spaceshipScale, {
      x: 0,
      y: 0,
      z: 0,
      ease: 'linear',
      duration: 0.1,
      delay: 0.5,
    }).to(spaceshipPosition, {
      x: 0,
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
    }, '<=')
    // star
    .to(starScale, {
      x: 2,
      y: 2,
      z: 2,
      ease: 'linear',
      duration: 0.1,
    }, '<=')
    .to(text, {
      opacity: 1,
      webkitFilter: 'blur(0px)',
    }, '+=0.5')
  }
}
