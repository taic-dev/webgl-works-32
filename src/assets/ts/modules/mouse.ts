import { gsap } from "gsap";
import { DURATION } from "../webgl/constants";
import { EASING } from "../utils/constant";
import { Animation } from "../webgl/Animation";

export const mouse = (animation: Animation) => {
  const mouse = document.querySelector('.js-mouse-stalker');
  window.isPlaying = false;
  animation.init();

  document.body.addEventListener('mouseenter', () => {
    if (window.isPlaying || window.isSp) return;
    gsap.to(mouse, {
      scale: 1,
      opacity: 1,
      webkitFilter: 'blur(0px)',
      cursor: 'pointer',
      ease: EASING.TRANSFORM,
      duration: DURATION.SHORT
    })
  })

  document.body.addEventListener('mouseleave', () => {
    if (window.isPlaying || window.isSp) return;
    gsap.to(mouse, {
      scale: 2,
      opacity: 0,
      webkitFilter: 'blur(5px)',
      cursor: 'default',
      ease: EASING.TRANSFORM,
      duration: DURATION.SHORT
    })
  })

  window.addEventListener('mousemove', (e: MouseEvent) => {
    if (window.isPlaying || window.isSp) return;
    gsap.to(mouse, {
      x: e.clientX,
      y: e.clientY,
      ease: 'ease-out',
      duration: DURATION.SHORT
    })
  })

  mouse?.addEventListener('click', () => {
    if(window.isPlaying) return
    window.isPlaying = true
    gsap.to(mouse, {
      scale: 2,
      opacity: 0,
      webkitFilter: 'blur(5px)',
      cursor: 'default',
      ease: EASING.TRANSFORM,
      duration: DURATION.SHORT
    })
    animation.play();
  })
}