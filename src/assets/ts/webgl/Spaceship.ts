import * as THREE from "three";
import { Setup } from "./Setup";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { checkLoading } from "../utils/check";

export class Spaceship {
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
        const total = Math.max(xhr.total, xhr.loaded);
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
}
