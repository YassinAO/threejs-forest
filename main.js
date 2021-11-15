import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

let scene, camera, renderer

// Create the scene
scene = new THREE.Scene();

// const test = new THREE.TextureLoader();
// const bgTexture = test.load('assets/bg.jpg');
// scene.background = bgTexture;

// Create the camera
camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100);
camera.position.set(0,50,30)


// Create the render
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create camera control for model
const controls = new OrbitControls(camera, renderer.domElement);
controls.update()

// Add some lightning
const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x898888 );
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight( 0x9b9898 );
scene.add(dirLight);

// Add a model to the scene
const loader = new GLTFLoader();
loader.load('assets/nature/scene.gltf', function(gltf) {
  gltf.scene.scale.multiplyScalar(1 / 100); // adjust scalar factor to match your scene scale
  gltf.scene.position.x = -100; // once rescaled, position the model where needed
  gltf.scene.position.z = 2;
  scene.add(gltf.scene)
})


function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
}

animate()