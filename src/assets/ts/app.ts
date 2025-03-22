import { gsap } from "gsap"
import { App } from "./webgl/App";
import { checkBrowser, checkSp } from "./utils/check";
import { viewportReload } from "./utils/viewport";

// utils
checkSp();
checkBrowser();

// setting
window.isLoadingSpaceship = true
window.isLoadingStar = true
window.isLoadingMeteorite = !window.isSp
window.isLoading = true
window.isPlaying = false;

// webgl
const webgl = new App();
webgl.init();
gsap.ticker.add(() => {
  webgl.render()
});

window.addEventListener('resize', () => {
  webgl.resize()
  viewportReload();
})