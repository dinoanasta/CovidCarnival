'use strict';

Physijs.scripts.worker = '../../js/physijs_worker.js';
//Physijs.scripts.ammo = '../../js/ammo.js';

//HUD
let HUD, arrowSource;
let windElement;

//FrameRate
let frameRate = 0;
//Levels
let level = "1";
let ammoCount; //Num of balls
let goal;   //How many targets they have to hit to win
let gameLength; //How long the game lasts

//Scene and setup
let cubeMap;
let renderer, scene, camera, box;
let pos = new THREE.Vector3();
let sound;
let textureLoader = new THREE.TextureLoader();
let loader = new THREE.GLTFLoader();
let camType = "third";

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
let ball;
let b_count;
let avatarHead = new THREE.Vector3();
let rayx, rayy;
let rayDirection = new THREE.Vector3();
let laser;

// Duck
// let duck;
// let duckModel;
// let duckCoordinates;
// let realDuckModelArray;
// let duckArray;

var duck;
var duckModel;
var realDuckModel;
var score = 0;

duck = new Physijs.BoxMesh(
    new THREE.BoxGeometry(7, 7, 7),
    new THREE.MeshStandardMaterial({
        opacity: 0.0001,
        transparent: true
        //map: new THREE.TextureLoader().load('../../Resources/Textures/Dino/redfoil.jpg'),
    }),
    1
);
var duckCoordinates = [
    new THREE.Vector3(0, 30, -70),    //0
    new THREE.Vector3(0, 50, -70),    //1
    new THREE.Vector3(0, 15, -70),    //2
    new THREE.Vector3(25, 30, -70),   //3
    new THREE.Vector3(25, 45, -70),   //4
    new THREE.Vector3(25, 15, -70),   //5
    new THREE.Vector3(-25, 30, -70),  //6
    new THREE.Vector3(-25, 45, -70),  //7
    new THREE.Vector3(-25, 15, -70)   //8
];

var realDuckModelArray = [
    new THREE.Mesh,
    new THREE.Mesh,
    new THREE.Mesh,
    new THREE.Mesh,
    new THREE.Mesh,
    new THREE.Mesh,
    new THREE.Mesh,
    new THREE.Mesh,
    new THREE.Mesh
];

var duckArray = [
    duck.clone(true),
    duck.clone(true),
    duck.clone(true),
    duck.clone(true),
    duck.clone(true),
    duck.clone(true),
    duck.clone(true),
    duck.clone(true),
    duck.clone(true)
];
//duck.setCcdSweptSphereRadius(3);
for (let x = 0; x < 9; x++) {
    duckArray[x].position.set(duckCoordinates[x].x, duckCoordinates[x].y, duckCoordinates[x].z);
}

// duckArray[1].position.set(duckCoordinates[1].x, duckCoordinates[1].y, duckCoordinates[1].z);
// duckArray[2].position.set(duckCoordinates[2].x, duckCoordinates[2].y, duckCoordinates[2].z);
// duckArray[3].position.set(duckCoordinates[3].x, duckCoordinates[3].y, duckCoordinates[3].z);
// duckArray[4].position.set(duckCoordinates[4].x, duckCoordinates[4].y, duckCoordinates[4].z);
// duckArray[5].position.set(duckCoordinates[5].x, duckCoordinates[5].y, duckCoordinates[5].z);
// duckArray[6].position.set(duckCoordinates[6].x, duckCoordinates[6].y, duckCoordinates[6].z);
// duckArray[7].position.set(duckCoordinates[7].x, duckCoordinates[7].y, duckCoordinates[7].z);
// duckArray[8].position.set(duckCoordinates[8].x, duckCoordinates[8].y, duckCoordinates[8].z);

//rand.castShadow = true; disabling this to debug on my machine because its kak slow :/
//rand.receiveShadow = true; disabling this to debug on my machine because its kak slow :/

