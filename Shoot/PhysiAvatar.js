function createAvatar(){

    avatar = new Physijs.BoxMesh(
        new THREE.BoxGeometry(),
        new THREE.MeshStandardMaterial({
            map: new THREE.TextureLoader().load('../Resources/Textures/Dino/red.jpg'),
        }),
        0
    );

    avatar.position.set(0, 9, 80);
    avatar.scale.set(5, 16, 5);

    avatar.castShadow = true;
    avatar.receiveShadow = true

    scene.add(avatar);
}

function moveAvatar(){

    let moveX =  AvatarMoveDirection.right - AvatarMoveDirection.left;
    let moveZ =  AvatarMoveDirection.back - AvatarMoveDirection.forward;
    let moveY =  0;

    avatar.position.set(avatar.position.x + moveX, avatar.position.y, avatar.position.z + moveZ);
}