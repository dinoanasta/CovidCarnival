// function createAvatar(){
//     astro = new THREE.Geometry();
//     let GLTFGeometry = new THREE.BufferGeometry();
//     astros = [];
//     astroObject;
//     meshes = [];
//
//     let manager = new THREE.LoadingManager();
//     manager.onLoad = init();
//
//     loader = new THREE.GLTFLoader(manager);
//     loader.load("../Models/New Models/astronaut/scene.gltf", (gltf) =>{
//         gltf.scene.traverse(function (child) {
//             if(child.isMesh){
//                 GLTFGeometry = child.geometry;
//                 astros.push(GLTFGeometry);
//             }
//         })
//     })
// }

function createAvatar(){
    avatarPosition = {x: 0, y:9, z: 80};
    let scale = {x: 5, y: 16, z: 5};
    let quat = {x: 0, y: 0, z: 0, w: 1};
    let mass = 0;

    //threeJS Section
    avatarObject = new THREE.Mesh(
        new THREE.BoxBufferGeometry(),
        new THREE.MeshStandardMaterial({
            map: new THREE.TextureLoader().load('../Resources/Textures/Dino/bluefoil.jpg'),
        })
    );

    avatarObject.position.set(avatarPosition.x, avatarPosition.y, avatarPosition.z);
    avatarObject.scale.set(scale.x, scale.y, scale.z);

    avatarObject.castShadow = true;
    avatarObject.receiveShadow = true

    scene.add(avatarObject);


    //Ammojs Section
    let transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin(new Ammo.btVector3(avatarPosition.x, avatarPosition.y, avatarPosition.z));
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

    body.setActivationState( STATE.DISABLE_DEACTIVATION );
    body.setCollisionFlags( FLAGS.CF_KINEMATIC_OBJECT );

    physicsWorld.addRigidBody(body);
    avatarObject.userData.physicsBody = body;

    //rigidBodies.push(avatar);


}

function moveAvatar(){
    let scalingFactor = 0.5;

    let moveX =  AvatarMoveDirection.right - AvatarMoveDirection.left;
    let moveZ =  AvatarMoveDirection.back - AvatarMoveDirection.forward;
    let moveY =  0;


    let translateFactor = tmpPos.set(moveX, moveY, moveZ);

    translateFactor.multiplyScalar(scalingFactor);

    avatarObject.translateX(translateFactor.x);
    avatarObject.translateY(translateFactor.y);
    avatarObject.translateZ(translateFactor.z);

    avatarObject.getWorldPosition(tmpPos);
    avatarObject.getWorldQuaternion(tmpQuat);

    let physicsBody = avatarObject.userData.physicsBody;

    let ms = physicsBody.getMotionState();
    if ( ms ) {

        ammoTmpPos.setValue(tmpPos.x, tmpPos.y, tmpPos.z);
        ammoTmpQuat.setValue( tmpQuat.x, tmpQuat.y, tmpQuat.z, tmpQuat.w);


        tmpTrans.setIdentity();
        tmpTrans.setOrigin( ammoTmpPos );
        tmpTrans.setRotation( ammoTmpQuat );

        ms.setWorldTransform(tmpTrans);

    }
    
    avatarPosition.x = tmpPos.x;
    avatarPosition.y = tmpPos.y;
    avatarPosition.z = tmpPos.z;

}