loader.load(
    "../../Models/glTF/Duck.gltf",
    function (object) {
        object.scene.traverse(function (object) {
            if (object.isMesh) {
                //object.castShadow = true;
            }
        });

        duckModel = object.scene.children[0];
        // duckModel.rotation.y=Math.Pi;
        duckModel.position.set(duckArray[0].position.x, duckArray[0].position.y - 4, duckArray[0].position.z);
        duckModel.scale.set(0.05, 0.05, 0.05);

        //duckModel.castShadow = true;
        //duckModel.receiveShadow = true;
        for (let x = 0; x < 9; x++) {
            realDuckModelArray[x] = duckModel.clone(true);
            realDuckModelArray[x].position.set(duckArray[x].position.x, duckArray[x].position.y - 4, duckArray[x].position.z);
        }

    }
);

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
        var texture = new THREE.TextureLoader().load(textureURLs[i]);
        materials.push(new THREE.MeshBasicMaterial({
            color: "white",  // Color will be multiplied by texture color.
            side: THREE.BackSide,  // IMPORTANT: To see the inside of the cube, back faces must be rendered!
            map: texture
        }));

    }
    cubeMap = new THREE.Mesh(
        new THREE.BoxGeometry(1000, 1000, 1000), materials);
    scene.add(cubeMap);

    //adding a duck
    for (let x = 0; x < 9; x++) {
        scene.add(duckArray[x]);
        scene.add(realDuckModelArray[x]);
        console.log(x);
    }
    for (let x = 0; x < 9; x++) {
        duckArray[x].addEventListener('collision', function (other_object, relative_velocity, relative_rotation, contact_normal) {
            if (other_object == ball) {
                console.log("bang bang!");
                scene.remove(duckArray[x]);
                scene.remove(realDuckModelArray[x]);
                score++;
                document.getElementById("scoreValue").innerHTML = score;
            }
        });
    }
}

function setupEventHandlers() {
    window.addEventListener('keydown', handleKeyDown, false);
    window.addEventListener('keyup', handleKeyUp, false);
    window.addEventListener('mousedown', onMouseDown, false);
    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);
}

