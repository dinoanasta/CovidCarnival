'use strict';

Physijs.scripts.worker = '../js/physijs_worker.js';
Physijs.scripts.ammo = '../js/ammo.js';

//Scene and setup
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let cubeMap;

let renderer, scene, camera, box;

let pos = new THREE.Vector3();

//Mouse Coordinates and raycaster
let mouseCoords = new THREE.Vector2(),
    raycaster = new THREE.Raycaster();

//Gravity variables
let xDir, xStrength;

//Avatar
let avatar;
let AvatarMoveDirection = { left: 0, right: 0, forward: 0, back: 0 };

//Shooting
let avatarHead = new THREE.Vector3();
let rayx, rayy;
let rayDirection = new THREE.Vector3();

let laser;

function setupScene() {
    scene = new Physijs.Scene;

    //Gravity:
    let xGrav = Math.random() * 40 - 20;

    scene.setGravity = new THREE.Vector3(xGrav, -10, 0);

    if (xGrav > 0) {
        xDir = "right";
    } else if (xGrav < 0) {
        xDir = "left";
    }

    if (Math.abs(xGrav) >= 14) {
        xStrength = "strong";
    } else if (Math.abs(xGrav) <= 6) {
        xStrength = "weak";
    } else if (Math.abs(xGrav) > 6 && Math.abs(xGrav) < 14) {
        xStrength = "average";
    }
    console.log(xGrav, xDir, xStrength);

    //Add camera
    camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.2,
        10000
    );
    camera.position.set(0, 60, 150);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    //Add ambient light
    let ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    //Add directional light from camera
    let dirLight = new THREE.DirectionalLight(0xffaaff, 1);
    dirLight.castShadow = true;
    camera.add(dirLight);

    laser = new THREE.ArrowHelper(new THREE.Vector3(0,0,-50), avatarHead,30, 0xff0000, 0, 0 );
    scene.add( laser );

    //CubeMap
    var textureURLs = [  // URLs of the six faces of the cube map
        // right, left, top, bottom, front, back
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
            color: "white",  // Color will be multiplied by texture color.
            side: THREE.DoubleSide,  // IMPORTANT: To see the inside of the cube, back faces must be rendered!
            map: texture
        } ) );

    }

    cubeMap = new THREE.Mesh( new THREE.BoxGeometry(10000,10000,10000),
        materials );
    scene.add(cubeMap);
}


function setupEventHandlers(){
    window.addEventListener( 'keydown', handleKeyDown, false);
    window.addEventListener( 'keyup', handleKeyUp, false);
    window.addEventListener('mousedown', onMouseDown, false);
    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener( 'resize', onWindowResize, false );
}

function handleKeyDown(event){
        let keyCode = event.keyCode;
        switch(keyCode){
            //Ball
            case 87: //W: FORWARD
                moveDirection.forward = 1
                break;
            case 83: //S: BACK
                moveDirection.back = 1
                break;
            case 65: //A: LEFT
                moveDirection.left = 1
                break;
            case 68: //D: RIGHT
                moveDirection.right = 1
                break;

            //Avatar
            case 38: //↑: FORWARD
                AvatarMoveDirection.forward = 1
                break;
            case 40: //↓: BACK
                AvatarMoveDirection.back = 1
                break;
            case 37: //←: LEFT
                AvatarMoveDirection.left = 1
                break;
            case 39: //→: RIGHT
                AvatarMoveDirection.right = 1
                break;
        }

    }

function handleKeyUp(event){
        let keyCode = event.keyCode;
        switch(keyCode){
            //Ball
            case 87: //FORWARD
                moveDirection.forward = 0
                break;
            case 83: //BACK
                moveDirection.back = 0
                break;
            case 65: //LEFT
                moveDirection.left = 0
                break;
            case 68: //RIGHT
                moveDirection.right = 0
                break;

            //Avatar
            case 38: //↑: FORWARD
                AvatarMoveDirection.forward = 0
                break;
            case 40: //↓: BACK
                AvatarMoveDirection.back = 0
                break;
            case 37: //←: LEFT
                AvatarMoveDirection.left = 0
                break;
            case 39: //→: RIGHT
                AvatarMoveDirection.right = 0
                break;
        }
    }

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate(){

    requestAnimationFrame(animate);
    moveAvatar();
    moveLaser(mouseCoords);
    render();
}

function render(){
    renderer.render( scene, camera);
    scene.simulate();
}