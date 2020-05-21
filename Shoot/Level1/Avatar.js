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

            avatarPosition.set(avatar.position.x, avatar.position.y, avatar.position.z);
            scene.add(avatar);
        }
    );
}

function moveAvatar(){
    let moveX =  AvatarMoveDirection.x;
    let moveZ =  AvatarMoveDirection.z;

    if(moveX==1){
        if(avatarLocalPos.x + moveX*2 < movementBoundaries.rightX){
            avatar.position.x += moveX*2;
            avatarLocalPos.x += moveX*2;


            avatarPosition.set(avatar.position.x, avatar.position.y, avatar.position.z);
        }
    }else if(moveX==-1 ){
        if(avatarLocalPos.x + moveX*2 > movementBoundaries.leftX) {
            avatar.position.x += moveX*2;
            avatarLocalPos.x += moveX*2;

            avatarPosition.set(avatar.position.x, avatar.position.y, avatar.position.z);
        }
    }else if(moveZ==-1){
        if(avatarLocalPos.z + moveZ*2 > movementBoundaries.frontZ) {
            avatar.position.z += moveZ*2;
            avatarLocalPos.z += moveZ*2;

            avatarPosition.set(avatar.position.x, avatar.position.y, avatar.position.z);
        }
    }else if(moveZ==1){
        if(avatarLocalPos.z + moveZ*2 < movementBoundaries.backZ) {
            avatar.position.z += moveZ*2;
            avatarLocalPos.z += moveZ*2;

            avatarPosition.set(avatar.position.x, avatar.position.y, avatar.position.z);
        }
    }

}