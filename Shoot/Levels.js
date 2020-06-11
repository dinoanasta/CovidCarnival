function setLevel(lvl) {
    switch (lvl) {
        case "1": //Level 1
            numLevel1++;

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
                //right, left, top, bottom, front, back
                "../Resources/CubeMaps/lightblue/right.png",
                "../Resources/CubeMaps/lightblue/left.png",
                "../Resources/CubeMaps/lightblue/top.png",
                "../Resources/CubeMaps/lightblue/bottom.png",
                "../Resources/CubeMaps/lightblue/front.png",
                "../Resources/CubeMaps/lightblue/back.png"
            ];

            //Level 1 gravity
            maxGrav = 40;
            minGrav = 20;
            xGrav = sign * ((Math.random() * (maxGrav - minGrav)) + minGrav);
            yGrav = -10;
            scene.setGravity(new THREE.Vector3(xGrav, yGrav, 0));

            break;

        case "2": //Level 2
            numLevel2++;

            sign = signs[Math.floor(Math.random() * 2)];

            //Level 2 game length, ammo count and goal
            ammoCount = 7;
            goal = 3;
            gameLength = 30;

            //Level 2 materials
            primaryStallMaterial = "greenfabric.jpg";
            secondaryBarrierMaterial = "blueleather.jpg";
            ballMaterial = "fractal.jpg";

            //Blue galaxy
            cubemapURLs = [
                //right, left, top, bottom, front, back
                "../Resources/CubeMaps/blue/right.png",
                "../Resources/CubeMaps/blue/left.png",
                "../Resources/CubeMaps/blue/top.png",
                "../Resources/CubeMaps/blue/bottom.png",
                "../Resources/CubeMaps/blue/front.png",
                "../Resources/CubeMaps/blue/back.png"
            ];

            //Level 2 gravity
            maxGrav = 60;
            minGrav = 40;
            xGrav = sign * ((Math.random() * (maxGrav - minGrav)) + minGrav);
            yGrav = -30;
            scene.setGravity(new THREE.Vector3(xGrav, yGrav, 0));

            break;
        case "3":
            renderer.shadowMap.enabled = false; //disabling this o       tion to debug on my machine because its kak slow :/

            numLevel3++;

            sign = signs[Math.floor(Math.random() * 2)];

            //Level 3 game length, ammo count and goal
            ammoCount = 5;
            goal = 3;
            gameLength = 30;

            //Level 3 materials
            primaryStallMaterial = "tealtexture.jpg";
            secondaryBarrierMaterial = "redhex.jpg";
            ballMaterial = "trippyred.jpg"

            //Red galaxy
            cubemapURLs = [
                //right, left, top, bottom, front, back
                "../Resources/CubeMaps/red/bkg3_right1.png",
                "../Resources/CubeMaps/red/bkg3_left2.png",
                "../Resources/CubeMaps/red/bkg3_top3.png",
                "../Resources/CubeMaps/red/bkg3_bottom4.png",
                "../Resources/CubeMaps/red/bkg3_front5.png",
                "../Resources/CubeMaps/red/bkg3_back6.png"
            ];

            //Level 3 gravity
            maxGrav = 80;
            minGrav = 60;
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
        arrowSource = '../Resources/Textures/Razeen/arrow.png';
    } else if (xDir == "left") {
        arrowSource = '../Resources/Textures/Razeen/arrowleft.png';
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

    //Hide gameHUD
    document.getElementById("GameHUD").style.visibility = 'hidden';

    //If they've reached the goal
    if(score>=goal){
        if(level == "1"){
            //Earn a prize if level is completed on first attempt
            if(numLevel1==1){
                prizesString = prizesString + "," + "1";
            }

            //Display outcomeHUD
            document.getElementById("LevelPassedHUD").style.visibility = 'visible';
            document.getElementById("LevelPassedText").innerHTML = "You win level 1 ! <br> Proceed to level 2?";

            nextLevel = "2";
        }else if(level == "2"){
            //Earn a prize if level is completed on first attempt
            if(numLevel2==1){
                prizesString = prizesString + "," + "2";
            }

            //Display outcomeHUD
            document.getElementById("LevelPassedHUD").style.visibility = 'visible';
            document.getElementById("LevelPassedText").innerHTML = "You win level 2 ! <br> Proceed to level 3?";

            nextLevel = "3";
        }else if(level == "3"){
            //Earn a prize if level is completed on first attempt
            if(numLevel3==1){
                prizesString = prizesString + "," + "3";
            }

            //Set prizes array to check if they've qualified for the bonus level
            let prizesArr = prizesString.split(",");

            console.log(prizesArr);

            if (prizesArr.length == 4 && totalScore<30) { //Qualified

                //Add pill
                pill.position.y = 70;
                pill.position.z = avatarPosition.z;
                pill.position.x = avatarPosition.x;
                scene.add(pill);
                pillplay = true;

            } else { //Did not qualify

                //Animation Timer:
                setTimeout(function () {
                    setInterval(function () {
                        //Animation and Mixer Code Goes Here
                        animationAction.play();
                        let delta = clock.getDelta();
                        mixers[0].update(delta);
                    }, 0);
                }, 200);


                //Wait 5s while animation plays before showing HUD
                setTimeout(function () {
                    document.getElementById("proceedButton").style.visibility = 'hidden';
                    document.getElementById("LevelPassedText").innerHTML = "You win ! <br> Final score: " + totalScore;

                    document.getElementById("mainMenuAnchor").href = "../Circus%20Environment/Environment.html";
                    document.getElementById("mainMenuButtonPassed").innerHTML = "MAIN MENU";

                    document.getElementById("LevelPassedHUD").style.visibility = 'visible';

                }, 5000);

            }
        }

        //Set local storage prizes
        localStorage.setItem('prizes', prizesString);

        //Set next level
        level = nextLevel;

    }else{
        if(ammoCount - numBallsShot <= 0){
            //If they've run out of ammo
            document.getElementById("LevelFailedText").innerHTML = "Out of balls <br> You lose level " + level + " ! <br> Restart ?" ;
            document.getElementById("mainMenuAnchor").href = "../Circus%20Environment/Environment.html";
            document.getElementById("LevelFailedHUD").style.visibility = 'visible';
        }else{
            //If they've run out of time
            document.getElementById("LevelFailedText").innerHTML = "Time up <br> You lose level " + level + " ! <br> Restart ?" ;
            document.getElementById("mainMenuAnchor").href = "../Circus%20Environment/Environment.html";
            document.getElementById("LevelFailedHUD").style.visibility = 'visible';
        }
    }
}
