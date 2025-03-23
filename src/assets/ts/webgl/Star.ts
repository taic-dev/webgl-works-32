import * as THREE from "three";
import { Setup } from "./Setup";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { checkLoading } from "../utils/check";

export class Star {
  setup: Setup;
  modelGroup: THREE.Group;

  constructor(setup: Setup) {
    this.setup = setup;
    this.modelGroup = new THREE.Group();
  }

  init() {
    this.setModel();
  }

  async setModel() {
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
        const total = Math.max(xhr.total, xhr.loaded);
        if (total === xhr.loaded) {
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
    this.modelGroup.rotation.y += 0.0005;
  }
}
