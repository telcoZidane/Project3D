// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { TypeModel } from './EnumTypeModel.js';
// class Model3D {
//     constructor(scene, url, position = { x: 0, y: 0, z: 0 }, scale = 1,TypeModel=1  ) {
//         this.scene = scene;
//         this.url = url;
//         this.position = position;
//         this.scale = scale;
//         this.loader = new GLTFLoader();
//         this.clicked = false;
//         this.TypeModel=TypeModel;
//     }

//     loadModel() {
//         this.loader.load(
//             this.url,
//             (gltf) => {
//                 this.model = gltf.scene;
//                 this.model.position.set(this.position.x, this.position.y, this.position.z);
//                 this.model.scale.set(this.scale, this.scale, this.scale);
//                 this.scene.add(this.model);

//                 this.model.traverse((child) => {
//                     if (child.isMesh) {
//                         child.userData = this;
//                     }
//                 });
//             },
//             undefined,
//             (error) => {
//                 console.error('Error loading model:', error);
//             }
//         );
//     }

//     onClick() {
//         console.log("Clicked model at:", this.position);
//         this.clicked = true;
//         return this.position;
//     }
// }

// export default Model3D;
// import * as THREE from 'three';
//  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
//  import { TypeModel } from './EnumTypeModel.js';

// class Model3D {
//     constructor(scene, url, position = { x: 0, y: 0, z: 0 }, scale = 1, TypeModel = 1, numFloors = 1, childrenModels = []) {
//         this.scene = scene;
//         this.url = url;
//         this.position = position;
//         this.scale = scale;
//         this.loader = new GLTFLoader();
//         this.clicked = false;
//         this.TypeModel = TypeModel;
//         this.numFloors = numFloors;
//         this.childrenModels = childrenModels; // Tableau de modèles enfants à ajouter à chaque étage
//     }

//     loadModel() {
//         this.loader.load(
//             this.url,
//             (gltf) => {
//                 this.model = gltf.scene;
//                 this.model.position.set(this.position.x, this.position.y, this.position.z);
//                 this.model.scale.set(this.scale, this.scale, this.scale);

//                 if (this.TypeModel === TypeModel.SUPPER_MODEL && this.numFloors > 1) {
//                     this.addFloors();
//                 } else {
//                     this.scene.add(this.model);
//                 }

//                 this.model.traverse((child) => {
//                     if (child.isMesh) {
//                         child.userData = this;
//                     }
//                 });
//             },
//             undefined,
//             (error) => {
//                 console.error('Error loading model:', error);
//             }
//         );
//     }

//     addFloors() {
//         for (let i = 0; i < this.numFloors; i++) {
//             // Crée un étage
//             const floor = this.model.clone();
//             floor.position.y += i * 6.5; // Ajuste la distance selon scale ou autre critère
            
//             // Ajoute des modèles enfants à cet étage, s'ils existent
//             if (this.childrenModels[i]) {
//                 this.addChildModelsToFloor(floor, this.childrenModels[i]);
//             }

//             this.scene.add(floor);
//         }
//     }

//     addChildModelsToFloor(floor, childModels) {
//         childModels.forEach(childModel => {
//             // Charger et ajouter chaque modèle enfant à l'étage
//             const loader = new GLTFLoader();
//             loader.load(childModel.url, (gltf) => {
//                 const child = gltf.scene;
//                 child.position.copy(childModel.position);
//                 child.scale.set(childModel.scale, childModel.scale, childModel.scale);
//                 floor.add(child); // Ajoute le modèle enfant à l'étage
//             }, undefined, (error) => {
//                 console.error('Erreur en chargement model enfant:', error);
//             });
//         });
//     }

//     onClick() {
//         console.log("Model clicked :", this.position);
//         this.clicked = true;
//         return this.position;
//     }
// }
// export default Model3D;
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TypeModel } from './EnumTypeModel.js';

class Model3D {
    constructor(scene, url, position = { x: 0, y: 0, z: 0 }, scale = 1, TypeModel = 1, numFloors = 1, childrenModels = []) {
        this.scene = scene;
        this.url = url;
        this.position = position;
        this.scale = scale;
        this.loader = new GLTFLoader();
        this.clicked = false;
        this.TypeModel = TypeModel;
        this.numFloors = numFloors;
        this.childrenModels = childrenModels;
        this.childModelsInstances = []; // Stockage des instances des modèles enfants
    }

    loadModel() {
        this.loader.load(
            this.url,
            (gltf) => {
                this.model = gltf.scene;
                this.model.position.set(this.position.x, this.position.y, this.position.z);
                this.model.scale.set(this.scale, this.scale, this.scale);

                if (this.TypeModel === TypeModel.SUPPER_MODEL && this.numFloors > 1) {
                    this.addFloors();
                } else {
                    this.scene.add(this.model);
                }

                this.model.traverse((child) => {
                    if (child.isMesh) {
                        child.userData = this;
                    }
                });
            },
            undefined,
            (error) => {
                console.error('Error loading model:', error);
            }
        );
    }

    addFloors() {
        for (let i = 0; i < this.numFloors; i++) {
            const floor = this.model.clone();
            floor.position.y += i * 6.5; // Ajuste la distance selon scale ou autre critère
            
            this.scene.add(floor);

            // Ajoute des modèles enfants à cet étage, s'ils existent
            if (this.childrenModels[i]) {
                const instances = this.addChildModelsToFloor(floor, this.childrenModels[i]);
                this.childModelsInstances.push(...instances); // Stocker les instances des modèles enfants
            }
        }
    }

    addChildModelsToFloor(floor, childModels) {
        const instances = [];
        childModels.forEach(childModel => {
            const loader = new GLTFLoader();
            loader.load(childModel.url, (gltf) => {
                const child = gltf.scene;
                child.position.copy(childModel.position);
                child.scale.set(childModel.scale, childModel.scale, childModel.scale);
                floor.add(child);
    
                // تسجل TypeModel ديال النموذج الفرعي في userData
                child.traverse((subChild) => {
                    if (subChild.isMesh) {
                        subChild.userData = {
                            TypeModel: childModel.TypeModel // أو أي خصائص أخرى
                        };
                    }
                });
    
                this.childModelsInstances.push(child);
            }, undefined, (error) => {
                console.error('Erreur en chargement model enfant:', error);
            });
        });
        return instances; // Retourner les instances des modèles enfants
    }

    setOpacityForChildren(opacity) {
        this.childModelsInstances.forEach((child) => {
            child.traverse((node) => {
                if (node.isMesh) {
                    node.material.transparent = true;
                    node.material.opacity = opacity;
                }
            });
        });
    }

    onClick() {
        console.log("Model clicked :", this.position);
        this.clicked = true;
        return this.position;
    }
}

export default Model3D;