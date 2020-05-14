function createAvatar(){
    let loader = new THREE.GLTFLoader();
    loader.load(
        "../../Models/New Models/astronaut/scene.gltf",
        function (object) {
            object.scene.traverse( function( object ) {
                if ( object.isMesh ) {
                    object.castShadow = true;
                }
            } );

            avatar = object.scene.children[0];

            avatar.position.set(0, 0, 80);
            avatar.scale.set(7, -7, 7);

            avatar.castShadow = true;
            avatar.receiveShadow = true;
            scene.add(avatar);
        }
    );
}

function moveAvatar(){
    let moveX =  AvatarMoveDirection.x;
    let moveZ =  AvatarMoveDirection.z;

    if(moveX==1){
        if(avatarLocalPos.x + moveX < movementBoundaries.rightX){
            avatar.position.x += moveX;
            avatarLocalPos.x += moveX;
        }
    }else if(moveX==-1 ){
        if(avatarLocalPos.x + moveX > movementBoundaries.leftX) {
            avatar.position.x += moveX;
            avatarLocalPos.x += moveX
        }
    }else if(moveZ==-1){
        if(avatarLocalPos.z + moveZ > movementBoundaries.frontZ) {
            avatar.position.z += moveZ;
            avatarLocalPos.z += moveZ;
        }
    }else if(moveZ==1){
        if(avatarLocalPos.z + moveZ < movementBoundaries.backZ) {
            avatar.position.z += moveZ;
            avatarLocalPos.z += moveZ;
        }
    }

    //avatar.position.set(avatar.position.x + moveX, avatar.position.y, avatar.position.z + moveZ);

    //avatar.__dirtyPosition = true;
}