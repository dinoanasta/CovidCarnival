function moveLaser (mouseCoords){
    avatarHead.set(avatarPosition.x, avatarPosition.y +25, avatarPosition.z-5);

    rayx = mouseCoords.x*100;
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

let numBalls = 0;
function onMouseDown(event) {

    if(numBalls < ammoCount){
        sound = document.getElementById("raygun");
        //sound.play();

        mouseCoords.set(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1
        );

        let ballRadius = 3;

        ball = new Physijs.SphereMesh(
            new THREE.SphereGeometry(ballRadius, 10, 10),
            new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('../../Resources/Textures/Dino/trippy2.jpeg'),
            }),
            10
        )

        avatarHead.set(avatarPosition.x, avatarPosition.y +25, avatarPosition.z-5);

        rayx = mouseCoords.x*100;
        rayy = mouseCoords.y*100;

        rayDirection.set(rayx,rayy - 40 , -100);

        raycaster.set(avatarHead, rayDirection);

        ball.castShadow = true;
        ball.receiveShadow = true;

        ball.position.copy(avatarHead);

        scene.add(ball);

        pos.copy( raycaster.ray.direction );
        pos.multiplyScalar( 2 );
        ball.setLinearVelocity( new THREE.Vector3( pos.x, pos.y, pos.z ) );

        numBalls++;

        document.getElementById("ballCountValue").innerHTML = ammoCount-numBalls; // changes ammo count on html
    }else{
            document.getElementById("HUD").style.visibility = 'hidden';
            document.getElementById("GameOverHUD").style.visibility = 'visible';
    }

}


