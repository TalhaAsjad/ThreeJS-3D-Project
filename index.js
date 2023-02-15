import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from "https://unpkg.com/three@0.112/examples/jsm/controls/OrbitControls.js";


// var scene = new THREE.Scene();

// var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
// camera.position.z = 5;

// var renderer = new THREE.WebGLRenderer({antialias: true});
// renderer.setClearColor("#e5e5e5");
// renderer.setSize(window.innerWidth, window.innerHeight);

// document.body.appendChild(renderer.domElement)

// window.addEventListener('resize', () => {
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix(); 
// })


// var geometry = new THREE.BoxGeometry(1,1,1);
// const material = new THREE.MeshLambertMaterial({color: 0xFFCC00});
// var mesh = new THREE.Mesh(geometry, material);

// // mesh.position.set(2,2,1)
// // mesh.rotation.set(45,0,0)

// scene.add(mesh);

// var light = new THREE.PointLight(0xFFFFFF, 1, 500);
// light.position.set(10,0,25);
// scene.add(light);

// var render = function(){
//     requestAnimationFrame(render);

//     mesh.rotation.x += 0.01;
//     mesh.rotation.y += 0.01;


//  renderer.render(scene, camera);
// }

// render();



// ********************************************************************************************

// Loading Object

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth/innerHeight,0.1,1000);

var light = new THREE.HemisphereLight(0xffffff, 0x000000, 2);
light.position.set(2,1,0.4);
scene.add(light);

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor("#0000FF");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); 

scene.background = new THREE.Color(0x0000FF);  

camera.position.set(0,1.5,1);

// camera.lookAt(0,1,0);

// camera.position.set(0,2.5,1.1);

// const controls = new OrbitControls( camera, renderer.domElement );
// controls.enablePan = false;

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix(); 
})

let gui = new dat.GUI();
const options = {
    'Cuff': 0xF0F0F0,
    'Hoddie': 0x00000,
    'Outside': null
}

const clickObjects = ['Object_16','Object_12','Object_7'];



const loader = new GLTFLoader();

var sceneObj;

loader.load("./assets/Hoddiemodel/scene.gltf", function(gltf){
    
    sceneObj = gltf.scene;

    scene.add(sceneObj);
    renderer.render(scene, camera);

    

    // sceneObj.traverse(function(child) {

    //     if ( child.isMesh ) {

    //         // console.log(child);

    //     }
    // });

  

    console.log(sceneObj.children[0].children[0].children[0].children[0].children[0].children);

        // console.log(sceneObj.children[0].children[0].children[0].children[0].children[0].children[5]);
        // console.log(sceneObj.getObjectByName('Object_5'));

        sceneObj.getObjectByName('Object_15').material.color.setHex(0xF00F0F);
        scene.add(sceneObj);
        renderer.render(scene, camera);

        // sceneObj.getObjectByName('Object_16').material.color.setHex(0x00FF00);



    // console.log(sceneObj);

  

    // scene.add(sceneObj);
    // renderer.render(scene, camera);


    // animate();

   let clickName = sceneObj.children[0].children[0].children[0].children[0].children[0].children[5].name;

   const domEvents = new THREEx.DomEvents(camera, renderer.domElement)


//     domEvents.addEventListener(sceneObj.getObjectByName('Object_16'), 'click', event=>{
        
//     // gui = new dat.GUI();
//      gui.addColor(options, 'Cuff')
//     //  .onChange(function(e) {
//     //     sceneObj.getObjectByName('Object_16').material.color.setHex(e);
//     //     scene.add(sceneObj);
//     //     renderer.render(scene, camera);
//     // });
// });


    // domEvents.addEventListener(sceneObj.getObjectByName('Object_12'), 'click', event=>{
    //     // debugger;
    //     // gui.destroy();
    //     // gui = new dat.GUI();
    //     gui.addColor(options, 'Hoddie');

    //     // const gui = new dat.GUI();
    // });

    // domEvents.addEventListener(sceneObj.getObjectByName('Object_7'), 'click', event=>{
    //     // debugger;
    //     // gui.destroy();
    //     // gui = new dat.GUI();
    //     // gui.addColor(options, 'Hoddie');
    //     console.log('zip');

    //     // const gui = new dat.GUI();
    // });



    // domEvents.addEventListener(sceneObj, 'click', event=>{
    //     if(sceneObj.getObjectByName() === undefined){
    //         console.log('undefined');
    //     // gui.destroy();

    //     };
    //     // debugger;
    //     // gui = new dat.GUI();
    //     // console.log('close toggle');    
    //     // const gui = new dat.GUI();
    // });




    // domEvents.addEventListener(sceneObj.getObjectByName('Object_12'), 'click', event=>{
        
    //    });


})





function animate(){
    requestAnimationFrame(animate);
    sceneObj.rotation.y += 0.01;
    // controls.update();
    renderer.render(scene, camera);
}

// animate();



