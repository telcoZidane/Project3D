// import * as THREE from 'three';
// import Model3D from './Model3D.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { TypeModel } from './EnumTypeModel.js';

// const scene = new THREE.Scene();
// scene.background = new THREE.Color(0x87CEEB); 
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.set(10, 10, 10);
// camera.lookAt(new THREE.Vector3(0, 0, 0));

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.getElementById('container').appendChild(renderer.domElement);

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.dampingFactor = 1;
// controls.enableZoom = true;

// const light = new THREE.DirectionalLight(0xffffff, 5);
// light.position.set(10, 10, 10).normalize();
// const leftlight = new THREE.DirectionalLight(0xffffff, 5);
// leftlight.position.set(-10, 10, -10).normalize();
// scene.add(light);
// scene.add(leftlight);

// const ambientLight = new THREE.AmbientLight(0x404040);
// scene.add(ambientLight);

// // const officeModel = new Model3D(scene, '/model/Office_base05.glb', { x: 0, y: -0.5, z: 0 }, 2, TypeModel.SUPPER_MODEL);
// // const pcModel = new Model3D(scene, '/model/ModelPc.glb', { x: 5, y: 0, z: -12 }, 1, TypeModel.OBJECT_MODEL);
// // const bicycleModel = new Model3D(scene, '/model/Bicycle.glb', { x: -5, y: 0, z: -1 }, 1, TypeModel.OBJECT_MODEL);
// const officeModel = new Model3D(
//     scene,
//     '/model/Office_base04.glb', 
//     { x: 0, y: -0.5, z: 0 }, 
//     2, 
//     TypeModel.SUPPER_MODEL, 
//     3, // Nombre d'étages
//     [
//         [{ url: '/model/ModelPc.glb', position: { x: 1, y: 0, z: 1 }, scale: 1 }], // Modèle pour l'étage 0
//         [{ url: '/model/Bicycle.glb', position: { x: -1, y: 0, z: -1 }, scale: 0.5 }], // Modèle pour l'étage 1
//         [] // Aucun modèle pour l'étage 2
//     ]
// );
// officeModel.loadModel();
// // pcModel.loadModel();
// // bicycleModel.loadModel();

// //, pcModel, bicycleModel 
// const models = [officeModel];

// function onMouseClick(event) {
//     const raycaster = new THREE.Raycaster();
//     const mouse = new THREE.Vector2();

//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//     raycaster.setFromCamera(mouse, camera);
//     const intersects = raycaster.intersectObjects(scene.children, true);

//     if (intersects.length > 0) {
//         const target = intersects[0].object;
//         const model = target.userData;

//         // Reset opacity for all models
//         officeModel.forEach((model) => {
//             if (model.model) {
//                 model.clicked = false;
//                 model.model.traverse((child) => {
//                     if (child.material) {
//                         child.material.transparent = true;
//                         child.material.opacity = 0.5;
//                     }
//                 });
//             }
//         });

//         // Set clicked model opacity to 1
//         model.clicked = true;
//         model.model.traverse((child) => {
//             if (child.material) {
//                 child.material.transparent = false;
//                 child.material.opacity = 1;
//             }
//         });
//         if (model.TypeModel !== TypeModel.SUPPER_MODEL) {
//             const targetPosition = new THREE.Vector3();
//             target.getWorldPosition(targetPosition);
            
//             const direction = new THREE.Vector3();
//             target.getWorldDirection(direction);
            
//             const distance = 5;
//             const offset = direction.clone().multiplyScalar(distance);
//             const newCameraPosition = targetPosition.clone().add(offset);
//             newCameraPosition.y += 0.25 ;
//             newCameraPosition.x *= (newCameraPosition.x>0)? -1.7 : 1.7

//             const startPosition = camera.position.clone();
//             const startTime = performance.now();
//             const duration = 1000;
//             function animateCamera(time) {
//                 const elapsed = time - startTime;
//                 const t = Math.min(elapsed / duration, 1);
            
//                 camera.position.lerpVectors(startPosition, newCameraPosition, t);
//                 // camera.lookAt(targetPosition); 
            
//                 if (t < 1) {
//                     requestAnimationFrame(animateCamera);
//                 }
//             }
//             requestAnimationFrame(animateCamera);
//         } else if (model.TypeModel === TypeModel.SUPPER_MODEL) {
//             models.forEach((model) => {
//                 if (model.model) {
//                     model.clicked = false;
//                     model.model.traverse((child) => {
//                         if (child.material) {
//                             child.material.transparent = true;
//                             child.material.opacity = 0.5;
//                         }
//                     });
//                 }
//             });
//         }
//     }
// }

// window.addEventListener('click', onMouseClick, false);

// function animate() {
//     requestAnimationFrame(animate);
//     controls.update();
//     renderer.render(scene, camera);
// }

// animate();



import * as THREE from 'three';
import Model3D from './Model3D.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TypeModel } from './EnumTypeModel.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(new THREE.Vector3(0, 0, 0));

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 1;
controls.enableZoom = true;

const light = new THREE.DirectionalLight(0xffffff, 5);
light.position.set(10, 10, 10).normalize();
const leftlight = new THREE.DirectionalLight(0xffffff, 5);
leftlight.position.set(-10, 10, -10).normalize();
scene.add(light);
scene.add(leftlight);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const officeModel = new Model3D(
    scene,
    '/model/Office_base04.glb', 
    { x: 0, y: -0.5, z: 0 }, 
    2, 
    TypeModel.SUPPER_MODEL, 
    3, // Nombre d'étages
    [
        [{scene: scene, url: '/model/ModelPc.glb', position: { x: 1, y: 0, z: 1 }, scale: 1  ,TypeModel: TypeModel.OBJECT_MODEL}], // Modèle pour l'étage 0
        [{scene: scene, url: '/model/Bicycle.glb', position: { x: -1, y: 0, z: -1}, scale: 1 ,TypeModel: TypeModel.OBJECT_MODEL}], // Modèle pour l'étage 1
        [{scene: scene, url: '/model/Bicycle.glb', position: { x: -1, y: 0, z: -1}, scale: 1 ,TypeModel: TypeModel.OBJECT_MODEL}] // Aucun modèle pour l'étage 2
    ]
);
officeModel.loadModel();

const models = [officeModel];

function onMouseClick(event) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    models.forEach((model) => {
        if (model.TypeModel === TypeModel.SUPPER_MODEL) {
            model.setOpacityForChildren(0.5); 
        }
    });

    if (intersects.length > 0) {
        const target = intersects[0].object;
        const model = target.userData;

        if (model && model.TypeModel === TypeModel.OBJECT_MODEL) {
            model.setOpacityForChildren(1); 
        }
    }
}

window.addEventListener('click', onMouseClick, false);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
