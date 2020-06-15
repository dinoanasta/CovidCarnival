//function used to create avatar and set its location in the stall
function createAvatar(){
    loader.load(
        "../Models/hiphop/scene.gltf",
        function (object) {
            object.scene.traverse( function( object ) {
                if ( object.isMesh ) {
                    object.castShadow = true;
                }
            } );

            avatar = object.scene.children[0];
            //Reads animations from models and stores them
            avatarAnimation = object.animations[0];

            //Adds animation to animation mixer
            //Mixer controls the updating of the model as the animation progresses
            mixer = new THREE.AnimationMixer(avatar);
            mixers.push(mixer);

            //Creates The Animation Clip
            animationAction = mixer.clipAction(avatarAnimation);
            //Plays animation but won't actually start playing until we set up the timer
            // action.play();

            avatar.position.set(0, 0, 80);
            avatar.scale.set(7, -7, 7);

            avatarPosition.set(avatar.position.x, avatar.position.y, avatar.position.z);
            scene.add(avatar);
        }
    );
}

//function used to move avatar based off the keys pressed on the keyboard 
function moveAvatar(){
    let moveX =  AvatarMoveDirection.x;
    let moveZ =  AvatarMoveDirection.z;

    if(moveX==1){ //Move right
        if(avatarLocalPos.x + moveX*2 < movementBoundaries.rightX){
            avatar.position.x += moveX*2;
            avatarLocalPos.x += moveX*2;


            avatarPosition.set(avatar.position.x, avatar.position.y, avatar.position.z);
        }
    }else if(moveX==-1 ){ //Move left
        if(avatarLocalPos.x + moveX*2 > movementBoundaries.leftX) {
            avatar.position.x += moveX*2;
            avatarLocalPos.x += moveX*2;

            avatarPosition.set(avatar.position.x, avatar.position.y, avatar.position.z);
        }
    }else if(moveZ==-1){ //Move backwards
        if(avatarLocalPos.z + moveZ*2 > movementBoundaries.frontZ) {
            avatar.position.z += moveZ*2;
            avatarLocalPos.z += moveZ*2;

            avatarPosition.set(avatar.position.x, avatar.position.y, avatar.position.z);
        }
    }else if(moveZ==1){ //Move forwards
        if(avatarLocalPos.z + moveZ*2 < movementBoundaries.backZ) {
            avatar.position.z += moveZ*2;
            avatarLocalPos.z += moveZ*2;

            avatarPosition.set(avatar.position.x, avatar.position.y, avatar.position.z);
        }
    }
}

//used to set all avatar related variables to null
function deleteAvatar(){
    scene.remove(avatar);
    mixers = [];
    AvatarMoveDirection = { x: 0, z: 0 };
    avatarLocalPos = { x: 0, z: 0 };
}