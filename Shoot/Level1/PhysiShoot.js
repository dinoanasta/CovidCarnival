function moveLaser (mouseCoords){
    avatarHead.set(avatar.position.x, avatar.position.y +25, avatar.position.z-5);

    rayx = mouseCoords.x*100;
    rayy = mouseCoords.y*100;

    rayDirection.set(rayx,rayy, -100).normalize();

    //let direction = new THREE.Vector3().subVectors(rayDirection, avatarHead);

    laser.position.copy(avatarHead);
    laser.setDirection(rayDirection);
    laser.setLength(200, 0, 0);
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
        let sound = document.getElementById("raygun");
        //sound.play();

        mouseCoords.set(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1
        );

        let ballRadius = 3;

        let ball = new Physijs.SphereMesh(
            new THREE.SphereGeometry(ballRadius, 10, 10),
            new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('../../Resources/Textures/Dino/trippy2.jpeg'),
            }),
            10
        )

        avatarHead.set(avatar.position.x, avatar.position.y +25, avatar.position.z-5);

        rayx = mouseCoords.x*100;
        rayy = mouseCoords.y*100;

        rayDirection.set(rayx,rayy, -100);

        raycaster.set(avatarHead, rayDirection);

        ball.castShadow = true;
        ball.receiveShadow = true;

        ball.position.copy(avatarHead);

        scene.add(ball);

        pos.copy( raycaster.ray.direction );
        pos.multiplyScalar( 2 );
        ball.setLinearVelocity( new THREE.Vector3( pos.x, pos.y, pos.z ) );

        numBalls++;
    }else{
        alert("Out of ammo");
    }

}


