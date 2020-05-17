Physijs.scripts.worker =  '../js/physijs_worker.js';
Physijs.scripts.ammo = '../js/ammo.js';

//Scene Variables
let light, scene, camera, ambientLight;
let renderer;
let controls;
var frameNumber = 0;


//EnvironmentPlatform
let planet;

//Barriers
let wholeBarrier;
let barrier1, barrier2, barrier3, barrier4;
let tbarrier1, tbarrier2, tbarrier3, tbarrier4;
let cover1, cover2, cover3, cover4;
let cylinder1, cylinder2,cylinder3,cylinder4;

//Loaders
var textureLoader = new THREE.TextureLoader();
var loader = new THREE.GLTFLoader();

//Moon stall
let stall, moon;
let stallHolder = new THREE.Object3D();

function setupScene(){
    scene = new Physijs.Scene;
    scene.setGravity(new THREE.Vector3(0,-10,0));

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth/window.innerHeight,
        0.1,
        10000 );

    camera.position.x = 0;
    camera.position.y = 100;
    camera.position.z = 150;

    // A light shining from the direction of the camera; moves with the camera.
    light = new THREE.DirectionalLight(0xFFFFFF,0.6);
    light.position.set(0,0,1);
    camera.add(light);
    scene.add(camera);

    //Add ambient light
    ambientLight = new THREE.AmbientLight(0xE6E686);
    scene.add(ambientLight)

    controls = new THREE.OrbitControls(camera,renderer.domElement);


    var textureURLs = [  // URLs of the six faces of the cubeMap map

        "../Resources/CubeMaps/red/bkg1_right1.png",   // Note:  The order in which
        "../Resources/CubeMaps/red/bkg1_left2.png",   //   the images are listed is
        "../Resources/CubeMaps/red/bkg1_top3.png",   //   important!
        "../Resources/CubeMaps/red/bkg1_bottom4.png",
        "../Resources/CubeMaps/red/bkg1_front5.png",
        "../Resources/CubeMaps/red/bkg1_back6.png"
    ];
    var materials = [];
    for (var i = 0; i < 6; i++) {
        var texture = new THREE.TextureLoader().load( textureURLs[i] );
        materials.push( new THREE.MeshBasicMaterial( {
            color: "white",
            side: THREE.DoubleSide,

            map: texture
        } ) );

    }

    cubeMap = new THREE.Mesh( new THREE.CubeGeometry(5000,5000,5000),
        materials );
    scene.add(cubeMap);
}

//Ray Caster Code
var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();

function doMouseDown(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray

    let intersects = raycaster.intersectObjects(scene.children);

    if (intersects[0] != null) {
        alert("Working");
    }
}

function updateFrame() {
    planet.rotation.x += 0.1;
    planet.rotation.y += 0.1;
}

function animate () {
    frameNumber++;
    updateFrame();

    if (frameNumber >= 30) {
        frameNumber = 0;
    }
    if (frameNumber >= 0 && frameNumber < 15) {

        barrier1.children[0].position.y += 0.5;
        barrier1.children[1].position.y -= 0.5;
        barrier1.children[2].position.y += 0.5;
        barrier1.children[3].position.y -= 0.5;

        barrier2.children[0].position.y += 0.5;
        barrier2.children[1].position.y -= 0.5;
        barrier2.children[2].position.y += 0.5;
        barrier2.children[3].position.y -= 0.5;

        barrier3.children[0].position.y += 0.5;
        barrier3.children[1].position.y -= 0.5;
        barrier3.children[2].position.y += 0.5;
        barrier3.children[3].position.y -= 0.5;

        barrier4.children[0].position.y += 0.5;
        barrier4.children[1].position.y -= 0.5;
        barrier4.children[2].position.y += 0.5;
        barrier4.children[3].position.y -= 0.5;
    }else if (frameNumber >= 15 && frameNumber < 30) {

        barrier1.children[0].position.y -= 0.5;
        barrier1.children[1].position.y += 0.5;
        barrier1.children[2].position.y -= 0.5;
        barrier1.children[3].position.y += 0.5;

        barrier2.children[0].position.y -= 0.5;
        barrier2.children[1].position.y += 0.5;
        barrier2.children[2].position.y -= 0.5;
        barrier2.children[3].position.y += 0.5;

        barrier3.children[0].position.y -= 0.5;
        barrier3.children[1].position.y += 0.5;
        barrier3.children[2].position.y -= 0.5;
        barrier3.children[3].position.y += 0.5;

        barrier4.children[0].position.y -= 0.5;
        barrier4.children[1].position.y += 0.5;
        barrier4.children[2].position.y -= 0.5;
        barrier4.children[3].position.y += 0.5;

    }

    scene.simulate();
    moon.rotation.y += 0.01;
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
};