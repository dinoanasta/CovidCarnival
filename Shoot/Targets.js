function createTargets() {
    duckBox = new Physijs.BoxMesh( //physijs mesh for collision detection
        new THREE.BoxGeometry(10, 10, 10),
        new THREE.MeshStandardMaterial({
            opacity: 0.7,
            transparent: true,
            color: "red"
        }),
        0
    );

    //Added to make balls travelling at fast velocities able to collide with mesh
    duckBox.setCcdMotionThreshold(10);

    //Target positions
    duckCoordinates = [
        //Centre
        new THREE.Vector3(0, 30, -70),    //0
        new THREE.Vector3(0, 50, -70),    //1

        //Back (side-to-side)
        new THREE.Vector3(30, 15, -70),    //2

        //Right
        new THREE.Vector3(25, 30, -40),   //3
        new THREE.Vector3(25, 45, -70),   //4

        //Bottom right (back-to-front)
        new THREE.Vector3(25, 15, -70),   //5

        //Left
        new THREE.Vector3(-25, 30, -40),  //6
        new THREE.Vector3(-25, 45, -70),  //7

        //Bottom left (back-to-front)
        new THREE.Vector3(-25, 15, -70)   //8
    ];

    //Creating physijs meshes to "cover" real target models and adding to array
    for (let i = 0; i < 9; i++) {
        duckBoxArray.push(duckBox.clone());
        duckBoxArray[i].position.set(duckCoordinates[i].x, duckCoordinates[i].y, duckCoordinates[i].z);
        duckBoxArray[i].__dirtyPosition = true;
        duckBoxArray[i].mass = 0;
    }

    //Set up targets according to level
    if (level == "1") {
        //Loads target for level 1
        loader.load(
            "../Models/ufo/scene.gltf",
            function (object) {
                object.scene.traverse(function (object) {
                    if (object.isMesh) {
                        object.castShadow = true;
                    }
                });

                realDuckModel = object.scene.children[0];
                realDuckModel.scale.set(0.025, 0.025, 0.025);

                //Set coordinates and add to scene
                for (let i = 0; i < 9; i++) {
                    realDuckModel.position.set(duckCoordinates[i].x, duckCoordinates[i].y, duckCoordinates[i].z);
                    realDuckModelArray.push(realDuckModel.clone());

                    scene.add(duckBoxArray[i]);
                    scene.add(realDuckModelArray[i]);
                }

            }
        );
    } else if (level == "2") {
        //Loads target for level 2
        loader.load(
            "../Models/plush/scene.gltf",
            function (object) {
                object.scene.traverse(function (object) {
                    if (object.isMesh) {
                        object.castShadow = true;
                    }
                });

                realDuckModel = object.scene.children[0];
                realDuckModel.scale.set(0.3, 0.3, 0.3);

                //Set coordinates and add to scene
                for (let i = 0; i < 9; i++) {
                    realDuckModel.position.set(duckCoordinates[i].x, duckCoordinates[i].y, duckCoordinates[i].z);
                    realDuckModelArray.push(realDuckModel.clone());

                    scene.add(duckBoxArray[i]);
                    scene.add(realDuckModelArray[i]);
                }
            }
        );
    } else if (level == "3") {
        //Loads target for level 3
        loader.load(
            "../Models/rocket2/scene.gltf",
            function (object) {
                object.scene.traverse(function (object) {
                    if (object.isMesh) {
                        object.castShadow = true;
                    }
                });

                realDuckModel = object.scene.children[0];
                realDuckModel.rotation.x = Math.PI;
                realDuckModel.scale.set(3, 3, 3);

                //Set coordinates and add to scene
                for (let i = 0; i < 9; i++) {
                    realDuckModel.position.set(duckCoordinates[i].x, duckCoordinates[i].y, duckCoordinates[i].z);
                    realDuckModelArray.push(realDuckModel.clone());
                    realDuckModelArray[i].position.set(duckCoordinates[i].x, duckCoordinates[i].y, duckCoordinates[i].z);

                    scene.add(duckBoxArray[i]);
                    scene.add(realDuckModelArray[i]);
                }
            }
        );
    }
}

