'use strict';

Physijs.scripts.worker = '../../js/physijs_worker.js';
//Physijs.scripts.ammo = '../../js/ammo.js';

//HUD
let HUD, arrowSource;
let windElement;


//Levels
let level = "1";
let ammoCount; //Num of balls
let goal;   //How many targets they have to hit to win
let gameLength; //How long the game lasts

//Scene and setup
let cubeMap;
let renderer, scene, camera, box;
let pos = new THREE.Vector3();

//Mouse Coordinates and raycaster
let mouseCoords = new THREE.Vector2(),
    raycaster = new THREE.Raycaster();

//Gravity variables
let xGrav, xDir, xStrength,maxGrav, minGrav, sign;
let yGrav;
let signs = [1, -1];

//Avatar
let avatar;
let AvatarMoveDirection = { x: 0, z: 0 };
let movementBoundaries = {leftX : -40, rightX:40, frontZ: -10, backZ: 10};
let avatarLocalPos = {x:0, z:0};

//Shooting
let ball;
let b_count;
let avatarHead = new THREE.Vector3();
let rayx, rayy;
let rayDirection = new THREE.Vector3();
let laser;

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
    laser = new THREE.ArrowHelper(new THREE.Vector3(0,0,-200).normalize(), avatarHead,200, 0xff0000, 0.0001, 0.0001 );
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

function setLevel(lvl){
  switch (lvl){
      case "1":
          //Level 1

          sign = signs[Math.floor(Math.random() * 2)];
          console.log("Sign: " + sign);

          console.log("Level: " + level);

          ammoCount = 10;
          goal = 5;
          gameLength = 60;

          maxGrav = 40;
          minGrav = 20;

          xGrav = sign * ((Math.random()*(maxGrav-minGrav)) + minGrav);

          yGrav = -10;

          scene.setGravity(new THREE.Vector3(xGrav, yGrav, 0));

          if (xGrav > 0) {
              xDir = "right";
          } else if (xGrav < 0) {
              xDir = "left";
          }

          if (minGrav < Math.abs(xGrav) &&  Math.abs(xGrav) < 26) {
              xStrength = "weak";
          } else if (26 < Math.abs(xGrav) &&  Math.abs(xGrav) < 34) {
              xStrength = "average";1
          } else if (34 < Math.abs(xGrav) &&  Math.abs(xGrav) < maxGrav) {
              xStrength = "strong";
          }
          console.log(xGrav, xDir, xStrength);
          break;
      case "2":
          //Level 2

          sign = signs[Math.floor(Math.random() * 2)];
          console.log("Sign: " + sign);

          console.log("Level: " + level);

          ammoCount = 5;
          goal = 5;
          gameLength = 60;

          maxGrav = 40;
          minGrav = 20;

          xGrav = sign * ((Math.random()*(maxGrav-minGrav)) + minGrav);

          yGrav = -50;

          scene.setGravity(new THREE.Vector3(xGrav, yGrav, 0));

          if (xGrav > 0) {
              xDir = "right";
          } else if (xGrav < 0) {
              xDir = "left";
          }

          if (minGrav < Math.abs(xGrav) &&  Math.abs(xGrav) < 26) {
              xStrength = "weak";
          } else if (26 < Math.abs(xGrav) &&  Math.abs(xGrav) < 34) {
              xStrength = "average";1
          } else if (34 < Math.abs(xGrav) &&  Math.abs(xGrav) < maxGrav) {
              xStrength = "strong";
          }
          console.log(xGrav, xDir, xStrength);
          break;
      case "3":
          //Level 3

          sign = signs[Math.floor(Math.random() * 2)];
          console.log("Sign: " + sign);

          console.log("Level: " + level);

          ammoCount = 5;
          goal = 5;
          gameLength = 60;

          maxGrav = 40;
          minGrav = 20;

          xGrav = sign * ((Math.random()*(maxGrav-minGrav)) + minGrav);

          yGrav = -100;

          scene.setGravity(new THREE.Vector3(xGrav, yGrav, 0));

          if (xGrav > 0) {
              xDir = "right";
          } else if (xGrav < 0) {
              xDir = "left";
          }

          if (minGrav < Math.abs(xGrav) &&  Math.abs(xGrav) < 26) {
              xStrength = "weak";
          } else if (26 < Math.abs(xGrav) &&  Math.abs(xGrav) < 34) {
              xStrength = "average";1
          } else if (34 < Math.abs(xGrav) &&  Math.abs(xGrav) < maxGrav) {
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

    scene.simulate();
    renderer.render( scene, camera);
}