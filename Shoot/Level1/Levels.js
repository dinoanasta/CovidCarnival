function setLevel(lvl) {
    switch (lvl) {
        case "1": //Level 1
            sign = signs[Math.floor(Math.random() * 2)];

            //Level 1 game length, ammo count and goal
            ammoCount = 10;
            goal = 5;
            gameLength = 60;

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

            //Level 1 HUD
            var cols = document.getElementsByClassName('stats>h1');
            for(i = 0; i < cols.length; i++) {
                // cols[i].style.fontcolor("#ffff00");
                cols[i].style.color = "#ffff00";
            }

            //Level 1 gravity
            maxGrav = 40;
            minGrav = 20;
            xGrav = sign * ((Math.random() * (maxGrav - minGrav)) + minGrav);
            yGrav = -10;
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

        case "2": //Level 2
            sign = signs[Math.floor(Math.random() * 2)];

            ammoCount = 10;
            goal = 5;
            gameLength = 60;

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

            ammoCount = 5;
            goal = 3;
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

    //CubeMap
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

    document.getElementById("levelValue").innerHTML = lvl;
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

function decideOutcome(){
    playing = false;
    document.getElementById("timeValue").textContent = gameLength;
    clearInterval(countdown);

    if(ammoCount - numBallsShot <= 0){
        if(score >= goal){
            document.getElementById("GameHUD").style.visibility = 'hidden';
            document.getElementById("LevelPassedHUD").style.visibility = 'visible';
        }else{
            document.getElementById("GameHUD").style.visibility = 'hidden';
            document.getElementById("LevelFailedText").innerHTML = "Out of balls <br> You lose level " + level + " ! <br> Restart ?" ;
            document.getElementById("LevelFailedHUD").style.visibility = 'visible';
        }
    }else{
        if(score >= goal){
            document.getElementById("GameHUD").style.visibility = 'hidden';
            document.getElementById("LevelPassedHUD").style.visibility = 'visible';
        }else{
            document.getElementById("GameHUD").style.visibility = 'hidden';
            document.getElementById("LevelFailedText").innerHTML = "Time up <br> You lose level " + level + " ! <br> Restart ?" ;
            document.getElementById("LevelFailedHUD").style.visibility = 'visible';
        }
    }
}
