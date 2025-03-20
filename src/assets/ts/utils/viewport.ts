import { PARAMS } from "../webgl/constants";
import { BREAK_POINT } from "./constant";

/**
 * @description ブレイクポイントを跨いだ時に再読み込みする
 */
export const viewportReload = () => {
  const width = window.innerWidth;
  const beforeWidth = PARAMS.WINDOW.W;

  if (beforeWidth < BREAK_POINT.MD + 1 && width > BREAK_POINT.MD + 1)
    window.location.reload();

  if (beforeWidth > BREAK_POINT.MD + 1 && width < BREAK_POINT.MD + 1)
    window.location.reload();
};