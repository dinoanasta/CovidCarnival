'use strict';

Physijs.scripts.worker = '../../js/physijs_worker.js';
//Physijs.scripts.ammo = '../../js/ammo.js';

//Level Specific
let ammoCount = 10;

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
let AvatarMoveDirection = { x: 0, z: 0 };
let movementBoundaries = {leftX : -40, rightX:40, frontZ: -10, backZ: 10};
let avatarLocalPos = {x:0, z:0};

//Shooting
let ball;
let avatarHead = new THREE.Vector3();
let rayx, rayy;
let rayDirection = new THREE.Vector3();
let laser;

function setupScene() {
    scene = new Physijs.Scene;

    //Set gravity:
    //Random x gravity creates a "wind" like effect
    let xGrav = Math.random() * 40 - 20;

    scene.setGravity(new THREE.Vector3(xGrav, -9.8, 0));

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
        0.5,
        1000
    );
    camera.position.set(0, 60, 150);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    //Add ambient light
    let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    //Add point light from camera
    let camLight = new THREE.PointLight(0xffaaff, 0.5);
    camLight.position.set(0, 60, 150);
    camLight.castShadow = true;
    camera.add(camLight);
    camLight.shadow.mapSize.width = 512;  // default
    camLight.shadow.mapSize.height = 512; // default
    camLight.shadow.camera.near = 0.5;    // default
    camLight.shadow.camera.far = 500;     // default

    //Add point light from right
    let rightLight = new THREE.PointLight(0xffaaff, 0.5);
    rightLight.position.set(60, 80, 110);
    rightLight.castShadow = true;
    scene.add(rightLight);
    rightLight.shadow.mapSize.width = 512;  // default
    rightLight.shadow.mapSize.height = 512; // default
    rightLight.shadow.camera.near = 0.5;    // default
    rightLight.shadow.camera.far = 500;     // default

    //Add point light from left
    let leftLight = new THREE.PointLight(0xffaaff, 0.5);
    leftLight.position.set(-60, 80, 110);
    leftLight.castShadow = true;
    scene.add(leftLight);
    leftLight.shadow.mapSize.width = 512;  // default
    leftLight.shadow.mapSize.height = 512; // default
    leftLight.shadow.camera.near = 0.5;    // default
    leftLight.shadow.camera.far = 500;     // default

    //Add point light from directly above
    let topLight = new THREE.PointLight(0xffaaff, 0.3);
    topLight.position.set(0, 100, 0);
    topLight.castShadow = true;
    scene.add(topLight);
    topLight.shadow.mapSize.width = 512;  // default
    topLight.shadow.mapSize.height = 512; // default
    topLight.shadow.camera.near = 0.5;    // default
    topLight.shadow.camera.far = 500;     // default

    //Add laser like aiming helper
    laser = new THREE.ArrowHelper(new THREE.Vector3(0,0,-50), avatarHead,30, 0xff0000, 0, 0 );
    scene.add( laser );

    //CubeMap
    var textureURLs = [  // URLs of the six faces of the cube map
        // right, left, top, bottom, front, back
        "../../Resources/CubeMaps/red/bkg3_right1.png",   // Note:  The order in which
        "../../Resources/CubeMaps/red/bkg3_left2.png",   //   the images are listed is
        "../../Resources/CubeMaps/red/bkg3_top3.png",   //   important!
        "../../Resources/CubeMaps/red/bkg3_bottom4.png",
        "../../Resources/CubeMaps/red/bkg3_front5.png",
        "../../Resources/CubeMaps/red/bkg3_back6.png"
    ];
    var materials = [];
    for (var i = 0; i < 6; i++) {
        var texture = new THREE.TextureLoader().load( textureURLs[i] );
        materials.push( new THREE.MeshBasicMaterial( {
            color: "white",  // Color will be multiplied by texture color.
            side: THREE.BackSide,  // IMPORTANT: To see the inside of the cube, back faces must be rendered!
            map: texture
        } ) );

    }
    cubeMap = new THREE.Mesh(
        new THREE.BoxGeometry(1000,1000,1000), materials );
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
        //Avatar
        case 87: //W: FORWARD
            AvatarMoveDirection.z = -1
            break;
        case 83: //S: BACK
            AvatarMoveDirection.z = 1
            break;
        case 65: //A: LEFT
            AvatarMoveDirection.x = -1
            break;
        case 68: //: RIGHT
            AvatarMoveDirection.x = 1
            break;
    }

}

function handleKeyUp(event){
    let keyCode = event.keyCode;
    switch(keyCode){
        //Avatar
        case 87: //↑: FORWARD
            AvatarMoveDirection.z = 0
            break;
        case 83: //↓: BACK
            AvatarMoveDirection.z = 0
            break;
        case 65: //←: LEFT
            AvatarMoveDirection.x = 0
            break;
        case 68: //→: RIGHT
            AvatarMoveDirection.x = 0
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
//
// function animate(){
//     requestAnimationFrame(animate);
//     moveAvatar();
//     moveLaser(mouseCoords);
//     render();
// }
//
// function render(){
//      scene.simulate();
//     renderer.render( scene, camera);
// }

function render() {
    requestAnimationFrame(render);

    moveAvatar();
    moveLaser(mouseCoords);


    scene.simulate();
    renderer.render( scene, camera);
}