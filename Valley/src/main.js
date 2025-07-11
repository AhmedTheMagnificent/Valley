import './style.css';
import * as THREE from 'three';
import gsap from "gsap";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import terrainVertexShader from "./shaders/terrain/vertex.glsl?raw";
import terrainFragmentShader from "./shaders/terrain/fragment.glsl?raw";
import terrainDepthVertexShader from "./shaders/terrainDepth/vertex.glsl?raw";
import terrainDepthFragmentShader from "./shaders/terrainDepth/fragment.glsl?raw";
import overlayVertexShader from "./shaders/vignette/vertex.glsl?raw";
import overlayFragmentShader from "./shaders/vignette/fragment.glsl?raw";
import { Pane } from 'tweakpane';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { BokehPass } from './passes/BokehPass';

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Debug 
const pane = new Pane({ container: document.getElementById('pane-container') });
function togglePane() {
  const container = document.getElementById('pane-container');
  container.classList.toggle('hidden');
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'h') togglePane();
});


// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: Math.min(window.devicePixelRatio, 2)
}

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x080024);

//debug
const backgroundColor = { background: "0x080024" };
pane.addBinding(backgroundColor, "background", {
  view: "color",
  label: "Background"
}).on("change", (ev) => scene.background.set(ev.value));

// Camera
const camera = {};
camera.position = new THREE.Vector3();
camera.rotation = new THREE.Euler();
camera.rotation.reorder("YXZ");
camera.instance = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.01,
  100
);
camera.instance.rotation.reorder("YXZ");
scene.add(camera.instance);



window.camera = camera.instance;


// Resize
window.addEventListener("resize", () => {
  sizes.height = window.innerHeight;
  sizes.width = window.innerWidth;

  camera.instance.aspect = sizes.width / sizes.height;
  camera.instance.updateProjectionMatrix();

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
terrain.texture.bigLineWidth = 0.08;
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
terrain.texture.canvas.style.width = '50px';
terrain.texture.canvas.style.height = `${terrain.texture.height}px`;
terrain.texture.canvas.style.zIndex = 1;
terrain.texture.visible = true;
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
    terrain.texture.context.fillStyle = "#ffffff";
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
  title: "Terrain Texture",
});
terrainTexturePane.addBinding(terrain.texture, "visible", {
  label: "Show Texture Canvas"
}).on("change", () => {
  if (terrain.texture.visible) {
    document.body.append(terrain.texture.canvas);
  } else {
    if (document.body.contains(terrain.texture.canvas)) {
      document.body.removeChild(terrain.texture.canvas);
    }
  }
});
terrainTexturePane.addBinding(terrain.texture, "linesCount", {
  min: 1,
  max: 100,
  step: 1,
  label: "Lines Count"
}).on("change", () => terrain.texture.update());

