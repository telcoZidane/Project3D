import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(new THREE.Vector3(0, 0, 0));

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.enableZoom = true;

const lightLeft = new THREE.DirectionalLight(0xffffff, 5);
lightLeft.position.set(10, 10, 10).normalize();
scene.add(lightLeft);
const lightRight = new THREE.DirectionalLight(0xffffff, 5);
lightRight.position.set(-10, 10, 10).normalize();
scene.add(lightRight);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

let models = [];

// Function to fetch data from the local JSON file
async function fetchModelData() {
    try {
        const response = await fetch('models.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Received non-JSON response');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching model data:', error);
        return [];
    }
}

class SimpleModel {
    constructor(url, position, scale, type,status, components = []) {
        this.url = url;
        this.position = position;
        this.scale = scale;
        this.type = type;
        this.model = null;
        this.status = status;
        this.components = components;  // To store child components like PCs
    }

    load(scene) {
        const loader = this.url.endsWith('.glb') ? new GLTFLoader() : new FBXLoader();

        loader.load(this.url, (object) => {
            this.model = this.url.endsWith('.glb') ? object.scene : object;
            this.model.position.set(this.position.x, this.position.y, this.position.z);
            this.model.scale.set(this.scale, this.scale, this.scale);

            // Traverse the model and set userData for meshes
            this.model.traverse((child) => {
                if (child.isMesh) {
                    child.userData = { parentModel: this };
                }
            });

            scene.add(this.model);

            // Load child components if any
            this.loadComponents(scene);
        }, undefined, (error) => {
            console.error('Error loading model:', error);
        });
    }

    loadComponents(scene) {
        this.components.forEach(componentData => {
            const component = new SimpleModel(
                componentData.url,
                {
                    x: this.position.x + componentData.position.x,
                    y: this.position.y + componentData.position.y,
                    z: this.position.z + componentData.position.z,
                },
                componentData.scale,
                componentData.type,
                componentData.status
            );
            component.load(scene);
            models.push(component);
        });
    }

    setOpacity(opacity) {
        if (this.model) {
            this.model.traverse((child) => {
                if (child.isMesh) {
                    child.material.transparent = true;
                    child.material.opacity = opacity;
                }
            });
        }
    }
}

// Function to create models from the local JSON data
function createModelsFromAPI(modelData) {
    modelData.forEach(item => {
        const model = new SimpleModel(item.url, item.position, item.scale, item.type, item.status, item.components);
        model.load(scene);
        models.push(model);
    });
}

// Function to handle mouse clicks
function onMouseClick(event) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        const target = intersects[0].object;
        const parentModel = target.userData.parentModel;

        if (parentModel) {
            models.forEach(model => {
                if (model !== parentModel) {
                    model.setOpacity(0.5);
                } else {
                    model.setOpacity(1);
                    moveCameraToTarget(parentModel.model);
                }
            });

            // Display status card for the selected model
            displayStatusCard(parentModel);
        }
    }
}

// Function to move camera to the selected object
function moveCameraToTarget(target) {
    const targetPosition = new THREE.Vector3();
    target.getWorldPosition(targetPosition);

    const startPosition = camera.position.clone();
    const startTime = performance.now();
    const duration = 1000;

    function animateCamera(time) {
        const elapsed = time - startTime;
        const t = Math.min(elapsed / duration, 1);

        camera.position.lerpVectors(startPosition, targetPosition, t);
        camera.lookAt(targetPosition);

        if (t < 1) {
            requestAnimationFrame(animateCamera);
        }
    }

    requestAnimationFrame(animateCamera);
}

// Function to display the status card
function displayStatusCard(model) {
    const statusCard = document.getElementById('status-card');
    statusCard.style.display = 'block';

    statusCard.innerHTML = `
        <h3>${model.type} Status</h3>
        <p>Position: X=${model.position.x}, Y=${model.position.y}, Z=${model.position.z}</p>
        <p>Status: ${model.status || 'N/A'}</p>
    `;
}

// Fetch model data from local JSON and load models
fetchModelData().then(data => {
    createModelsFromAPI(data);
});

// Event listener for mouse click
window.addEventListener('click', onMouseClick);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
