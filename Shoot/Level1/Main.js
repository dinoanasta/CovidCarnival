'use strict';

Physijs.scripts.worker = '../../js/physijs_worker.js';
//Physijs.scripts.ammo = '../../js/ammo.js';

//HUD
let HUD, arrowSource;
let windElement;

//FrameRate
let frameNumber = 0;

//Animation Mixer
let mixers = [];
let mixer;
let avatarAnimation;
let animationAction;

//Clock For Avatar Animation
let clock = new THREE.Clock();

//Prize Models
let prizes = new THREE.Object3D();
let prizeNode;

//Levels
let level = "1";
let nextLevel;
let ammoCount; //Num of balls
let score = 0;
let goal; //How many targets they have to hit to win
let gameLength; //How long the game lasts

let cubemapURLs;
let primaryStallMaterial;
let secondaryBarrierMaterial;
let ballMaterial;

//Scene and setup
let playing = true;
let cubeMap;
let renderer, scene, camera, box, controls;
let pos = new THREE.Vector3();
let shootSound;
let hitSound;
let themeSound;
let textureLoader = new THREE.TextureLoader();
let loader = new THREE.GLTFLoader();
let camType = "third";
let countdown;
let timeLeft;

//Mouse Coordinates and raycaster
let mouseCoords = new THREE.Vector2();
let raycaster = new THREE.Raycaster();

//Gravity variables
let xGrav, xDir, xStrength, maxGrav, minGrav, sign;
let yGrav;
let signs = [1, -1];

//Avatar
let avatar;
let avatarPosition = new THREE.Vector3();
let AvatarMoveDirection = { x: 0, z: 0 };
let movementBoundaries = { leftX: -38, rightX: 38, frontZ: -10, backZ: 10 };
let avatarLocalPos = { x: 0, z: 0 };

//Shooting
let beenHit = false;
let ballsArray = [];
let shotBalls = [];
let thisBall
let ball;
let numBallsShot = 0;
let avatarHead = new THREE.Vector3();
let rayx, rayy;
let rayDirection = new THREE.Vector3();
let laser;

// Duck
var duckBox;
var realDuckModel;
var duckCoordinates;
var realDuckModelArray = [];
var duckBoxArray = [];

//minimap
var mapCamera;
var w = window.innerWidth, h = window.innerHeight;

function setupScene() {
    scene = new Physijs.Scene;

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

    mapCamera = new THREE.OrthographicCamera(
        window.innerWidth / -2,		// Left
        window.innerWidth / 2,		// Right
        window.innerHeight / 2,		// Top
        window.innerHeight / -2,	// Bottom
        -5000,            			// Near
        10000 );           			// Far
    mapCamera.up = new THREE.Vector3(0,0,-1);
    mapCamera.lookAt( new THREE.Vector3(0,-1,0) );
    mapCamera.zoom = 5;
    scene.add(mapCamera);

    controls = new THREE.PointerLockControls( camera );
    scene.add( controls.getObject() );

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
    laser = new THREE.ArrowHelper(new THREE.Vector3(0, 0, -200).normalize(), avatarHead, 200, 0xff0000, 0.0001, 0.0001);
    scene.add(laser);

    //Timer
    document.getElementById("timeValue").textContent = gameLength;
    setTimeout( function(){
            timeLeft = gameLength;
            countdown = setInterval(function() {
                timeLeft--;
                document.getElementById("timeValue").textContent = timeLeft;
                if (timeLeft <= 0){
                    clearInterval();
                    decideOutcome();
                }
            },1000);
        },
        1500
    );
}

function setupEventHandlers() {
    window.addEventListener('keydown', handleKeyDown, false);
    window.addEventListener('keyup', handleKeyUp, false);
    window.addEventListener('mousedown', onMouseDown, false);
    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);
    document.getElementById("restartButton").onclick = resetGame;
    document.getElementById("proceedButton").onclick = resetGame;
}

