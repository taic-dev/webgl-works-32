import * as THREE from "three";
import { Setup } from "./Setup";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { checkLoading } from "../modules/checkLoading";

type Model = THREE.Group<THREE.Object3DEventMap>
type Position = { x: number; y: number; z: number };
type ModelInfo = {
  size: number,
  position: Position
}

export class Meteorite {
  setup: Setup;
  material: THREE.ShaderMaterial | null;
  modelGroup: THREE.Group;
  firstModels: Model[];
  secondsModels: Model[];
  firstModelsInfo: ModelInfo[];
  secondsModelsInfo: ModelInfo[];

  constructor(setup: Setup) {
    this.setup = setup;
    this.material = null;
    this.modelGroup = new THREE.Group();
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

  init() {
    this.firstModelsInfo.forEach((v) => {
      this.setModel(v, this.firstModels);
    });
    this.secondsModelsInfo.forEach((v) => {
      this.setModel(v, this.secondsModels);
    });
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
    });
  }

  setModel(info: ModelInfo, array: Model[]) {
    this.setMaterial();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      `${import.meta.env.BASE_URL}assets/model/meteorite.glb`,
      (gltf) => {
        const modelGroup = new THREE.Group();
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        box.getCenter(center);
        model.position.sub(center);
        modelGroup.add(model);
        
        array.push(modelGroup);

        modelGroup.position.set(info.position.x, info.position.y, info.position.z);
        modelGroup.scale.set(info.size, info.size, info.size);
        this.setup.scene?.add(modelGroup);
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
  }

  raf() {
    if (!this.material) return;
    (this.material as any).uniforms.uTime.value += 0.01;

    this.firstModels.forEach((v) => {
      v.rotation.x += 0.0001;
      v.rotation.y += 0.0003;
    });

    this.secondsModels.forEach((v) => {
      v.rotation.x += 0.0001;
      v.rotation.y += 0.0003;
    });
  }
}
