'use strict';

Physijs.scripts.worker = '../js/physijs_worker.js';
//Physijs.scripts.ammo = '../js/ammo.js';

function setupScene() {
    scene = new Physijs.Scene;

    //Main camera
    camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.5,
        1000
    );
    camera.position.set(0, 60, 150);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    //Crosshair
    crosshair1 = new THREE.Mesh(
        new THREE.PlaneGeometry(5, 0.15),
        new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    crosshair1.position.set(0, 0, -20);
    crosshair2 = crosshair1.clone(true);
    crosshair2.rotation.z = Math.PI / 2;

    //Minimap
    mapCamera = new THREE.OrthographicCamera(
        window.innerWidth / -4,		// Left
        window.innerWidth / 4,		// Right
        window.innerHeight / 4,		// Top
        window.innerHeight / -4,	// Bottom
        -100,            			// Near
        1000 );           			// Far
    mapCamera.up = new THREE.Vector3(0,0,-1);
    mapCamera.lookAt( new THREE.Vector3(0,-1,0) );
    mapCamera.zoom = 100;
    scene.add(mapCamera);

    //Add ambient light
    let ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
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

    // //Add point light from right
    // let rightLight = new THREE.PointLight(0xffaaff, 0.5);
    // rightLight.position.set(60, 80, 110);
    // rightLight.castShadow = true;
    // scene.add(rightLight);
    // rightLight.shadow.mapSize.width = 512;  // default
    // rightLight.shadow.mapSize.height = 512; // default
    // rightLight.shadow.camera.near = 0.5;    // default
    // rightLight.shadow.camera.far = 500;     // default
    //
    // //Add point light from left
    // let leftLight = new THREE.PointLight(0xffaaff, 0.5);
    // leftLight.position.set(-60, 80, 110);
    // leftLight.castShadow = true;
    // scene.add(leftLight);
    // leftLight.shadow.mapSize.width = 512;  // default
    // leftLight.shadow.mapSize.height = 512; // default
    // leftLight.shadow.camera.near = 0.5;    // default
    // leftLight.shadow.camera.far = 500;     // default

    //Add point light from directly above
    let topLight = new THREE.PointLight(0xffaaff, 0.3);
    topLight.position.set(0, 100, 0);
    topLight.castShadow = true;
    scene.add(topLight);
    topLight.shadow.mapSize.width = 512;  // default
    topLight.shadow.mapSize.height = 512; // default
    topLight.shadow.camera.near = 0.5;    // default
    topLight.shadow.camera.far = 500;     // default

    //Add aiming laser
    laser = new THREE.ArrowHelper(new THREE.Vector3(0, 0, -200).normalize(), avatarHead, 200, 0xff0000, 0.0001, 0.0001);
    scene.add(laser);
}

function startPlaying(){
    //Show game HUD and hide preGame HUD
    document.getElementById("GameHUD").style.visibility = 'visible';
    document.getElementById("preGameHUD").style.visibility = 'hidden';

    //Theme song
    themeSound = document.getElementById("theme");
    themeSound.play();

    playing = true;

    //Create balls
    createBalls();

    //Start timer
    setupTimer();
}

