// import * as THREE from 'three/build/three.module.js'
// import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
// import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import {GLTFLoader} from './three.js-master/three.js-master/examples/jsm/loaders/GLTFLoader.js'

// import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';


// import gsap from "./node_modules/gsap/index.js"
// console.log(gsap);

import * as THREE from "three";
import "./sass/main.scss"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./assets/iphone.glb"
import "./assets/ink.mp4"
import "./assets/section5img.png"
import "./assets/battery.jpg"




gsap.registerPlugin(ScrollTrigger);

const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene()

const renderer = new THREE.WebGL1Renderer({
  canvas : canvas,
  alpha : true
})

const loader = new GLTFLoader()
loader.load('iphone.glb' , function(glb){
  console.log(glb)

  // scroll Trigger functions
  let t1 = gsap.timeline({
    scrollTrigger :{
      scrub : 1,
      trigger : ".webgl",
      endTrigger : "#fifthsection",
      start : "top top",
      end : "bottom bottom",
      markers : true,

    }
  })

  t1.fromTo(glb.scene.children[0].position,{ y : 10}, {   y : 0,})
    .to(glb.scene.children[0].rotation, { z : 0.8})
    .to(glb.scene.children[0].rotation, { z : 3})
    .to(glb.scene.children[0].rotation, { y : 1.58})
    .to(glb.scene.children[0].position, { z : 1.5})
    .to(glb.scene.children[0].rotation, { y : 0, z : 0})
    .to(glb.scene.children[0].position, { z:1 , x:1.2})
    .to(glb.scene.children[0].rotation, { y: 6.3 })
    .to(glb.scene.children[0].position, { x: -1.2 })
    .to(glb.scene.children[0].rotation, { X:-2, y:0})

  

  const root = glb.scene;
  root.scale.set(1 , 1 , 1);
  scene.add(root);
}, function(xhr){
  console.log((xhr.loaded/xhr.toal * 100) + "% loaded")
}, function(error){
  console.log("An error occurred")
})

// Get lighting

const light = new THREE.DirectionalLight(0x9bb5ce , 3)
light.position.set(2,2,5)
scene.add(light)


// const geometry = new THREE.BoxGeometry(1,1,1)
// const material = new THREE.MeshBasicMaterial({
//   color : 'red'
// })

// const boxMesh = new THREE.Mesh(geometry,material)
// scene.add(boxMesh)
// Boiler Plate Code

const sizes = {
  width : window.innerWidth,
  height : window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1 , 100)

camera.position.set(0,0,2);

// const controls = new OrbitControls(camera , renderer.domElement);
// controls.update();
scene.add(camera)




renderer.setSize(sizes.width , sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
renderer.shadowMap.enabled = true
renderer.gammaOutput = true
// renderer.render(scene, camera)

function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
}
animate();






// glb.scene.children[0]