function setLevel(lvl) {
    switch (lvl) {
        case "1": //Level 1
            sign = signs[Math.floor(Math.random() * 2)];

            //Level 1 game length, ammo count and goal
            ammoCount = 10;
            goal = 3;
            gameLength = 30;

            //Level 1 materials
            primaryStallMaterial = "neontexture1.jpg";
            secondaryBarrierMaterial = "greenfluid2.jpg";
            ballMaterial = "redgreenliquid.jpg";

            //Light blue galaxy
            cubemapURLs = [
                // right, left, top, bottom, front, back
                "../../Resources/CubeMaps/lightblue/right.png",
                "../../Resources/CubeMaps/lightblue/left.png",
                "../../Resources/CubeMaps/lightblue/top.png",
                "../../Resources/CubeMaps/lightblue/bottom.png",
                "../../Resources/CubeMaps/lightblue/front.png",
                "../../Resources/CubeMaps/lightblue/back.png"
            ];

            //Level 1 gravity
            maxGrav = 40;
            minGrav = 20;
            xGrav = sign * ((Math.random() * (maxGrav - minGrav)) + minGrav);
            yGrav = -10;
            scene.setGravity(new THREE.Vector3(xGrav, yGrav, 0));

            break;

        case "2": //Level 2
            sign = signs[Math.floor(Math.random() * 2)];

            ammoCount = 10;
            goal = 5;
            gameLength = 30;

            primaryStallMaterial = "greenfabric.jpg";
            secondaryBarrierMaterial = "blueleather.jpg";
            ballMaterial = "fractal.jpg";

            //Blue galaxy
            cubemapURLs = [
            //     right, left, top, bottom, front, back
                "../../Resources/CubeMaps/blue/right.png",
                "../../Resources/CubeMaps/blue/left.png",
                "../../Resources/CubeMaps/blue/top.png",
                "../../Resources/CubeMaps/blue/bottom.png",
                "../../Resources/CubeMaps/blue/front.png",
                "../../Resources/CubeMaps/blue/back.png"
            ];

            //Level 2 gravity
            maxGrav = 50;
            minGrav = 30;
            xGrav = sign * ((Math.random() * (maxGrav - minGrav)) + minGrav);
            yGrav = -30;
            scene.setGravity(new THREE.Vector3(xGrav, yGrav, 0));

            break;
        case "3":
            sign = signs[Math.floor(Math.random() * 2)];

            ammoCount = 10;
            goal = 7;
            gameLength = 30;

            primaryStallMaterial = "tealtexture.jpg";
            secondaryBarrierMaterial = "redhex.jpg";
            ballMaterial = "trippyred.jpg"

            //Red galaxy
            cubemapURLs = [
                // right, left, top, bottom, front, back
                "../../Resources/CubeMaps/red/bkg3_right1.png",
                "../../Resources/CubeMaps/red/bkg3_left2.png",
                "../../Resources/CubeMaps/red/bkg3_top3.png",
                "../../Resources/CubeMaps/red/bkg3_bottom4.png",
                "../../Resources/CubeMaps/red/bkg3_front5.png",
                "../../Resources/CubeMaps/red/bkg3_back6.png"
            ];

            //Level 3 gravity
            maxGrav = 60;
            minGrav = 40;
            xGrav = sign * ((Math.random() * (maxGrav - minGrav)) + minGrav);
            yGrav = -50;
            scene.setGravity(new THREE.Vector3(xGrav, yGrav, 0));

            break;
    }

    //Level specific gravity variables
    if (xGrav > 0) {
        xDir = "right";
    } else if (xGrav < 0) {
        xDir = "left";
    }

    if (minGrav < Math.abs(xGrav) && Math.abs(xGrav) < minGrav+6) {
        xStrength = "weak";
    } else if (minGrav+6 < Math.abs(xGrav) && Math.abs(xGrav) < maxGrav-6) {
        xStrength = "average";
    } else if (maxGrav-6 < Math.abs(xGrav) && Math.abs(xGrav) < maxGrav) {
        xStrength = "strong";
    }
    console.log(xGrav, xDir, xStrength);


    document.getElementById('windStrength').innerHTML = xStrength;
    windElement = document.getElementById("windIcon");
    if (xDir == "right") {
        arrowSource = '../../Resources/Textures/Razeen/arrow.png';
    } else if (xDir == "left") {
        arrowSource = '../../Resources/Textures/Razeen/arrowleft.png';
    }

    windElement.setAttribute('src', arrowSource);

    //Level specific skybox
    var materials = [];
    for (var i = 0; i < 6; i++) {
        var texture = textureLoader.load(cubemapURLs[i]);
        materials.push(new THREE.MeshBasicMaterial({
            color: "white",  // Color will be multiplied by texture color.
            side: THREE.BackSide,  // IMPORTANT: To see the inside of the cube, back faces must be rendered!
            map: texture
        }));

    }
    cubeMap = new THREE.Mesh(
        new THREE.BoxGeometry(1000, 1000, 1000), materials);
    scene.add(cubeMap);


    //Level specific HUD displays
    document.getElementById("levelValue").textContent = level;
    document.getElementById("ballCountValue").textContent = ammoCount;
    document.getElementById("timeValue").textContent = gameLength;
    document.getElementById("goalValue").textContent = goal;
}

function decideOutcome(){
    playing = false;
    clearInterval(countdown);

    document.getElementById("GameHUD").style.visibility = 'hidden';

    if(score>=goal){
        //Animation Timer:
        setTimeout(function () {
            setInterval(function () {
                //Animation and Mixer Code Goes Here
                animationAction.play();
                let delta = clock.getDelta();
                mixers[0].update(delta);
                console.log("playing");
            },0);
        },200);

        setTimeout(function () {
            document.getElementById("LevelPassedHUD").style.visibility = 'visible';

            //Loads prize into prizes 3D object. Not sure how to display this in environment though
            loader.load("../../Models/New Models/pickle_rick/scene.gltf", function (object) {

                object.scene.traverse( function( object ) {
                    if ( object.isMesh ) {
                        object.castShadow = true;
                    }
                } );
                let x = 0;
                prizeNode= object.scene.children[0];


                prizeNode.position.set(x, 0, 80);
                prizeNode.scale.set(3, 3, 3);
                x+= 40;
                prizes.add(prizeNode);

            })
            if(level == "1") {
                document.getElementById("LevelPassedText").innerHTML = "You win level 1 ! <br> Proceed to level 2?";
                nextLevel = "2";
            }else if(level == "2"){
                document.getElementById("LevelPassedText").innerHTML = "You win level 2 ! <br> Proceed to level 3?";
                nextLevel = "3";
            }else if(level == "3"){
                document.getElementById("LevelPassedText").innerHTML = "You win level 3 ! <br> Return to main menu?";
                document.getElementById("proceedButton").style.visibility = 'hidden';
            }
            level = nextLevel;

        },5000);

    }else{
        if(ammoCount - numBallsShot <= 0){
            document.getElementById("LevelFailedText").innerHTML = "Out of balls <br> You lose level " + level + " ! <br> Restart ?" ;
            document.getElementById("LevelFailedHUD").style.visibility = 'visible';
        }else{
            document.getElementById("LevelFailedText").innerHTML = "Time up <br> You lose level " + level + " ! <br> Restart ?" ;
            document.getElementById("LevelFailedHUD").style.visibility = 'visible';
        }
    }
}
