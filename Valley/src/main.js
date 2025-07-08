import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import terrainVertexShader from "./shaders/terrain/vertex.glsl?raw";
import terrainFragmentShader from "./shaders/terrain/fragment.glsl?raw";
import { Pane } from 'tweakpane';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';


// Canvas
const canvas = document.querySelector("canvas.webgl");

// Debug 
const pane = new Pane();

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: Math.min(window.devicePixelRatio, 2)
}

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x141d29);

//debug
const backgroundColor = { background: "0x141d29" };
pane.addBinding(backgroundColor, "background", {
  view: "color",
  label: "Background"
}).on("change", (ev) => scene.background.set(ev.value));

// Camera
const camera = new THREE.PerspectiveCamera(
  55,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
camera.position.y = 1;
scene.add(camera);

// Resize
window.addEventListener("resize", () => {
  sizes.height = window.innerHeight;
  sizes.width = window.innerWidth;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  effectComposer.setSize(sizes.width, sizes.height);
  effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // bokehPass.renderTargetDepth.width = sizes.width * sizes.pixelRatio;
  // bokehPass.renderTargetDepth.height = sizes.height * sizes.pixelRatio;
})

// Cube
// const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// scene.add(cube);

// Terrain
const terrain = {};
terrain.texture = {};
terrain.texture.linesCount = 5;
terrain.texture.bigLineWidth = 0.04;
terrain.texture.smallLineWidth = 0.01;
terrain.texture.smallLineAlpha = 0.5;
terrain.texture.width = 32;
terrain.texture.height = 128;
terrain.texture.canvas = document.createElement("canvas");
terrain.texture.canvas.width = terrain.texture.width;
terrain.texture.canvas.height = terrain.texture.height;
terrain.texture.canvas.style.position = "fixed";
terrain.texture.canvas.style.top = 0;
terrain.texture.canvas.style.left = 0;
terrain.texture.canvas.style.zIndex = 1;
document.body.append(terrain.texture.canvas);

terrain.texture.context = terrain.texture.canvas.getContext('2d');

terrain.texture.instance = new THREE.CanvasTexture(terrain.texture.canvas);
terrain.texture.instance.wrapS = THREE.RepeatWrapping;
terrain.texture.instance.wrapT = THREE.RepeatWrapping;
// terrain.texture.instance.minFilter = THREE.NearestFilter;
terrain.texture.instance.magFilter = THREE.NearestFilter;

terrain.texture.update = () => {
  terrain.texture.context.clearRect(0, 0, terrain.texture.width, terrain.texture.height);
  // Big line
  terrain.texture.context.fillStyle = "#ffffff";
  terrain.texture.context.globalAlpha = 1;
  terrain.texture.context.fillRect(
    0,
    0,
    terrain.texture.width,
    Math.round(terrain.texture.height * terrain.texture.bigLineWidth)
  );

  const smallLinesCount = terrain.texture.linesCount - 1;

  for (let i = 0; i < smallLinesCount; i++) {
    terrain.texture.context.globalAlpha = terrain.texture.smallLineAlpha;
    terrain.texture.context.fillRect(
      0,
      Math.round(terrain.texture.height / terrain.texture.linesCount) * (i + 1),
      terrain.texture.width,
      Math.round(terrain.texture.height * terrain.texture.smallLineWidth)
    );
  }
  terrain.texture.instance.needsUpdate = true;
}

terrain.texture.update();

const terrainPane = pane.addFolder({
  title: "Terrain"
})

const terrainTexturePane = terrainPane.addFolder({
  title: "Terrain Texture"
});

terrainTexturePane.addBinding(terrain.texture, "linesCount", {
  min: 1,
  max: 100,
  step: 1,
  label: "Lines Count"
}).on("change", () => terrain.texture.update());

terrainTexturePane.addBinding(terrain.texture, "bigLineWidth", {
  min: 0,
  max: 0.1,
  step: 0.001,
  label: "Big Line Width"
}).on("change", () => terrain.texture.update());

terrainTexturePane.addBinding(terrain.texture, "smallLineWidth", {
  min: 0,
  max: 0.1,
  step: 0.001,
  label: "Small Line Width"
}).on("change", () => terrain.texture.update());

terrainTexturePane.addBinding(terrain.texture, "smallLineAlpha", {
  min: 0,
  max: 1,
  step: 0.1,
  label: "Small Line Alpha"
}).on("change", () => terrain.texture.update());

terrain.geometry = new THREE.PlaneGeometry(1, 1, 1000, 1000);
terrain.geometry.rotateX(-Math.PI / 2);
terrain.material = new THREE.ShaderMaterial({
  vertexShader: terrainVertexShader,
  fragmentShader: terrainFragmentShader,
  transparent: true,
  side: THREE.DoubleSide,
  blending: THREE.AdditiveBlending,
  uniforms: {
    uTexture: { value: terrain.texture.instance },
    uElevation: { value: 2 },
    uTextureofFrequency: { value: 10 },
    uTime: { value: 0 }
  }
})
terrain.mesh = new THREE.Mesh(terrain.geometry, terrain.material);
terrain.mesh.scale.set(10, 10, 10);
scene.add(terrain.mesh);

// debug
const terrainMaterialPane = terrainPane.addFolder({
  title: "Terrain Material"
});
terrainMaterialPane.addBinding(terrain.material.uniforms.uElevation, "value", {
  min: 0,
  max: 5,
  step: 0.001,
  label: "uElevation"
});
terrainMaterialPane.addBinding(terrain.material.uniforms.uTextureofFrequency, "value", {
  min: 0.01,
  max: 100,
  step: 0.01,
  label: "uTextureofFrequency"
});

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
});

