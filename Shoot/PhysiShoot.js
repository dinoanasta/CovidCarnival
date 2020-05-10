function onMouseMove(event){

    // mouseCoords.set(
    //     (event.clientX*2)/window.innerWidth -1,
    //     -(2*event.clientY)/window.innerHeight +1
    // );

    mouseCoords.set(
        event.clientX - window.screenLeft,
        event.clientY - window.screenTop
    );

    let a = mouseCoords.x;
    let b = -mouseCoords.y;

    let avatarHead = new THREE.Vector3(avatarPosition.x, avatarPosition.y+5, avatarPosition.z);

    let points = [];
    points.push(avatarHead);
    points.push(new THREE.Vector3(a, b, -1000));

    let geometry = new THREE.BufferGeometry().setFromPoints(points);

    //threeJS section
    laser = new THREE.Line(
        geometry,
        new THREE.MeshStandardMaterial({
            color: "red"
        })
    )

    scene.add(laser);
}

function onMouseDown(event) {

    let sound = document.getElementById("raygun");
    //sound.play();

    mouseCoords.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );

    let avatarHead = new THREE.Vector3(avatarPosition.x, avatarPosition.y + 5, avatarPosition.z);

    raycaster.set(avatarHead, new THREE.Vector3(mouseCoords.x, mouseCoords.y, -10).normalize());
    let radius = 10;

    let ball = new Physijs.SphereMesh(
        new THREE.SphereGeometry(radius, 100, 100),
        new THREE.MeshStandardMaterial({
            map: new THREE.TextureLoader().load('../Resources/Textures/Dino/trippy2.jpeg'),
        }),
        30
    )

    ball.castShadow = true;
    ball.receiveShadow = true;

    pos.copy(raycaster.ray.direction);
    pos.add(raycaster.ray.origin);

    scene.add(ball);

    scene.__dirtyPosition = true;

    pos.copy( raycaster.ray.direction );
    pos.multiplyScalar( 80 );

    ball.setLinearVelocity(new THREE.Vector3(pos.x, pos.y, pos.z));

}