terrainTexturePane.addBinding(terrain.texture, "bigLineWidth", {
  min: 0,
  max: 0.5,
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
  // blending: THREE.AdditiveBlending,
  uniforms: {
    uTexture: { value: terrain.texture.instance },
    uElevation: { value: 2 },
    uElevationValley: { value: 0.4 },
    uElevationValleyFrequency: { value: 1.5 },
    uElevationGeneral: { value: 0.2 },
    uElevationGeneralFrequency: { value: 0.2 },
    uElevationDetails: { value: 0.2 },
    uElevationDetailsFrequency: { value: 2.012 },
    uTextureFrequency: { value: 10 },
    uTextureOffset: { value: 0.585 },
    uTime: { value: 0 },
    uHslHue: { value: 1.0 },
    uHslHueOffset: { value: 0.0 },
    uHslHueFrequency: { value: 10.0 },
    uHslTimeFrequency: { value: 0.05 },
    uHslLightness: { value: 0.75 },
    uHslLightnessVariation: { value: 0.25 },
    uHslLightnessFrequency: { value: 20.0 }
  }
})

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
terrainMaterialPane.addBinding(terrain.material.uniforms.uElevationValley, "value", {
  min: 0,
  max: 1,
  step: 0.001,
  label: "uElevationValley"
});
terrainMaterialPane.addBinding(terrain.material.uniforms.uElevationValleyFrequency, "value", {
  min: 0,
  max: 10,
  step: 0.001,
  label: "uElevationValleyFrequency"
});
terrainMaterialPane.addBinding(terrain.material.uniforms.uElevationGeneral, "value", {
  min: 0,
  max: 1,
  step: 0.001,
  label: "uElevationGeneral"
});
terrainMaterialPane.addBinding(terrain.material.uniforms.uElevationGeneralFrequency, "value", {
  min: 0,
  max: 10,
  step: 0.001,
  label: "uElevationGeneralFrequency"
});
terrainMaterialPane.addBinding(terrain.material.uniforms.uElevationDetails, "value", {
  min: 0,
  max: 1,
  step: 0.001,
  label: "uElevationDetails"
});
terrainMaterialPane.addBinding(terrain.material.uniforms.uElevationDetailsFrequency, "value", {
  min: 0,
  max: 10,
  step: 0.001,
  label: "uElevationDetailsFrequency"
});
terrainMaterialPane.addBinding(terrain.material.uniforms.uTextureFrequency, "value", {
  min: 0.01,
  max: 100,
  step: 0.01,
  label: "uTextureFrequency"
});
terrainMaterialPane.addBinding(terrain.material.uniforms.uHslHue, "value", {
  min: 0,
  max: 1,
  step: 0.001,
  label: "uHslHue"
});
terrainMaterialPane.addBinding(terrain.material.uniforms.uHslHueOffset, "value", {
  min: 0,
  max: 1,
  step: 0.001,
  label: "uHslHueOffset"
});
terrainMaterialPane.addBinding(terrain.material.uniforms.uHslHueFrequency, "value", {
  min: 0,
  max: 200,
  step: 0.01,
  label: "uHslHueFrequency"
});
terrainMaterialPane.addBinding(terrain.material.uniforms.uHslLightness, "value", {
  min: 0,
  max: 1,
  step: 0.001,
  label: "uHslLightness"
});
terrainMaterialPane.addBinding(terrain.material.uniforms.uHslLightnessVariation, "value", {
  min: 0,
  max: 1,
  step: 0.001,
  label: "uHslLightnessVariation"
});
terrainMaterialPane.addBinding(terrain.material.uniforms.uHslLightnessFrequency, "value", {
  min: 0.0,
  max: 50,
  step: 0.01,
  label: "uHslLightnessFrequency"
});


// Depth material
const uniforms = THREE.UniformsUtils.merge([
  THREE.UniformsLib.common,
  THREE.UniformsLib.displacementmap
]);
terrain.depthMaterial = new THREE.ShaderMaterial({
  vertexShader: terrainDepthVertexShader,
  fragmentShader: terrainDepthFragmentShader,
  uniforms: uniforms
});
terrain.depthMaterial.depthPacking = THREE.RGBADepthPacking;
terrain.depthMaterial.blending = THREE.NoBlending;
terrain.depthMaterial.morphTargets = false;
terrain.depthMaterial.map = null;
terrain.depthMaterial.alphaMap = null;
terrain.depthMaterial.displacementMap = null;
terrain.depthMaterial.displacementScale = 1;
terrain.depthMaterial.displacementBias = 0;
terrain.depthMaterial.wireframe = false;
terrain.depthMaterial.wireframeLinewidth = 1;
terrain.depthMaterial.fog = false;

terrain.depthMaterial.depthPacking

// Mesh
terrain.mesh = new THREE.Mesh(terrain.geometry, terrain.material);
terrain.mesh.scale.set(10, 10, 10);
scene.add(terrain.mesh);

// Overlay
const overlay = {}

overlay.vignetteColor = {}
overlay.vignetteColor.value = '#4f1f96'
overlay.vignetteColor.instance = new THREE.Color(overlay.vignetteColor.value)

overlay.overlayColor = {}
overlay.overlayColor.value = '#130621'
overlay.overlayColor.instance = new THREE.Color(overlay.overlayColor.value)

overlay.geometry = new THREE.PlaneGeometry(2, 2)

overlay.material = new THREE.ShaderMaterial({
  uniforms:
  {
    uVignetteColor: { value: overlay.vignetteColor.instance },
    uVignetteMultiplier: { value: 1.16 },
    uVignetteOffset: { value: -1 },
    uOverlayColor: { value: overlay.overlayColor.instance },
    uOverlayAlpha: { value: 0.5 },
    uColor: { value: new THREE.Color('#130621') }, // The dark purple overlay color
    uStrength: { value: 1.0 }, // How dark the edges are
  },
  vertexShader: overlayVertexShader,
  fragmentShader: overlayFragmentShader,
  transparent: true,
  depthTest: false
})
overlay.mesh = new THREE.Mesh(overlay.geometry, overlay.material)
overlay.mesh.userData.noBokeh = true
overlay.mesh.frustumCulled = false
scene.add(overlay.mesh)

