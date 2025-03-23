import { BREAK_POINT } from "./constant";

/**
 * @description spサイズかをチェック
 */
export const checkSp = () => {
  let sp = false;
  sp = window.innerWidth < BREAK_POINT.MD || isTouchDevice();
  sp && document.body.classList.add('is-sp')
  window.isSp = sp;
}

/**
 * @description タッチデバイスかをチェック
 */
export const isTouchDevice = () => {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches
  );
}

/**
 * @description 使用しているブラウザの名前をbodyに追加
 */
export const checkBrowser = () => {
  const body = document.querySelector("body");
  const userAgent = window.navigator.userAgent.toLowerCase();
  if (userAgent.indexOf("msie") != -1 || userAgent.indexOf("trident") != -1) {
    body?.classList.add('browser-internet-explorer')
  } else if (userAgent.indexOf("edge") != -1) {
    body?.classList.add('browser-edge')
  } else if (userAgent.indexOf("line") != -1) {
    body?.classList.add('browser-line')
  } else if (userAgent.indexOf("chrome") != -1) {
    body?.classList.add('browser-chrome')
  } else if (userAgent.indexOf("safari") != -1) {
    body?.classList.add('browser-safari')
  } else if (userAgent.indexOf("firefox") != -1) {
    body?.classList.add('browser-firefox')
  } else if (userAgent.indexOf("opera") != -1) {
    body?.classList.add('browser-opera')
  } else {
    body?.classList.add('browser-other')
  }
};

/**
 * @description モデルの読み込みが完了したかどうか
 */
export const checkLoading = () => {  
  if(!window.isLoadingSpaceship && !window.isLoadingStar && !window.isLoadingMeteorite) {
    setTimeout(() => {
      document.body.classList.add('is-loaded');
      window.isLoading = false
    }, 1000)
  }
}