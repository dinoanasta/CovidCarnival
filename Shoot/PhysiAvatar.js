function createAvatar(){
    avatarPosition = {x: 0, y:9, z: 80};
    let scale = {x: 5, y: 16, z: 5};

    //threeJS Section
    avatarObject = new Physijs.BoxMesh(
        new THREE.BoxGeometry(),
        new THREE.MeshStandardMaterial({
            map: new THREE.TextureLoader().load('../Resources/Textures/Dino/bluefoil.jpg'),
        }),
        0
    );

    avatarObject.position.set(avatarPosition.x, avatarPosition.y, avatarPosition.z);
    avatarObject.scale.set(scale.x, scale.y, scale.z);

    avatarObject.castShadow = true;
    avatarObject.receiveShadow = true

    scene.add(avatarObject);
}

function moveAvatar(){

    let moveX =  AvatarMoveDirection.right - AvatarMoveDirection.left;
    let moveZ =  AvatarMoveDirection.back - AvatarMoveDirection.forward;
    let moveY =  0;

    avatarPosition.x = tmpPos.x;
    avatarPosition.y = tmpPos.y;
    avatarPosition.z = tmpPos.z;

}