function setupTimer(){
    //Timer
    document.getElementById("timeValue").textContent = gameLength;

    setTimeout( function(){
            timeLeft = gameLength;
            countdown = setInterval(function() {
                timeLeft--;
                totalScore++;
                document.getElementById("timeValue").textContent = timeLeft;
                if (timeLeft <= 0){
                    clearInterval(countdown);
                    decideOutcome();
                }
            },1000);
        },
        1000
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
    document.getElementById("playButton").onclick = startPlaying;
}

function handleKeyDown(event) {
    let keyCode = event.keyCode;
    switch (keyCode) {
        //Avatar movement
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
        //Avatar movement
        case 87: //W: FORWARD
            AvatarMoveDirection.z = 0
            break;
        case 83: //S: BACK
            AvatarMoveDirection.z = 0
            break;
        case 65: //A: LEFT
            AvatarMoveDirection.x = 0
            break;
        case 68: //D: RIGHT
            AvatarMoveDirection.x = 0
            break;
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    mapWidth = window.innerWidth/5;
    mapHeight = window.innerHeight/5;
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function resetGame(){
    //Delete current stuff on scene
    deleteBalls();
    deleteTargets();
    deleteAvatar();
    frameNumber = 0;

    //Hide outcomeHUD and show gameHUD
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

    playing = true;

    clearInterval(countdown);
    //Start timer
    startPlaying();
}

function render() {
    requestAnimationFrame(render);

    moveAvatar();
    moveLaser(mouseCoords);

    //Only run if game is currently playing
    if (playing) {

        //Target animations
        circleTargetsAnimation();

        if (frameNumber >= 60) {
            frameNumber = 0;
        }

        if (frameNumber >= 0 && frameNumber < 30) {
            moveForwardTargetsAnimation();
            moveLeftTargetsAnimation();
        }else if (frameNumber >= 30 && frameNumber < 60) {
            moveBackTargetsAnimation();
            moveRightTargetsAnimation();
        }

        if(degrees>=0 && degrees<360){
            degrees++;
        }else if(degrees>=360){
            degrees=0;
        }

        frameNumber++;

        for (let i = 0; i < 9; i++) {
            duckBoxArray[i].position.set(realDuckModelArray[i].position.x, realDuckModelArray[i].position.y, realDuckModelArray[i].position.z);
            duckBoxArray[i].__dirtyPosition = true;
        }
    }

    //Change camera view based on toggle
    if (camType == "first") { //First person
        camera.position.set(avatarHead.x, avatarHead.y, avatarHead.z);
        rayDirection = rayDirection.set(rayx, rayy, -100);
        camera.lookAt(rayDirection);

        //Add crosshair in FPS
        camera.add(crosshair1);
        camera.add(crosshair2);
        //Remove laser in FPS
        scene.remove(laser);
    } else if (camType == "third") { //Third person view
        camera.position.set(avatarHead.x, avatarHead.y + 25, avatarHead.z + 60);
        camera.lookAt(0, 0, -100);

        //Add laser in third person
        scene.add(laser);
        //Remove crosshair in third person
        camera.remove(crosshair1);
        camera.remove(crosshair2);
    }

    //Skybox rotation
    cubeMap.rotation.x += 0.005;
    cubeMap.rotation.y -= 0.005;
    cubeMap.rotation.z += 0.005;

    //Pill animation occurs when player wins all 3 levels
    if(pillplay) {
        //Plays pill animation until its in the avatar
        pill.rotation.y += 0.015;
        pill.rotation.x += 0.015;
        pill.position.y -= 0.20;
        if(pill.position.y <= 15) { //Plays crunch sound
            hitSound = document.getElementById("boom");
            hitSound.play();
            scene.remove(pill);
            pillplay = false;

            setInterval(function () {
                //Animation and Mixer Code Goes Here
                animationAction.play();
                let delta = clock.getDelta();
                mixers[0].update(delta);
            }, 0);

            //14 second delay to allow pill to drop and animation to play then player gets taken to bonus level
            setTimeout(function () {
                document.getElementById("proceedButton").style.visibility = 'hidden';
                document.getElementById("LevelPassedText").innerHTML = "Final score: " + totalScore + "<br>You qualify for the <br> bonus level !";

                document.getElementById("mainMenuButtonPassed").innerHTML = "BONUS LEVEL";
                document.getElementById("mainMenuAnchor").href = "../Bonus Level/Bonus.html"

                document.getElementById("LevelPassedHUD").style.visibility = 'visible';
            }, 5000);
        }
    }

    //Simulate physics in scene
    scene.simulate();

    //Render main scene
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);

    //Render minimap
    renderer.setViewport(window.innerWidth - mapWidth * 1.2, window.innerHeight - mapHeight * 3, mapWidth, mapHeight);
    renderer.render(scene, mapCamera);
}