const overlayPane = pane.addFolder({
  title: "Overlay"
});
overlayPane.addBinding(overlay.vignetteColor, 'value', {
  label: 'Vignette Color',
  type: "color"
}).on("change", () => overlay.vignetteColor.instance.set(overlay.vignetteColor.value));
overlayPane.addBinding(overlay.overlayColor, 'value', {
  label: 'Color',
  type: "color",
  format: 'hex'
}).on("change", () => overlay.vignetteColor.instance.set(overlay.overlayColor.value));
overlayPane.addBinding(overlay.material.uniforms.uVignetteMultiplier, 'value', {
  label: 'uVignetteMultiplier',
  min: 0,
  max: 5,
  step: 0.001
});
overlayPane.addBinding(overlay.material.uniforms.uVignetteOffset, 'value', {
  label: 'uVignetteOffset',
  min: -2,
  max: 2,
  step: 0.001
});
overlayPane.addBinding(overlay.material.uniforms.uOverlayAlpha, 'value', {
  label: "uOverlayAlpha",
  min: 0,
  max: 1,
  step: 0.01
});


// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  // antialias: true
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
const renderPass = new RenderPass(scene, camera.instance);
effectComposer.addPass(renderPass);

// Bokeh pass
const bokehPass = new BokehPass(
  scene,
  camera.instance,
  {
    focus: 1.0,
    aperture: 0.015,
    maxblur: 0.01,
    width: sizes.width * sizes.pixelRatio,
    height: sizes.height * sizes.pixelRatio
  }
);
bokehPass.enabled = true;
effectComposer.addPass(bokehPass);

