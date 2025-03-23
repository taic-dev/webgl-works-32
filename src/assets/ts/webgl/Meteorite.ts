import * as THREE from "three";
import { Setup } from "./Setup";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { checkLoading } from "../utils/check";

type Model = THREE.Group<THREE.Object3DEventMap>;
type Position = { x: number; y: number; z: number };
type ModelInfo = {
  size: number;
  position: Position;
};

export class Meteorite {
  setup: Setup;
  modelGroup: THREE.Group;
  loader: GLTFLoader;
  firstModels: Model[];
  secondsModels: Model[];
  firstModelsInfo: ModelInfo[];
  secondsModelsInfo: ModelInfo[];

  constructor(setup: Setup) {
    this.setup = setup;
    this.modelGroup = new THREE.Group();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    this.loader = new GLTFLoader();
    this.loader.setDRACOLoader(dracoLoader);

    this.firstModels = [];
    this.secondsModels = [];
    this.firstModelsInfo = [
      { size: 2, position: { x: 0.9, y: 0.8, z: 1 } },
      { size: 2, position: { x: -0.9, y: -0.9, z: 1 } },
      { size: 2, position: { x: -0.9, y: 1, z: 1 } },
      { size: 2, position: { x: 0.9, y: -1, z: 1 } },
    ];
    this.secondsModelsInfo = [
      { size: 0, position: { x: 0, y: 0, z: 0.5 } },
      { size: 0, position: { x: 0, y: 0, z: 0.5 } },
    ];
  }

  async init() {
    const baseModel = await this.loadMeteoriteModel();
    this.firstModelsInfo.forEach((v) => {
      const clonedModel = baseModel.clone();
      const modelGroup = this.addModelToScene(v, clonedModel)
      this.firstModels.push(modelGroup);
    });
    this.secondsModelsInfo.forEach((v) => {
      const clonedModel = baseModel.clone();
      const modelGroup = this.addModelToScene(v, clonedModel)
      this.secondsModels.push(modelGroup);
    });
  }

  loadMeteoriteModel() {
    return new Promise<Model>((resolve) => {
      this.loader.load(
        `${import.meta.env.BASE_URL}assets/model/meteorite.glb`,
        (gltf) => {
          const model = gltf.scene;
          resolve(model);
        },
        (xhr) => {
          const total = Math.max(xhr.total, xhr.loaded);
          if (total === xhr.loaded) {
            window.isLoadingMeteorite = false;
            checkLoading();
          }
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  addModelToScene(info: ModelInfo, model: Model) {
    const modelGroup = new THREE.Group();
    modelGroup.add(model);
    modelGroup.position.set(info.position.x, info.position.y, info.position.z);
    modelGroup.scale.set(info.size, info.size, info.size);
    this.setup.scene?.add(modelGroup);
    return modelGroup
  }

  raf() {
    this.firstModels.forEach((v) => {
      v.rotation.x += 0.0001;
      v.rotation.y += 0.0003;
    });

    this.secondsModels.forEach((v) => {
      v.rotation.x += 0.0005;
      v.rotation.y += 0.001;
    });
  }
}
