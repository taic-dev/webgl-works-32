import { gsap } from "gsap";
import { DURATION } from "../webgl/constants";
import { EASING } from "../utils/constant";

export const mouse = () => {
  const mouse = document.querySelector('.js-mouse-stalker');

  window.addEventListener('mousemove', (e: MouseEvent) => {
    gsap.to(mouse, {
      x: e.clientX,
      y: e.clientY,
      ease: 'ease-out',
      duration: DURATION.SHORT
    })
  })

  mouse?.addEventListener('click', () => {
    gsap.to(mouse, {
      scale: 2,
      opacity: 0,
      webkitFilter: 'blur(5px)',
      cursor: 'none',
      ease: EASING.TRANSFORM,
      duration: DURATION.SHORT
    })
  })
}