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

scene.background = new THREE.Color(0x0000ff);

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
  Color: 0xf0f0f0,
};

const domEvents = new THREEx.DomEvents(camera, renderer.domElement);

const loader = new GLTFLoader();

var sceneObj;

// loader.load("./assets/Hoddiemodel/scene.gltf", function (gltf) {
loader.load("./assets/Tshirt/T-shirt.gltf", function (gltf) {
  sceneObj = gltf.scene;

  // console.log(sceneObj);

  scene.add(sceneObj);
  renderer.render(scene, camera);

  // console.log(
  //   sceneObj.children[0].children[0].children[0].children[0].children[0]
  //     .children
  // );

  sceneObj.getObjectByName("Plane_Plane008_1").material.color.setHex(0x00000);
  sceneObj.getObjectByName("Plane_Plane008_2").material.color.setHex(0xfffff);
  sceneObj.getObjectByName("Plane_Plane008_3").material.color.setHex(0xf0f0f);

  scene.add(sceneObj);
  renderer.render(scene, camera);

  gui.addColor(options, "Cuff").onChange(function (e) {
    sceneObj.getObjectByName("Plane_Plane008_2").material.color.setHex(e);
    renderer.render(scene, camera);
  });

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
      sceneObj.rotation.y -= 0.03;
    } else {
      sceneObj.rotation.y += 0.03;
    }

    renderer.render(scene, camera);
  }

  function onMouseUp(event) {
    // remove mousemove and mouseup event listeners
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }

  domEvents.addEventListener(
    sceneObj.getObjectByName("Plane_Plane008_1"),
    "click",
    function (event) {
      $("#colorPicker").trigger("click");
    }
  );

  //   $("#colorPicker").change(function () {
  //     sceneObj.getObjectByName("Plane_Plane008_1").material.color.setHex();
  //   });
});

// function animate() {
// requestAnimationFrame(animate);
// sceneObj.rotation.y += 0.01;
// // controls.update();
// renderer.render(scene, camera);
// // }

// // animate();
