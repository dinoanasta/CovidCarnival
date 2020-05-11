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

function onMouseDown(event){

    let sound = document.getElementById("raygun");
    // /sound.play();

    mouseCoords.set(
        (event.clientX/window.innerWidth)*2 -1,
        -(event.clientY/window.innerHeight)*2 +1
    );

    let avatarHead = new THREE.Vector3(avatarPosition.x, avatarPosition.y+5, avatarPosition.z);

    raycaster.set(avatarHead, new THREE.Vector3(mouseCoords.x, mouseCoords.y, -10).normalize());

    //Create ball and shoot it
    tmpPos.copy(raycaster.ray.direction);
    tmpPos.add(raycaster.ray.origin);

    let pos = {x: tmpPos.x, y: tmpPos.y, z: tmpPos.z};
    let radius = 1.5;
    let quat = {x: 0, y:0, z:0 , w: 1};
    let mass = 10;

    //threeJS section
    let ball = new THREE.Mesh(
        new THREE.SphereBufferGeometry(radius),
        new THREE.MeshStandardMaterial({
            map: new THREE.TextureLoader().load('../Resources/Textures/Dino/trippy2.jpeg'),
        })
    )

    ball.position.set(pos.x, pos.y, pos.z);

    ball.castShadow = true;
    ball.receiveShadow = true;

    scene.add(ball);

    //ammoJS section
    let transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
    transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
    let motionState = new Ammo.btDefaultMotionState(transform);

    let colShape = new Ammo.btSphereShape(radius);
    colShape.setMargin(0.05);

    let localInertia = new Ammo.btVector3(0,0,0);
    colShape.calculateLocalInertia(mass, localInertia);

    let rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, colShape, localInertia);
    let body = new Ammo.btRigidBody(rbInfo);

    physicsWorld.addRigidBody(body);

    tmpPos.copy(raycaster.ray.direction);
    tmpPos.multiplyScalar(100);

    body.setLinearVelocity(new Ammo.btVector3(tmpPos.x, tmpPos.y, tmpPos.z));

    ball.userData.physicsBody = body;
    rigidBodies.push(ball);


}


