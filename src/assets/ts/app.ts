import { gsap } from "gsap"
import { App } from "./webgl/App";

const webgl = new App();
webgl.init();
gsap.ticker.add(() => {
  webgl.render()
});

window.addEventListener('resize', () => {
  webgl.resize()
})