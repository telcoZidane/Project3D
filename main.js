// import * as THREE from 'three';
// import Model3D from './Model3D.js'; // تأكد من المسار الصحيح
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


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
// controls.dampingFactor = 0.25;
// controls.enableZoom = true;

// const light = new THREE.DirectionalLight(0xffffff, 5);
// light.position.set(10, 10, 10).normalize();
// const leftlight = new THREE.DirectionalLight(0xffffff, 5);
// leftlight.position.set(-10, 10, -10).normalize();
// scene.add(light);
// scene.add(leftlight);
// const ambientLight = new THREE.AmbientLight(0x404040);
// scene.add(ambientLight);


// const officeModel = new Model3D(scene, '/model/office.glb', { x: 0, y: 0, z: 0 }, 2).loadModel();
// const pcModel = new Model3D(scene, '/model/ModelPc.glb', { x: -5, y:(-3.1), z: 1 }, 1).loadModel();
// const bicycleModel = new Model3D(scene, '/model/Bicycle.glb', { x: -5, y: -3.6, z: -1 }, 1).loadModel();

// function animate() {
//     requestAnimationFrame(animate);
//     controls.update();
//     renderer.render(scene, camera);
// }

// animate();
//---------------------------------------------
// import * as THREE from 'three';
// import Model3D from './Model3D.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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
// controls.dampingFactor = 0.25;
// controls.enableZoom = true;

// const light = new THREE.DirectionalLight(0xffffff, 5);
// light.position.set(10, 10, 10).normalize();
// const leftlight = new THREE.DirectionalLight(0xffffff, 5);
// leftlight.position.set(-10, 10, -10).normalize();
// scene.add(light);
// scene.add(leftlight);

// const ambientLight = new THREE.AmbientLight(0x404040);
// scene.add(ambientLight);

// const officeModel = new Model3D(scene, '/model/office.glb', { x: 0, y: 0, z: 0 }, 2).loadModel();
// const pcModel = new Model3D(scene, '/model/ModelPc.glb', { x: -5, y: -3.1, z: 1 }, 1).loadModel();
// const bicycleModel = new Model3D(scene, '/model/Bicycle.glb', { x: -5, y: -3.6, z: -1 }, 1).loadModel();

// const raycaster = new THREE.Raycaster();
// const mouse = new THREE.Vector2();

// function onMouseClick(event) {
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//     raycaster.setFromCamera(mouse, camera);
//     const intersects = raycaster.intersectObjects(scene.children, true);

//     if (intersects.length > 0) {
//         const target = intersects[0].object;

//         const targetPosition = new THREE.Vector3();
//         target.getWorldPosition(targetPosition);

//         const duration = 1000; // المدة الزمنية للتحريك بالمللي ثانية
//         const startPosition = camera.position.clone();
//         const endPosition = targetPosition.clone().add(new THREE.Vector3(0, 1, 3)); // تعديل المسافة حسب الحاجة
//         const startTime = performance.now();

//         function animateCamera(time) {
//             const elapsed = time - startTime;
//             const t = Math.min(elapsed / duration, 1);
//             camera.position.lerpVectors(startPosition, endPosition, t);
//             camera.lookAt(targetPosition);
//             if (t < 1) {
//                 requestAnimationFrame(animateCamera);
//             }
//         }
//         requestAnimationFrame(animateCamera);
//     }
// }

// window.addEventListener('click', onMouseClick, false);

// function animate() {
//     requestAnimationFrame(animate);
//     controls.update();
//     renderer.render(scene, camera);
// }

// animate();
//-+--------------------------------------------------------
import * as THREE from 'three';
import Model3D from './Model3D.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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
controls.dampingFactor = 0.25;
controls.enableZoom = true;

const light = new THREE.DirectionalLight(0xffffff, 5);
light.position.set(10, 10, 10).normalize();
const leftlight = new THREE.DirectionalLight(0xffffff, 5);
leftlight.position.set(-10, 10, -10).normalize();
scene.add(light);
scene.add(leftlight);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const officeModel = new Model3D(scene, '/model/office.glb', { x: 0, y: 0, z: 0 }, 2).loadModel();
const pcModel = new Model3D(scene, '/model/ModelPc.glb', { x: -5, y: -3.1, z: 1 }, 1).loadModel();
const bicycleModel = new Model3D(scene, '/model/Bicycle.glb', { x: -5, y: -3.6, z: -1 }, 1).loadModel();

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        const target = intersects[0].object;

        const targetPosition = new THREE.Vector3();
        target.getWorldPosition(targetPosition);

        const duration = 1000; // المدة الزمنية للتحريك بالمللي ثانية
        const startPosition = camera.position.clone();
        const endPosition = targetPosition.clone().add(new THREE.Vector3(0, 1, 3)); // تعديل المسافة حسب الحاجة
        const startTime = performance.now();

        function animateCamera(time) {
            const elapsed = time - startTime;
            const t = Math.min(elapsed / duration, 1);
            camera.position.lerpVectors(startPosition, endPosition, t);
            if (t < 1) {
                requestAnimationFrame(animateCamera);
            } else {
                // تأكد من توجيه الكاميرا للنموذج المستهدف بعد انتهاء الحركة
                camera.lookAt(targetPosition);
            }
        }
        requestAnimationFrame(animateCamera);
    }
}

window.addEventListener('click', onMouseClick, false);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
