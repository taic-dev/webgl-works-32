import * as THREE from "three";
import { Setup } from "./Setup";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

export class Model {
  setup: Setup;
  light: THREE.PointLight | null;
  material: THREE.ShaderMaterial | null;
  modelGroup: THREE.Group;

  constructor(setup: Setup) {
    this.setup = setup;
    this.light = null;
    this.material = null;
    this.modelGroup = new THREE.Group();
  }

  init() {
    this.setMaterial();
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
      wireframe: this.setup.guiValue.wireframe,
    });
  }

  setModel() {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      `${import.meta.env.BASE_URL}assets/model/model.glb`,
      (gltf) => {
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        box.getCenter(center);
        model.position.sub(center);
        this.modelGroup.add(model);
        this.modelGroup.scale.set(0.8, 0.8, 0.8);
        this.modelGroup.rotateX(Math.PI / 30);
        this.modelGroup.rotateY(Math.PI / 2);
        this.modelGroup.position.setY(-0.2);
        this.modelGroup.position.setZ(Math.PI / 6);
        this.setup.scene?.add(this.modelGroup);
      },
      undefined,
      (error) => {
        console.log(error);
      }
    );
  }

  raf() {
    if (!this.material) return;
    this.material.wireframe = this.setup.guiValue.wireframe;
  }
}
