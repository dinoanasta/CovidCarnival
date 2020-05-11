function onMouseMove(event){

    // mouseCoords.set(
    //     (event.clientX*2)/window.innerWidth -1,
    //     -(2*event.clientY)/window.innerHeight +1
    // );

    mouseCoords.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );

    avatarHead.set(avatar.position.x, avatar.position.y + 5, avatar.position.z);

    rayx = mouseCoords.x*50;
    rayy = mouseCoords.y*50;

    rayDirection.set(rayx,rayy, -100).normalize();

    let direction = new THREE.Vector3().sub(rayDirection, avatarHead);

    laser.position.copy(avatarHead);
    laser.setDirection(rayDirection);
    laser.setLength(direction.length(), 0, 0);
    laser.set
}

function onMouseDown(event) {

    let sound = document.getElementById("raygun");
    //sound.play();

    mouseCoords.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );

    let ballRadius = 3;

    let ball = new Physijs.SphereMesh(
        new THREE.SphereGeometry(ballRadius, 50, 50),
        new THREE.MeshStandardMaterial({
            map: new THREE.TextureLoader().load('../Resources/Textures/Dino/trippy2.jpeg'),
        }),
        1
    )

    avatarHead.set(avatar.position.x, avatar.position.y + 5, avatar.position.z);

    rayx = mouseCoords.x*50;
    rayy = mouseCoords.y*50;

    rayDirection.set(rayx,rayy, -100);

    raycaster.set(avatarHead, rayDirection);

    ball.castShadow = true;
    ball.receiveShadow = true;

    ball.position.copy(raycaster.ray.direction);
    ball.position.add(raycaster.ray.origin);

    scene.add(ball);

    pos.copy( raycaster.ray.direction );
    ball.setLinearVelocity( new THREE.Vector3( pos.x, pos.y, pos.z ) );

}


