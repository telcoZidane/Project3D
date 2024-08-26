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

const officeModel = new Model3D(scene, '/model/Office_base3.glb', { x: 0, y: 0, z: 0 }, 2,TypeModel.SUPPER_MODEL);
const pcModel = new Model3D(scene, '/model/ModelPc.glb', { x: 5, y: 0, z: -13 }, 1,TypeModel.OBJECT_MODEL);
const bicycleModel = new Model3D(scene, '/model/Bicycle.glb', { x: -5, y: 0, z: -1 }, 1,TypeModel.OBJECT_MODEL);

officeModel.loadModel();
pcModel.loadModel();
bicycleModel.loadModel();

const models = [officeModel, pcModel, bicycleModel];

function onMouseClick(event) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        const target = intersects[0].object;
        const model = target.userData;

        // Reset opacity for all models
        models.forEach((model) => {
            if (model.model) {
                model.clicked = false;
                model.model.traverse((child) => {
                    if (child.material) {
                        child.material.transparent = true;
                        child.material.opacity = 0.5;
                    }
                });
            }
        });

        // Set clicked model opacity to 1
        model.clicked = true;
        model.model.traverse((child) => {
            if (child.material) {
                child.material.transparent = false;
                child.material.opacity = 1;
            }
        });
        if(model.TypeModel!== TypeModel.SUPPER_MODEL)
        {
            // Get the target's position and direction
            const targetPosition = model.onClick();
            const direction = new THREE.Vector3();
            target.getWorldDirection(direction);

            // Adjust direction to avoid only vertical movement
            if (Math.abs(direction.y) > 0.9) {
                direction.x = direction.z = 0.5;
                direction.y = 0.5;
                direction.normalize();
            }

            // Calculate the new camera position
            const distance = 5;
            const offset = direction.clone().multiplyScalar(-distance);
            const newCameraPosition = new THREE.Vector3(targetPosition.x, targetPosition.y, targetPosition.z).add(offset);
            newCameraPosition.y += 1;
            newCameraPosition.normalize();

            // Animate the camera to the new position
            const duration = 1000;
            const startPosition = camera.position.clone();
            const startTime = performance.now();

            function animateCamera(time) {
                const elapsed = time - startTime;
                const t = Math.min(elapsed / duration, 1);
                camera.position.lerpVectors(startPosition, newCameraPosition, t);
                camera.lookAt(targetPosition);
                if (t < 1) {
                    requestAnimationFrame(animateCamera);
                }
            }
            requestAnimationFrame(animateCamera);
        }
        else if(model.TypeModel=== TypeModel.SUPPER_MODEL){

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