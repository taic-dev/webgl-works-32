import * as THREE from "three";
import { Setup } from "./Setup";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { checkLoading, getFileSize } from "../modules/checkLoading";

export class Spaceship {
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
    });
  }

  async setModel() {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    const totalSize = await getFileSize(`${import.meta.env.BASE_URL}assets/model/model.glb`)
    console.log(totalSize)

    loader.load(
      `${import.meta.env.BASE_URL}assets/model/model.glb`,
      async (gltf) => {
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        box.getCenter(center);
        model.position.sub(center);
        this.modelGroup.add(model);
        this.modelGroup.lookAt(new THREE.Vector3(Math.PI, 0, 0));
        this.modelGroup.scale.set(0.8, 0.8, 0.8);
        this.modelGroup.rotation.y = Math.PI / 2;
        this.modelGroup.rotation.x = -1.5;
        this.modelGroup.position.y = -0.2;
        this.modelGroup.position.z = Math.PI / 6;
        this.setup.scene?.add(this.modelGroup);
      },
      (xhr) => {
        // console.log(xhr.total)
        // console.log(xhr.loaded)

        const total = Math.max(xhr.total, xhr.loaded);
        // const progress = (xhr.loaded / total) * 100;

        if (total === xhr.loaded) {
          window.isLoadingSpaceship = false;
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
  }
}
