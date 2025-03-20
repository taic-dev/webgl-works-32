import { gsap } from "gsap"
import { App } from "./webgl/App";
import { mouse } from "./modules/mouse";

mouse();

const webgl = new App();
webgl.init();
gsap.ticker.add(() => {
  webgl.render()
});

window.addEventListener('resize', () => {
  webgl.resize()
})