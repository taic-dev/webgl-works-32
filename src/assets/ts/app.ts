import { gsap } from "gsap"
import { App } from "./webgl/App";
import { Space } from "./webgl/Space";

const webgl = new App();
const space = new Space(webgl.setup);
webgl.init();
space.init();
gsap.ticker.add(() => webgl.render());

window.addEventListener('scroll', () => {
  webgl.update()
})

window.addEventListener('resize', () => {
  webgl.resize()
})