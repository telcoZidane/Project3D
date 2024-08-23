import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class Model3D {
    constructor(scene, url, position = { x: 0, y: 0, z: 0 }, scale = 1) {
        this.scene = scene;
        this.url = url;
        this.position = position;
        this.scale = scale;
        this.loader = new GLTFLoader();
        this.clicked = false;
    }

    loadModel() {
        this.loader.load(
            this.url,
            (gltf) => {
                this.model = gltf.scene;
                this.model.position.set(this.position.x, this.position.y, this.position.z);
                this.model.scale.set(this.scale, this.scale, this.scale);
                this.scene.add(this.model);

                this.model.traverse((child) => {
                    if (child.isMesh) {
                        child.userData = this;
                        child.on('click', (event) => this.onClick(event));
                    }
                });
            },
            undefined,
            (error) => {
                console.error('Error loading model:', error);
            }
        );
    }

    onClick(event) {
        console.log("Clicked model at:", this.position);
        this.clicked = true;
    }
}

export default Model3D;