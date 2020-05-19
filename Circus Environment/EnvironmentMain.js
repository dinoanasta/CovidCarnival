Physijs.scripts.worker =  '../js/physijs_worker.js';
Physijs.scripts.ammo = '../js/ammo.js';

//Scene Variables
let light, scene, camera, ambientLight;
let renderer;
let controls;
var frameNumber = 0;


//EnvironmentPlatform
let planet;
let world = new THREE.Object3D();

//Text Variable
let text;

//Barrier Variables used in EnvironmentPlatform js
let wholeBarrier;
let barrier1, barrier2, barrier3, barrier4;
let tbarrier1, tbarrier2, tbarrier3, tbarrier4;
let cover1, cover2, cover3, cover4;
let cylinder1, cylinder2,cylinder3,cylinder4;

//Loaders
var textureLoader = new THREE.TextureLoader();
var loader = new THREE.GLTFLoader();
var textLoader = new THREE.FontLoader();


//Moon stall Variables from Moonstall and stall js files
let moonStall, moon;

//Moon stall
let moonStall, moon, text;

let stallHolder = new THREE.Group();

function setupScene(){ //Sets up camera, scene, physics engine, ligts, and orbit controls
    scene = new Physijs.Scene;
    scene.setGravity(new THREE.Vector3(0,-10,0));

    //Creation of camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth/window.innerHeight,
        0.1,
        10000 );

    //position of camera in 3D space
    camera.position.x = 0;
    camera.position.y = 100;
    camera.position.z = 150;
    // camera.lookAt(0,130,100);

    // A light shining from the direction of the camera which moves with the camera.
    light = new THREE.DirectionalLight(0xFFFFFF,0.6);
    light.position.set(0,0,1);
    camera.add(light);
    scene.add(camera);

    //Add ambient light
    ambientLight = new THREE.AmbientLight(0xE6E686);
    scene.add(ambientLight);

    //Creates the controls and imposes restriction for how the player can navigate the world
    controls = new THREE.OrbitControls(camera,renderer.domElement);
    controls.maxDistance = 3000;
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = 3*Math.PI / 4;
    controls.mouseButtons = {
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.ROTATE
    }

    var textureURLs = [  // URLs of the six faces of the cubeMap map

        "../Resources/CubeMaps/red/bkg1_right1.png",
        "../Resources/CubeMaps/red/bkg1_left2.png",
        "../Resources/CubeMaps/red/bkg1_top3.png",
        "../Resources/CubeMaps/red/bkg1_bottom4.png",
        "../Resources/CubeMaps/red/bkg1_front5.png",
        "../Resources/CubeMaps/red/bkg1_back6.png"
    ];
    var materials = [];

    for (var i = 0; i < 6; i++) {
        var texture = new THREE.TextureLoader().load( textureURLs[i] ); //Loads each of the faces of the cubemap
        materials.push( new THREE.MeshBasicMaterial( {
            color: "white",
            side: THREE.DoubleSide,

            map: texture
        } ) );

    }
    cubeMap = new THREE.Mesh( new THREE.CubeGeometry(5000,5000,5000),materials ); // creates the cubemap using a cube geometry and the added faces
    scene.add(cubeMap); //adds cubemap to the world

}

//Ray Caster Variables
var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();

function doMouseDown(event) {

    if(event.button == 0){
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1; //gets the mouse co-oridnates and converts it to clip-coordinates
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // update the picking ray with the camera and mouse position
        raycaster.setFromCamera(mouse, camera);

        let intersects = raycaster.intersectObjects(scene.children);

        if (intersects[0].object == moonStall) { //check if the raycaster(mouse) click intersects with game stalls and takes player to level
            document.getElementById("loadGame");
            window.location.href = "../Shoot/Level1/Phys.html";
        }
    }
}

function doMouseUp(event) {
    console.log("lifted");
}

//Updates the movement of objects in each frame of animation
function updateFrame() {
    planet.rotation.x += 0.1;
    planet.rotation.y += 0.1;

    // planet2.rotation.x += 0.06;
    // planet2.rotation.y += 0.06;
}

//Animates the entire scene
function animate () {
    frameNumber++;
    updateFrame();

    if (frameNumber >= 30) {
        frameNumber = 0;
    } //sets frame number to 0 so that animation movements can begin again

    if (frameNumber >= 0 && frameNumber < 15) { //Moves the cylinders in the various barriers in their respective directions

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
        //Reverses the movement of the cylinders in the various barriers from the previous if statement

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


    scene.simulate(); //Runs the scene
    moon.rotation.y += 0.01; //Rotates the moon atop the Moon stall

    scene.simulate();
    moon.rotation.y += 0.01;
    //text.rotation.y += 0.01;

    requestAnimationFrame( animate );
    controls.update(); //Updates the orbit controls
    renderer.render( scene, camera ); //Renders the scene
};