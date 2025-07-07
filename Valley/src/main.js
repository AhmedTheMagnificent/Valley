import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import terrainVertexShader from "./shaders/terrain/vertex.glsl?raw";
import terrainFragmentShader from "./shaders/terrain/fragment.glsl?raw";
// import guify from 'guify';

console.log(terrainFragmentShader); 
console.log(terrainVertexShader); 
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Debug 
// let Guify = require('guify');
// const gui = new Guify({
//     align: 'right',
//     theme: 'dark',
//     width: '300px',
//     barMode: 'none'
// }); 

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: Math.min(window.devicePixelRatio, 2)
}
window.addEventListener("resize", () => {
  sizes.height = window.innerHeight;
  sizes.width = window.innerWidth;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

// Cube
// const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// scene.add(cube);

// Terrain
const terrain = {};
terrain.geometry = new THREE.PlaneGeometry(1, 1, 100, 100);
terrain.geometry.rotateX(-Math.PI / 2);
terrain.material = new THREE.ShaderMaterial({
  vertexShader: terrainVertexShader,
  fragmentShader: terrainFragmentShader
})
terrain.mesh = new THREE.Mesh(terrain.geometry, terrain.material);
terrain.mesh.scale.set(10, 10, 10);
scene.add(terrain.mesh);  

// Camera
const camera = new THREE.PerspectiveCamera(
  55,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
});

renderer.setClearColor(0x111111, 1);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(sizes.pixelRatio, 2));

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Animate
const clock = new THREE.Clock();
let lastElapsedTime = 0;
const tick = () => {
  const getElapsedTime = clock.getElapsedTime();
  const deltaTime = getElapsedTime - lastElapsedTime
  lastElapsedTime = getElapsedTime;
  controls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
