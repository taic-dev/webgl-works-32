import * as THREE from "three";
import { Setup } from "./Setup";
import fragmentShader from "../../shader/space/fragmentShader.glsl";
import vertexShader from "../../shader/space/vertexShader.glsl";
import {
  getElementPositionAndSize,
  type ElementPositionAndSize,
} from "../utils/getElementSize";

export class Space {
  setup: Setup;
  mesh: THREE.Mesh | null;
  material: THREE.ShaderMaterial | null;
  element: HTMLElement | null;

  constructor(setup: Setup) {
    this.setup = setup;
    this.mesh = null;
    this.material = null;
    this.element = document.querySelector(".webgl");
  }

  init() {
    if (!this.element) return;
    const info = getElementPositionAndSize(this.element);
    this.setMesh(info);
  }

  setUniforms() {
    const commonUniforms = {
      uResolution: {
        value: new THREE.Vector2(
          window.innerWidth,
          window.innerHeight
        ),
      },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uTime: { value: 0.0 },
    };

    return {
      uSpeed: { value: 0.1 },
      uAngle: { value: 10 },
      uInterval: { value: 0 },
      ...commonUniforms,
    };
  }

  setMesh(info: ElementPositionAndSize) {
    if (!info) return;
    const uniforms = this.setUniforms();
    const geometry = new THREE.PlaneGeometry(1, 1, 100, 100);
    this.material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      fragmentShader,
      vertexShader,
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(geometry, this.material);
    this.setup.scene?.add(this.mesh);

    this.mesh.scale.x = info.dom.width;
    this.mesh.scale.y = info.dom.height;
    this.mesh.position.x = info.dom.x;
    this.mesh.position.y = info.dom.y;
  }

  resize() {
    (this.mesh?.material as any).uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
  }

  raf() {
    if (window.isPlaying)
      (this.material as any).uniforms.uTime.value += 1 * 0.01;
    (this.mesh?.material as any).uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
  }
}
