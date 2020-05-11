
function createPlatform(){

    let pos = {x: 0, y: 0, z: 0};
    let scale = {x: 100, y: 2, z: 200};
    let quat = {x: 0, y: 0, z: 0, w: 1};
    let mass = 0;

    //threeJS Section
    let blockPlane = new THREE.Mesh(
        new THREE.BoxBufferGeometry(),
        new THREE.MeshStandardMaterial({
            map: new THREE.TextureLoader().load('../Resources/Textures/Dino/neontexture1.jpg'),
        })
    );

    blockPlane.position.set(pos.x, pos.y, pos.z);
    blockPlane.scale.set(scale.x, scale.y, scale.z);

    blockPlane.castShadow = true;
    blockPlane.receiveShadow = true;

    scene.add(blockPlane);


    //Ammojs Section
    let transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
    transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
    let motionState = new Ammo.btDefaultMotionState( transform );

    let colShape = new Ammo.btBoxShape( new Ammo.btVector3( scale.x * 0.5, scale.y * 0.5, scale.z * 0.5 ) );
    colShape.setMargin( 0.05 );

    let localInertia = new Ammo.btVector3( 0, 0, 0 );
    colShape.calculateLocalInertia( mass, localInertia );

    let rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, colShape, localInertia );
    let body = new Ammo.btRigidBody( rbInfo );

    body.setFriction(4);
    body.setRollingFriction(10);

    physicsWorld.addRigidBody( body );
}

function createShooterBarrier() {
    let pos = {x: 0, y: 5, z: 60};
    let scale = {x: 100, y: 10, z: 20};
    let quat = {x: 0, y: 0, z: 0, w: 1};
    let mass = 0;

    //threeJS Section
    let blockPlane = new THREE.Mesh(
        new THREE.BoxBufferGeometry(),
        new THREE.MeshStandardMaterial({
            map: new THREE.TextureLoader().load('../Resources/Textures/Dino/neontexture1.jpg'),
        })
    );

    blockPlane.position.set(pos.x, pos.y, pos.z);
    blockPlane.scale.set(scale.x, scale.y, scale.z);

    blockPlane.castShadow = true;
    blockPlane.receiveShadow = true;

    scene.add(blockPlane);


    //Ammojs Section
    let transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
    transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
    let motionState = new Ammo.btDefaultMotionState(transform);

    let colShape = new Ammo.btBoxShape(new Ammo.btVector3(scale.x * 0.5, scale.y * 0.5, scale.z * 0.5));
    colShape.setMargin(0.05);

    let localInertia = new Ammo.btVector3(0, 0, 0);
    colShape.calculateLocalInertia(mass, localInertia);

    let rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, colShape, localInertia);
    let body = new Ammo.btRigidBody(rbInfo);

    body.setFriction(4);
    body.setRollingFriction(10);

    physicsWorld.addRigidBody(body);

}

function createBall(){

    let pos = {x: 0, y: 4, z: 80};
    let radius = 2;
    let quat = {x: 0, y: 0, z: 0, w: 1};
    let mass = 1;

    //threeJS Section
    let ball = ballObject = new THREE.Mesh(
        new THREE.SphereBufferGeometry(radius),
        new THREE.MeshPhongMaterial({color: 0xff0505})
    );

    ball.position.set(pos.x, pos.y, pos.z);

    ball.castShadow = true;
    ball.receiveShadow = true;

    scene.add(ball);


    //Ammojs Section
    let transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
    transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
    let motionState = new Ammo.btDefaultMotionState( transform );

    let colShape = new Ammo.btSphereShape( radius );
    colShape.setMargin( 0.05 );

    let localInertia = new Ammo.btVector3( 0, 0, 0 );
    colShape.calculateLocalInertia( mass, localInertia );

    let rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, colShape, localInertia );
    let body = new Ammo.btRigidBody( rbInfo );

    body.setFriction(4);
    body.setRollingFriction(10);

    physicsWorld.addRigidBody( body );

    ball.userData.physicsBody = body;
    rigidBodies.push(ball);
}

function moveBall(){

    let scalingFactor = 20;

    let moveX =  moveDirection.right - moveDirection.left;
    let moveZ =  moveDirection.back - moveDirection.forward;
    let moveY =  0;

    if( moveX == 0 && moveY == 0 && moveZ == 0) return;

    let resultantImpulse = new Ammo.btVector3( moveX, moveY, moveZ )
    resultantImpulse.op_mul(scalingFactor);

    let physicsBody = ballObject.userData.physicsBody;
    physicsBody.setLinearVelocity( resultantImpulse );

}


// Change to rods which the ducks will sit on
// function createKinematicBox(){
//
//     let pos = {x: 40, y: 6, z: 5};
//     let scale = {x: 10, y: 10, z: 10};
//     let quat = {x: 0, y: 0, z: 0, w: 1};
//     let mass = 0;
//
//     //threeJS Section
//     kObject = new THREE.Mesh(
//         new THREE.BoxBufferGeometry(),
//         new THREE.MeshPhongMaterial({color: 0x30ab78})
//     );
//
//     kObject.position.set(pos.x, pos.y, pos.z);
//     kObject.scale.set(scale.x, scale.y, scale.z);
//
//     kObject.castShadow = true;
//     kObject.receiveShadow = true;
//
//     scene.add(kObject);
//
//
//     //Ammojs Section
//     let transform = new Ammo.btTransform();
//     transform.setIdentity();
//     transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
//     transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
//     let motionState = new Ammo.btDefaultMotionState( transform );
//
//     let colShape = new Ammo.btBoxShape( new Ammo.btVector3( scale.x * 0.5, scale.y * 0.5, scale.z * 0.5 ) );
//     colShape.setMargin( 0.05 );
//
//     let localInertia = new Ammo.btVector3( 0, 0, 0 );
//     colShape.calculateLocalInertia( mass, localInertia );
//
//     let rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, colShape, localInertia );
//     let body = new Ammo.btRigidBody( rbInfo );
//
//     body.setFriction(4);
//     body.setRollingFriction(10);
//
//     body.setActivationState( STATE.DISABLE_DEACTIVATION );
//     body.setCollisionFlags( FLAGS.CF_KINEMATIC_OBJECT );
//
//
//     physicsWorld.addRigidBody( body );
//     kObject.userData.physicsBody = body;
//
// }
