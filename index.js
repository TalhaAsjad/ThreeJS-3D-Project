import * as THREE from "https://unpkg.com/three@0.126.1/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://unpkg.com/three@0.112/examples/jsm/controls/OrbitControls.js";

// Loading Object

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / innerHeight,
  0.1,
  1000
);

var light = new THREE.HemisphereLight(0xffffff, 0x000000, 2);
light.position.set(2, 1, 0.4);
scene.add(light);

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor("#0000FF");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.background = new THREE.Color(0xd6d6d6);

camera.position.set(0, 0, 1.5);

// camera.lookAt(0,1,0);

// camera.position.set(0,2.5,1.1);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

let gui = new dat.GUI();

const options = {
  "Body Front": 0xf0f0f0,
  "Body Back": 0xf0f0f0,
  "Right Cuff": 0xf0f0f0,
  "Left Cuff": 0xf0f0f0,
  Collar: 0xf0f0f0,
};

// gui.addColor(options, "Cuff");
// gui.addColor(options, "Collar");
// gui.addColor(options, "Body");

// gui.hide();

const domEvents = new THREEx.DomEvents(camera, renderer.domElement);

const loader = new GLTFLoader();

var sceneObj;

// loader.load("./assets/Hoddiemodel/scene.gltf", function (gltf) {
loader.load("./assets/Tshirt/test.gltf", function (gltf) {
  sceneObj = gltf.scene;

  console.log(sceneObj);

  scene.add(sceneObj);
  renderer.render(scene, camera);

  // console.log(
  //   sceneObj.children[0].children[0].children[0].children[0].children[0]
  //     .children
  // );

  sceneObj.getObjectByName("right-stitch").material.color.setHex(0x00000);
  sceneObj.getObjectByName("left-stitch").material.color.setHex(0x8300ff);
  sceneObj.getObjectByName("T-shirt_1").material.color.setHex(0x00000);
  sceneObj.getObjectByName("T-shirt_2").material.color.setHex(0xf0f0f0);
  sceneObj.getObjectByName("T-shirt_3").material.color.setHex(0xf0f0f);
  sceneObj.getObjectByName("T-shirt_4").material.color.setHex(0xff0000);
  sceneObj.getObjectByName("T-shirt_5").material.color.setHex(0xff1e);

  scene.add(sceneObj);
  renderer.render(scene, camera);

  // domEvents.addEventListener(
  //   sceneObj.getObjectByName("Plane_Plane008_1"),
  //   "click",
  //   function (event) {
  // (options, "Body").onChange(function (e) {
  //   console.log("check");
  //   sceneObj.getObjectByName("Plane_Plane008_1").material.color.setHex(e);
  //   renderer.render(scene, camera);
  // });
  // }
  // );

  gui.addColor(options, "Body Front").onChange(function (e) {
    sceneObj.getObjectByName("right-stitch").material.color.setHex(e);
    renderer.render(scene, camera);
  });

  gui.addColor(options, "Body Back").onChange(function (e) {
    sceneObj.getObjectByName("Plane_Plane008_5").material.color.setHex(e);
    renderer.render(scene, camera);
  });

  // domEvents.addEventListener(
  //   sceneObj.getObjectByName("Plane_Plane008_2"),
  //   "click",
  //   function (event) {
  gui.addColor(options, "Left Cuff").onChange(function (e) {
    sceneObj.getObjectByName("Plane_Plane008_2").material.color.setHex(e);
    renderer.render(scene, camera);
  });
  //   }
  // );

  // domEvents.addEventListener(
  //   sceneObj.getObjectByName("Plane_Plane008_3"),
  //   "click",
  //   function (event) {
  gui.addColor(options, "Right Cuff").onChange(function (e) {
    sceneObj.getObjectByName("Plane_Plane008_3").material.color.setHex(e);
    renderer.render(scene, camera);
  });
  //   }
  // );

  gui.addColor(options, "Collar").onChange(function (e) {
    sceneObj.getObjectByName("Plane_Plane008_4").material.color.setHex(e);
    renderer.render(scene, camera);
  });

  //   gui.addColor(options, "Color").onChange(function (e) {
  //     sceneObj.getObjectByName("Plane_Plane008_2").material.color.setHex(e);
  //     renderer.render(scene, camera);
  //   });
  // gui.addColor(options, "Hoddie").onChange(function (e) {
  //   sceneObj.getObjectByName("Plane_Plane008_1").material.color.setHex(e);
  //   renderer.render(scene, camera);
  // });

  let startX;

  domEvents.addEventListener(sceneObj, "mousedown", function (event) {
    // add mousemove event listener to the document
    startX = event.origDomEvent.screenX;
    document.addEventListener("mousemove", onMouseMove);
    // add mouseup event listener to the document
    document.addEventListener("mouseup", onMouseUp);
  });

  function onMouseMove(event) {
    // calculate the new element position based on the drag distance

    if (startX > event.screenX) {
      sceneObj.rotation.y -= 0.07;
    } else {
      sceneObj.rotation.y += 0.07;
    }

    renderer.render(scene, camera);
  }

  function onMouseUp(event) {
    // remove mousemove and mouseup event listeners
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }

  //   $("#colorPicker").change(function (e) {
  //     e = $(this).val();
  //     console.log(e);
  //     sceneObj.getObjectByName("Plane_Plane008_2").material.color.setHex(e);
  //     debugger;
  //     renderer.render(scene, camera);
  //   });
});

// gui.addColor(options, "Color").onChange(function (e) {
//   sceneObj.getObjectByName("Plane_Plane008_2").material.color.setHex(e);
//   renderer.render(scene, camera);
// });

// function animate() {
// requestAnimationFrame(animate);
// sceneObj.rotation.y += 0.01;
// // controls.update();
// renderer.render(scene, camera);
// // }

// // animate();
