import * as THREE from "three";
import { Setup } from "./Setup";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { checkLoading } from "../modules/checkLoading";

export class Star {
  setup: Setup;
  material: THREE.ShaderMaterial | null;
  modelGroup: THREE.Group;

  constructor(setup: Setup) {
    this.setup = setup;
    this.material = null;
    this.modelGroup = new THREE.Group();
  }

  init() {
    this.setModel();
  }

  setUniforms() {
    const commonUniforms = {
      uResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uTime: { value: 0.0 },
    };

    return {
      ...commonUniforms,
    };
  }

  setMaterial() {
    const uniforms = this.setUniforms();
    this.material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      side: THREE.DoubleSide,
    });
  }

  setModel() {
    this.setMaterial();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      `${import.meta.env.BASE_URL}assets/model/star.glb`,
      (gltf) => {
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        box.getCenter(center);
        model.position.sub(center);
        this.modelGroup.add(model);
        this.modelGroup.position.set(0.5, -0.3, 0);
        this.modelGroup.scale.set(0, 0, 0);
        this.setup.scene?.add(this.modelGroup);
      },
      (xhr) => {
        const load = (xhr.loaded / xhr.total) * 100;
        if (load === 100) {
          window.isLoadingStar = false;
          checkLoading();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  raf() {
    if (!this.material) return;
    (this.material as any).uniforms.uTime.value += 0.01;
    this.modelGroup.rotation.y += 0.0005;
  }
}
