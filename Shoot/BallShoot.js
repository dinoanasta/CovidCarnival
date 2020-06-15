//creating balls with textures and physics
function createBalls(){

    //Change material according to level
    let ballMat = new THREE.MeshStandardMaterial({
        map: textureLoader.load('../Resources/Textures/Dino/' + ballMaterial),
        opacity: 0.8,
        transparent: true,
    })

    let ballRadius = 3;

    ball = new Physijs.SphereMesh(
        new THREE.SphereGeometry(ballRadius, 10, 10),
        ballMat,
        10
    )

    //Add all balls (amount of ammo) to array
    for(let i=0; i< ammoCount; ++i){
        ballsArray.push(ball.clone());
    }
}
//creating the laser pointer for player to aim at targets
function moveLaser (mouseCoords){
    avatarHead.set(avatarPosition.x, avatarPosition.y +25, avatarPosition.z-5);

    rayx = mouseCoords.x*200;
    rayy = mouseCoords.y*100;

    rayDirection.set(rayx,rayy-40, -100).normalize();

    laser.position.copy(avatarHead);
    laser.setDirection(rayDirection);
    laser.setLength(200, 0.00001, 0.00001);
}

//used to assign values to the x and y values of the mouse client variables
function onMouseMove(event){
    mouseCoords.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );
    moveLaser(mouseCoords);
}
//when mouse is clicked ball is fired at desired location based off the raycaster and mouse client coordinates
function onMouseDown(event) {
 if(playing){
     if(numBallsShot < ammoCount){ //If they run out of balls

         //Shoot specific ball in array
         thisBall = ballsArray[numBallsShot];

         //Play shooting sound
         shootSound = document.getElementById("raygun");
         shootSound.play();

         mouseCoords.set(
             (event.clientX / window.innerWidth) * 2 - 1,
             -(event.clientY / window.innerHeight) * 2 + 1
         );

         //setting coordinates for avatar head for the raycaster coordinates
         avatarHead.set(avatarPosition.x, avatarPosition.y +25, avatarPosition.z-5);

         rayx = mouseCoords.x*200;
         rayy = mouseCoords.y*100;

         rayDirection.set(rayx,rayy-40, -100);

         raycaster.set(avatarHead, rayDirection);

         //Shoot ball in direction of mouse
         thisBall.position.copy(avatarHead);

         scene.add(thisBall);
         beenHit = false;
         shotBalls.push(thisBall);

         pos.copy( raycaster.ray.direction );
         pos.multiplyScalar( 2 );
         thisBall.setLinearVelocity( new THREE.Vector3( pos.x, pos.y, pos.z ) );

         numBallsShot++;

         //Display how many balls the user has left
         document.getElementById("ballCountValue").innerHTML = ammoCount-numBallsShot; // changes ammo count on html
     }else{ //If the time runs out
         clearInterval(countdown);
         setTimeout( function(){
                 decideOutcome();
             },
             200
         );
     }
 }
}
//sets the balls variables to null
function deleteBalls(){
    ballsArray = [];
    shotBalls = [];

    score = 0;
    numBallsShot = 0;
}