const bokehPassPane = pane.addFolder({
  title: "Bokeh Pass",
});
bokehPassPane.addBinding(bokehPass, "enabled", {
  label: "Enabled"
});
const focusControl = bokehPassPane.addBinding(bokehPass.materialBokeh.uniforms.focus, "value", {
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
const controls = new OrbitControls(camera.instance, renderer.domElement);
controls.enableDamping = true;
controls.enabled = false;

const controlsPane = pane.addFolder({
  title: "Controls"
});
controlsPane.addBinding(controls, "enabled", {
  label: "Enabled"
});

// Unreal Bloom Pass
const unrealBloomPass = new UnrealBloomPass(new THREE.Vector2(sizes.width, sizes.height), 1.5, 0.4, 0.85);
unrealBloomPass.enabled = false;
effectComposer.addPass(unrealBloomPass);

const unrealBloomPane = pane.addFolder({
  title: 'Unreal Bloom Pass',
  expanded: true // '
  // open: true' in guify is 'expanded: true' in tweakpane
});
unrealBloomPane.addBinding(unrealBloomPass, 'enabled', {
  label: 'Enabled' // Tweakpane automatically creates a checkbox for booleans
});
unrealBloomPane.addBinding(unrealBloomPass, 'threshold', {
  label: 'Threshold',
  min: 0,
  max: 1,
  step: 0.0001
});
unrealBloomPane.addBinding(unrealBloomPass, 'strength', {
  label: 'Strength',
  min: 0,
  max: 3,
  step: 0.0001
});
unrealBloomPane.addBinding(unrealBloomPass, 'radius', {
  label: 'Radius',
  min: 0,
  max: 1,
  step: 0.0001
});



// View
const view = {};
view.index = 0;
view.settings = [
  {
    position: {x: 0, y: 2.125, z: -0.173 },
    rotation: {x: -1.489, y: -Math.PI, z: 0 },
    focus: 2.14,
    parallaxMultiplier: 0.25
  },
  {
    position: {x: 1, y: 1.1, z: 0 },
    rotation: {x: -0.833, y: 1.596, z: 1.651 },
    focus: 1.1,
    parallaxMultiplier: 0.12
  },
  {
    position: {x: 1, y: 0.87, z: -0.97 },
    rotation: {x: -0.638, y: 2.33, z: 0 },
    focus: 1.36,
    parallaxMultiplier: 0.12
  },
  {
    position: {x: -1.43, y: 0.33, z: -0.144 },
    rotation: {x: -0.312, y: -1.67, z: 0 },
    focus: 1.25,
    parallaxMultiplier: 0.12
  }
];

// Parallax
view.parallax = {};
view.parallax.target = {};
view.parallax.target.x = 0;
view.parallax.target.y = 0;
view.parallax.eased = {};
view.parallax.eased.x = 0;
view.parallax.eased.y = 0;
view.parallax.eased.multiplier = 4;
view.parallax.multiplier = 0.25;



window.addEventListener("mousemove", (_event) => {
  view.parallax.target.x = (_event.clientX / sizes.width - 0.5) * view.parallax.multiplier;
  view.parallax.target.y = - (_event.clientY / sizes.height - 0.5) * view.parallax.multiplier;
});

view.current = view.settings[view.index];

view.apply = () => {
  camera.position.copy(view.current.position);
  camera.rotation.x = view.current.rotation.x;
  camera.rotation.y = view.current.rotation.y;

  bokehPass.materialBokeh.uniforms.focus.value = view.current.focus;
  view.parallax.multiplier = view.current.parallaxMultiplier;
}

view.change = (_index) => {
  view.index = _index;
  view.current = view.settings[_index];
  gsap.to(
    overlay.material.uniforms.uOverlayAlpha,
    {
      duration: 1.25,
      value: 1,
      delay: 1,
      ease: "power2.inOut",
      onComplete: () => {
        view.apply();
        gsap.to(
                    overlay.material.uniforms.uOverlayAlpha,
                    {
                        duration: 1,
                        value: 0,
                        ease: 'power2.inOut'
                    }
                )
      }
    }
  )
}
view.apply();

window.setInterval(() => {
  view.change((view.index + 1) % view.settings.length);
}, 7500);


const viewPane = pane.addFolder({
  title: "View"
});

for(const _settingIndex in view.settings){
  viewPane.addButton({
    title: `View ${Number(_settingIndex) + 1}`,
  }).on("click", () => view.change(_settingIndex));
}


// Focus animation
const changeFocus = () =>
{
    gsap.to(
        bokehPass.materialBokeh.uniforms.focus,
        {
            duration: 0.5 + Math.random() * 3,
            ease: 'power2.inOut',
            onComplete: changeFocus,
            value: view.current.focus + Math.random(),
            onUpdate: () => {
              // Tell the specific focus slider control to refresh its display
              focusControl.refresh();
            }
        }
    )
}

changeFocus();

// Presets
const presets = {}
presets.settings = [
    {
        vignetteColor: '#4f1f96',
        overlayColor: '#130621',
        clearColor: '#080024',
        terrainHue: 1,
        terrainHueOffset: 0
    },
    {
        vignetteColor: '#590826',
        overlayColor: '#21060b',
        clearColor: '#240004',
        terrainHue: 0.145,
        terrainHueOffset: 0.86
    },
    {
        vignetteColor: '#1f6a96',
        overlayColor: '#050e1c',
        clearColor: '#000324',
        terrainHue: 0.12,
        terrainHueOffset: 0.5
    },
    {
        vignetteColor: '#1f9682',
        overlayColor: '#02100c',
        clearColor: '#00240c',
        terrainHue: 0.12,
        terrainHueOffset: 0.2
    }
];

presets.apply = (_index) =>
{
    const presetsSettings = presets.settings[_index]

    overlay.vignetteColor.instance.set(presetsSettings.vignetteColor)

    overlay.overlayColor.instance.set(presetsSettings.overlayColor)

    terrain.material.uniforms.uHslHue.value = presetsSettings.terrainHue
    terrain.material.uniforms.uHslHueOffset.value = presetsSettings.terrainHueOffset

    renderer.setClearColor(presetsSettings.clearColor, 1)
};

const presetsFolder = pane.addFolder({
    title: 'presets',
    expanded: true
});

for (const _presetsIndex in presets.settings) {
    presetsFolder.addButton({
        title: `apply(${_presetsIndex})`
    }).on('click', () => {
        presets.apply(_presetsIndex);
    });
}




// Animate
const clock = new THREE.Clock();
let lastElapsedTime = 0;
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - lastElapsedTime
  lastElapsedTime = elapsedTime;
  terrain.material.uniforms.uTime.value = elapsedTime;
  if(controls.enabled){
    controls.update();
  }

  camera.instance.position.copy(camera.position);
  view.parallax.eased.x += (view.parallax.target.x - view.parallax.eased.x) * deltaTime * view.parallax.eased.multiplier;
  view.parallax.eased.y += (view.parallax.target.y - view.parallax.eased.y) * deltaTime * view.parallax.eased.multiplier;
  camera.instance.translateY(view.parallax.eased.y);
  camera.instance.translateX(view.parallax.eased.x);

  camera.instance.rotation.x = camera.rotation.x;
  camera.instance.rotation.y = camera.rotation.y;


  // renderer.render(scene, camera);
  effectComposer.render();
  window.requestAnimationFrame(tick);
};

tick();
