function createAvatar(){
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
            avatarPosition.set(avatar.position.x, avatar.position.y, avatar.position.z);
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


            avatarPosition.set(avatar.position.x, avatar.position.y, avatar.position.z);
        }
    }else if(moveX==-1 ){
        if(avatarLocalPos.x + moveX > movementBoundaries.leftX) {
            avatar.position.x += moveX;
            avatarLocalPos.x += moveX;

            avatarPosition.set(avatar.position.x, avatar.position.y, avatar.position.z);
        }
    }else if(moveZ==-1){
        if(avatarLocalPos.z + moveZ > movementBoundaries.frontZ) {
            avatar.position.z += moveZ;
            avatarLocalPos.z += moveZ;

            avatarPosition.set(avatar.position.x, avatar.position.y, avatar.position.z);
        }
    }else if(moveZ==1){
        if(avatarLocalPos.z + moveZ < movementBoundaries.backZ) {
            avatar.position.z += moveZ;
            avatarLocalPos.z += moveZ;

            avatarPosition.set(avatar.position.x, avatar.position.y, avatar.position.z);
        }
    }

}