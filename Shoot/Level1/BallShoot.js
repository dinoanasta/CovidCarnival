function createBalls(){
    let ballMat = new THREE.MeshStandardMaterial({
        map: textureLoader.load('../../Resources/Textures/Dino/' + ballMaterial),
        opacity: 0.8,
        transparent: true,
    })

    let ballRadius = 3;

    ball = new Physijs.SphereMesh(
        new THREE.SphereGeometry(ballRadius, 10, 10),
        ballMat,
        10
    )

    for(let i=0; i< ammoCount; ++i){
        ballsArray.push(ball.clone());
    }
}

function moveLaser (mouseCoords){
    avatarHead.set(avatarPosition.x, avatarPosition.y +25, avatarPosition.z-5);

    rayx = mouseCoords.x*200;
    rayy = mouseCoords.y*100;

    rayDirection.set(rayx,rayy-40, -100).normalize();

    laser.position.copy(avatarHead);
    laser.setDirection(rayDirection);
    laser.setLength(200, 0.00001, 0.00001);
}

function onMouseMove(event){
    mouseCoords.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );
    moveLaser(mouseCoords);
}

function onMouseDown(event) {
 if(playing){
     if(numBallsShot < ammoCount){

         thisBall = ballsArray[numBallsShot];

         shootSound = document.getElementById("raygun");
         shootSound.play();

         mouseCoords.set(
             (event.clientX / window.innerWidth) * 2 - 1,
             -(event.clientY / window.innerHeight) * 2 + 1
         );

         avatarHead.set(avatarPosition.x, avatarPosition.y +25, avatarPosition.z-5);

         rayx = mouseCoords.x*200;
         rayy = mouseCoords.y*100;

         rayDirection.set(rayx,rayy-40, -100);

         raycaster.set(avatarHead, rayDirection);

         thisBall.position.copy(avatarHead);

         scene.add(thisBall);
         beenHit = false;
         shotBalls.push(thisBall);

         pos.copy( raycaster.ray.direction );
         pos.multiplyScalar( 2 );
         thisBall.setLinearVelocity( new THREE.Vector3( pos.x, pos.y, pos.z ) );

         numBallsShot++;

         document.getElementById("ballCountValue").innerHTML = ammoCount-numBallsShot; // changes ammo count on html
     }else{
         clearInterval(countdown);
         setTimeout( function(){
                 decideOutcome();
             },
             500
         );
     }
 }
}

function deleteBalls(){
    ballsArray = [];
    shotBalls = [];

    score = 0;
    numBallsShot = 0;
}