function handleKeyDown(event) {
    let keyCode = event.keyCode;
    switch (keyCode) {
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
        case 68: //D: RIGHT
            AvatarMoveDirection.x = 1
            break;
        case 86: //V: Change camera view
            if (camType == "first") {
                camType = "third";
            } else if (camType == "third") {
                camType = "first";
            }
    }
}

function handleKeyUp(event) {
    let keyCode = event.keyCode;
    switch (keyCode) {
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
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function resetGame(){
    //Delete current stuff on scene
    deleteBalls();
    deleteTargets();
    deleteAvatar();
    clearInterval(countdown);
    frameNumber = 0;

    document.getElementById("LevelPassedHUD").style.visibility = 'hidden';
    document.getElementById("LevelFailedHUD").style.visibility = 'hidden';
    document.getElementById("GameHUD").style.visibility = 'visible';
    document.getElementById("scoreValue").textContent = score;

    //Setup scene and graphics
    setupScene();

    //Set level
    setLevel(level);

    //Create targets
    createTargets();
    configureTargetCollisions();

    //Setup stall
    createStallPlatform();

    //Create balls
    createBalls();

    //Setup astronaut
    createAvatar();

    // console.clear();
    playing = true;
}

function render() {
    requestAnimationFrame(render);

    moveAvatar();
    moveLaser(mouseCoords);

    if(playing){
        //Duck rotations
        realDuckModelArray.forEach(element => element.rotation.y+=0.05);
        realDuckModelArray.forEach(element => element.rotation.z+=0.05);

        //frameNumber animations...
        if (frameNumber >= 60) {
            frameNumber = 0;
        }
        if (frameNumber >= 0 && frameNumber < 30) {
            //duck.rotation.y+=0.1;
            //realDuckModel.rotation.y+=0.1;
            //realDuckModel.position.z+=5;
            //duck.position.z+=30;
            realDuckModelArray[0].position.z += 5;

            realDuckModelArray[1].position.z += 2;
            realDuckModelArray[2].position.z += 2;

            realDuckModelArray[3].position.z += 7;
            realDuckModelArray[6].position.z += 7;
        } else if (frameNumber >= 30 && frameNumber < 60) {
            //duck.rotation.y-=0.1;
            //realDuckModel.rotation.y-=0.1;
            //realDuckModel.position.z-=5;
            //realDuckModel.position.y-=1;
            //duck.position.z-=30;
            realDuckModelArray[0].position.z -= 5;

            realDuckModelArray[1].position.z -= 2;
            realDuckModelArray[2].position.z -= 2;

            realDuckModelArray[3].position.z -= 7;
            realDuckModelArray[6].position.z -= 7;
        }
        //rotationRealDucks.rotation.y+=0.1;

        for(let i=0; i<9;i++){
            duckBoxArray[i].position.set(realDuckModelArray[i].position.x, realDuckModelArray[i].position.y, realDuckModelArray[i].position.z);
            duckBoxArray[i].__dirtyPosition = true;
        }
    }
    frameNumber++;

    if (camType == "first") {
        //First person
        camera.position.set(avatarHead.x, avatarHead.y, avatarHead.z);
        rayDirection = rayDirection.set(rayx,rayy-40, -100);
        camera.lookAt(rayDirection);
        scene.remove(laser);
    } else if (camType == "third") {
        //Third person
        camera.position.set(avatarHead.x, avatarHead.y + 25, avatarHead.z + 60);
        camera.lookAt(0, 0, -100);
        scene.add(laser);
    }

    scene.simulate();
    //renderer.render(scene, camera);

    renderer.setViewport( 0, 0, w, h );
    renderer.render( scene, camera );
    //renderer.clear();

    // minimap (overhead orthogonal camera)
    //  lower_left_x, lower_left_y, viewport_width, viewport_height
    var mapWidth = 600, mapHeight = 250;
    renderer.setViewport( -80, h - mapHeight -20, mapWidth, mapHeight );
    renderer.render( scene, mapCamera );
}