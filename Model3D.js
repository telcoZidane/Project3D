import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class Model3D {
    constructor(scene, url, position = { x: 0, y: 0, z: 0 }, scale = 1) {
        this.scene = scene;
        this.url = url;
        this.position = position;
        this.scale = scale;
        this.loader = new GLTFLoader();
    }

    loadModel() {
        this.loader.load(
            this.url,
            (gltf) => {
                this.model = gltf.scene;
                this.model.position.set(this.position.x, this.position.y, this.position.z);
                this.model.scale.set(this.scale, this.scale, this.scale);
                this.scene.add(this.model);
                console.log("zidane" +""+  this.position.x + ""+ this.position.y+""+ this.position.z );

                console.log('Model loaded:', this.url);
                console.log(this.model);
            },
            undefined,
            (error) => {
                console.error('Error loading model:', error);
            }
        );
    }
}

export default Model3D;

/////////////////////////////////////////////////////////////////
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// class Model3D {
//     constructor(scene, url, position = { x: 0, y: 0, z: 0 }, scale = 1, name = '') {
//         this.scene = scene;
//         this.url = url;
//         this.position = position;
//         this.scale = scale;
//         this.name = name;
//         this.loader = new GLTFLoader();
//     }

//     loadModel() {
//         this.loader.load(
//             this.url,
//             (gltf) => {
//                 this.model = gltf.scene;
//                 this.model.position.set(this.position.x, this.position.y, this.position.z);
//                 this.model.scale.set(this.scale, this.scale, this.scale);
//                 this.model.name = this.name; 
//                 this.scene.add(this.model);
//                 console.log('Model loaded:', this.url);
//             },
//             undefined,
//             (error) => {
//                 console.error('Error loading model:', error);
//             }
//         );
//     }
// }

// export default Model3D;
