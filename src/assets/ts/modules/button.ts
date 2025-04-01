import { gsap } from "gsap";
import { DURATION } from "../webgl/constants";
import { EASING } from "../utils/constant";
import { Animation } from "../webgl/Animation";

export const button = (animation: Animation) => {
  const button = document.querySelector('.js-button');
  animation.init();

  button?.addEventListener('click', () => {
    if(window.isLoading || window.isPlaying) return
    window.isPlaying = true
    gsap.to(button, {
      scale: 2,
      opacity: 0,
      webkitFilter: 'blur(5px)',
      cursor: 'default',
      ease: EASING.TRANSFORM,
      duration: DURATION.SHORT
    })
    animation.play()
  })
}