function handleKeyDown(event) {
    let keyCode = event.keyCode;
    switch (keyCode) {
        //Level
        case 49:
            level = "1";
            setLevel(level);
            break;
        case 50:
            level = "2";
            setLevel(level);
            break;
        case 51:
            level = "3";
            setLevel(level);
            break;
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

function setLevel(lvl) {
    switch (lvl) {
        case "1": //Level 1
            sign = signs[Math.floor(Math.random() * 2)];
            console.log("Sign: " + sign);

            console.log("Level: " + level);

            ammoCount = 10;
            goal = 5;
            gameLength = 60;

            maxGrav = 40;
            minGrav = 20;

            xGrav = sign * ((Math.random() * (maxGrav - minGrav)) + minGrav);

            yGrav = -10;

            scene.setGravity(new THREE.Vector3(xGrav, yGrav, 0)); //testing with no gravity...

            if (xGrav > 0) {
                xDir = "right";
            } else if (xGrav < 0) {
                xDir = "left";
            }

            if (minGrav < Math.abs(xGrav) && Math.abs(xGrav) < 26) {
                xStrength = "weak";
            } else if (26 < Math.abs(xGrav) && Math.abs(xGrav) < 34) {
                xStrength = "average";
                1
            } else if (34 < Math.abs(xGrav) && Math.abs(xGrav) < maxGrav) {
                xStrength = "strong";
            }
            console.log(xGrav, xDir, xStrength);
            break;
        case "2": //Level 2
            sign = signs[Math.floor(Math.random() * 2)];
            console.log("Sign: " + sign);

            console.log("Level: " + level);

            ammoCount = 10;
            goal = 5;
            gameLength = 60;

            maxGrav = 40;
            minGrav = 20;

            xGrav = sign * ((Math.random() * (maxGrav - minGrav)) + minGrav);

            yGrav = -50;

            scene.setGravity(new THREE.Vector3(xGrav, yGrav, 0));

            if (xGrav > 0) {
                xDir = "right";
            } else if (xGrav < 0) {
                xDir = "left";
            }

            if (minGrav < Math.abs(xGrav) && Math.abs(xGrav) < 26) {
                xStrength = "weak";
            } else if (26 < Math.abs(xGrav) && Math.abs(xGrav) < 34) {
                xStrength = "average";
                1
            } else if (34 < Math.abs(xGrav) && Math.abs(xGrav) < maxGrav) {
                xStrength = "strong";
            }
            console.log(xGrav, xDir, xStrength);
            break;
        case "3":
            sign = signs[Math.floor(Math.random() * 2)];
            console.log("Sign: " + sign);

            console.log("Level: " + level);

            ammoCount = 5;
            goal = 5;
            gameLength = 60;

            maxGrav = 40;
            minGrav = 20;

            xGrav = sign * ((Math.random() * (maxGrav - minGrav)) + minGrav);

            yGrav = -100;

            scene.setGravity(new THREE.Vector3(xGrav, yGrav, 0));

            if (xGrav > 0) {
                xDir = "right";
            } else if (xGrav < 0) {
                xDir = "left";
            }

            if (minGrav < Math.abs(xGrav) && Math.abs(xGrav) < 26) {
                xStrength = "weak";
            } else if (26 < Math.abs(xGrav) && Math.abs(xGrav) < 34) {
                xStrength = "average";
                1
            } else if (34 < Math.abs(xGrav) && Math.abs(xGrav) < maxGrav) {
                xStrength = "strong";
            }
            console.log(xGrav, xDir, xStrength);
            break;
    }

    document.getElementById("ballCountValue").innerHTML = ammoCount;
    document.getElementById('windStrength').innerHTML = xStrength;
    windElement = document.getElementById("windIcon");
    if (xDir == "right") {
        arrowSource = '../../Resources/Textures/Razeen/arrow.png';
    } else if (xDir == "left") {
        arrowSource = '../../Resources/Textures/Razeen/arrowleft.png';
    }

    windElement.setAttribute('src', arrowSource);
}

function render() {
    requestAnimationFrame(render);

    moveAvatar();
    moveLaser(mouseCoords);


    //duck animations...
    realDuckModelArray.forEach(element => element.rotation.y+=0.05);
    realDuckModelArray.forEach(element => element.rotation.z+=0.05);
    //frameRate animations...
    if (frameRate >= 60) {
        frameRate = 0;
    }
    if (frameRate >= 0 && frameRate < 30) {
        //duck.rotation.y+=0.1;
        //realDuckModel.rotation.y+=0.1;
        //realDuckModel.position.z+=5;
        //duck.position.z+=30;
        realDuckModelArray[0].position.z += 5;

        realDuckModelArray[1].position.z += 2;
        realDuckModelArray[2].position.z += 2;

        realDuckModelArray[3].position.z += 7;
        realDuckModelArray[6].position.z += 7;

    } else if (frameRate >= 30 && frameRate < 60) {
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

    duckArray[0].position.set(realDuckModelArray[0].position.x, realDuckModelArray[0].position.y + 4, realDuckModelArray[0].position.z);
    duckArray[0].__dirtyPosition = true;

    duckArray[1].position.set(realDuckModelArray[1].position.x, realDuckModelArray[1].position.y + 4, realDuckModelArray[1].position.z);
    duckArray[1].__dirtyPosition = true;

    duckArray[2].position.set(realDuckModelArray[2].position.x, realDuckModelArray[2].position.y + 4, realDuckModelArray[2].position.z);
    duckArray[2].__dirtyPosition = true;

    duckArray[3].position.set(realDuckModelArray[3].position.x, realDuckModelArray[3].position.y + 4, realDuckModelArray[3].position.z);
    duckArray[3].__dirtyPosition = true;

    duckArray[4].position.set(realDuckModelArray[4].position.x, realDuckModelArray[4].position.y + 4, realDuckModelArray[4].position.z);
    duckArray[4].__dirtyPosition = true;

    duckArray[5].position.set(realDuckModelArray[5].position.x, realDuckModelArray[5].position.y + 4, realDuckModelArray[5].position.z);
    duckArray[5].__dirtyPosition = true;

    duckArray[6].position.set(realDuckModelArray[6].position.x, realDuckModelArray[6].position.y + 4, realDuckModelArray[6].position.z);
    duckArray[6].__dirtyPosition = true;

    duckArray[7].position.set(realDuckModelArray[7].position.x, realDuckModelArray[7].position.y + 4, realDuckModelArray[7].position.z);
    duckArray[7].__dirtyPosition = true;

    duckArray[8].position.set(realDuckModelArray[8].position.x, realDuckModelArray[8].position.y + 4, realDuckModelArray[8].position.z);
    duckArray[8].__dirtyPosition = true;

    frameRate++;

    // avatarHead.set(avatarPosition.x, avatarPosition.y +25, avatarPosition.z-20);


    if (camType == "first") {
        //First person
        camera.position.set(avatarHead.x, avatarHead.y, avatarHead.z);
        rayDirection = rayDirection.set(rayx,rayy-40, -100);
        camera.lookAt(rayDirection);
        scene.remove(laser);
    } else if (camType == "third") {
        //Third person
        camera.position.set(avatarHead.x, avatarHead.y + 25, avatarHead.z + 60);
        camera.lookAt(rayDirection);
        scene.add(laser);
    }

    scene.simulate();
    renderer.render(scene, camera);
}