renderer.setClearColor(0x111111, 1);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(sizes.pixelRatio, 2));

// Effect Composer
const renderTarget = new THREE.WebGLRenderTarget(800, 600, {
  minFilter: THREE.LinearFilter,
  magFilter: THREE.LinearFilter,
  format: THREE.RGBAFormat,
  encoding: THREE.sRGBEncoding
});
const effectComposer = new EffectComposer(renderer);
effectComposer.setSize(sizes.width, sizes.height);
effectComposer.setPixelRatio(Math.min(sizes.pixelRatio, 2));

// Render pass
const renderPass = new RenderPass(scene, camera);
effectComposer.addPass(renderPass);

// Bokeh pass
const bokehPass = new BokehPass(
  scene,
  camera,
  {
    focus: 1.0,
    aperture: 0.025,
    maxblur: 0.01,
    width: sizes.width * sizes.pixelRatio,
    height: sizes.height * sizes.pixelRatio
  }
);
effectComposer.addPass(bokehPass);

const bokehPassPane = pane.addFolder({
  title: "Bokeh Pass",
});
bokehPassPane.addBinding(bokehPass, "enabled", {
  label: "Enabled"
});
bokehPassPane.addBinding(bokehPass.materialBokeh.uniforms.focus, "value", {
  min: 0,
  max: 10,
  step: 0.01,
  label: "Focus"
});
bokehPassPane.addBinding(bokehPass.materialBokeh.uniforms.aperture, "value", {
  min: 0.002,
  max: 0.1,
  step: 0.0001,
  label: "Aperture"
});
bokehPassPane.addBinding(bokehPass.materialBokeh.uniforms.maxblur, "value", {
  min: 0,
  max: 0.02,
  step: 0.0001,
  label: "Max Blur"
});

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Animate
const clock = new THREE.Clock();
let lastElapsedTime = 0;
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - lastElapsedTime
  lastElapsedTime = elapsedTime;
  controls.update();

  terrain.material.uniforms.uTime.value = elapsedTime;

  // renderer.render(scene, camera);
  effectComposer.render();
  window.requestAnimationFrame(tick);
};

tick();