//Collision detection of targets with balls
function configureTargetCollisions() {
    for (let i = 0; i < 9; i++) {
        duckBoxArray[i].addEventListener('collision', function (other_object) {
            if (playing && other_object == shotBalls[numBallsShot - 1] && !beenHit) {
                beenHit = true;
                hitSound = document.getElementById("boom");
                hitSound.play();

                scene.remove(duckBoxArray[i]);
                scene.remove(realDuckModelArray[i]);
                score++;
                document.getElementById("scoreValue").textContent = score;
                if (score == goal) {
                    decideOutcome();
                }
            }
        });
    }
}

//Deletion of targets
function deleteTargets() {
    duckCoordinates = [];
    realDuckModelArray = [];
    duckBoxArray = [];
}

function circleTargetsAnimation() {
    //Centre ducks

    realDuckModelArray[0].rotation.y += 0.1;
    realDuckModelArray[0].position.x = 20 * Math.cos(3 * degrees / ((180 / Math.PI)));
    realDuckModelArray[0].position.y = -20 * Math.sin( 3 * degrees / ((180 / Math.PI))) + 30;

    realDuckModelArray[1].rotation.y -= 0.1;
    realDuckModelArray[1].position.x = -20 * Math.cos(3 * degrees / ((180 / Math.PI)));
    realDuckModelArray[1].position.y = -20 * Math.sin(3 * degrees / ((180 / Math.PI))) + 30;

    //Right ducks

    realDuckModelArray[3].rotation.y -= 0.1;
    realDuckModelArray[3].position.x = 20 * Math.cos(2 * degrees / ((180 / Math.PI))) + 5;
    realDuckModelArray[3].position.y = -20 * Math.sin(2 * degrees / ((180 / Math.PI))) + 40;
    realDuckModelArray[3].position.z = -20 * Math.sin(2 * degrees / ((180 / Math.PI))) - 30;

    realDuckModelArray[4].rotation.y -= 0.1;
    realDuckModelArray[4].position.x = 20 * Math.cos(2 * degrees / ((180 / Math.PI))) + 20 ;
    realDuckModelArray[4].position.y = -20 * Math.sin(2 * degrees / ((180 / Math.PI))) + 30;
    realDuckModelArray[4].position.z = -20 * Math.sin(2 * degrees / ((180 / Math.PI))) + 30;

    //Left ducks

    realDuckModelArray[6].rotation.y += 0.1;
    realDuckModelArray[6].position.x = -20 * Math.cos(2 * degrees / ((180 / Math.PI))) - 5;
    realDuckModelArray[6].position.y = -20 * Math.sin(2 * degrees / ((180 / Math.PI))) + 40;
    realDuckModelArray[6].position.z = -20 * Math.sin(2 * degrees / ((180 / Math.PI))) - 30;

    realDuckModelArray[7].rotation.y += 0.1;
    realDuckModelArray[7].position.x = -20 * Math.cos(2 * degrees / ((180 / Math.PI))) - 20;
    realDuckModelArray[7].position.y = -20 * Math.sin(2 * degrees / ((180 / Math.PI))) + 30;
    realDuckModelArray[7].position.z = -20 * Math.sin(2 * degrees / ((180 / Math.PI))) + 30;

    realDuckModelArray[2].rotation.z+=0.05;
}

//Targets 5 & 8 moving back to front
function moveBackTargetsAnimation() {
    //Targets 5 & 8
    realDuckModelArray[5].position.z -= 3.5;
    realDuckModelArray[5].rotation.z -= 0.1;
    realDuckModelArray[8].position.z -= 3.5;
    realDuckModelArray[8].rotation.z += 0.1;
}

function moveForwardTargetsAnimation() {
    //Targets 5 & 8
    realDuckModelArray[5].position.z += 3.5;
    realDuckModelArray[5].rotation.z -= 0.1;
    realDuckModelArray[8].position.z += 3.5;
    realDuckModelArray[8].rotation.z += 0.1;
}

//Target 2 moving side to side
function moveLeftTargetsAnimation() {
    //Target 2
    realDuckModelArray[2].position.x -= 2;
}

function moveRightTargetsAnimation() {
    //Target 2
    realDuckModelArray[2].position.x += 2;
}