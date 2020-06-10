function createTargets() {
    duckBox = new Physijs.BoxMesh( //physijs mesh for collision detection
        new THREE.BoxGeometry(10, 10, 10),
        new THREE.MeshStandardMaterial({
            opacity: 0,
            transparent: true,
            // color: "red"
            //map: new THREE.TextureLoader().load('../Resources/Textures/Dino/redfoil.jpg'),
        }),
        0
    );
    duckBox.setCcdMotionThreshold(10); //added to make balls travelling at fast velocities can collide with mesh
    duckCoordinates = [ //target positions

        //Centre
        new THREE.Vector3(0, 30, -70),    //0
        new THREE.Vector3(0, 50, -70),    //1

        new THREE.Vector3(30, 15, -70),    //2 - back

        //Right
        new THREE.Vector3(25, 30, -40),   //3
        new THREE.Vector3(25, 45, -70),   //4

        new THREE.Vector3(25, 15, -70),   //5 - bottom left/right

        //Left
        new THREE.Vector3(-25, 30, -40),  //6
        new THREE.Vector3(-25, 45, -70),  //7

        new THREE.Vector3(-25, 15, -70)   //8 - bottom left/right
    ];

    for (let i = 0; i < 9; i++) { //adding physijs box mesh to an array
        duckBoxArray.push(duckBox.clone());
        duckBoxArray[i].position.set(duckCoordinates[i].x, duckCoordinates[i].y, duckCoordinates[i].z);
        duckBoxArray[i].__dirtyPosition = true;
        duckBoxArray[i].mass = 0;
    }


    if (level == "1") {

        // duckBox = new Physijs.SphereMesh(
        //     new THREE.BoxGeometry(10,10,10),
        //     new THREE.MeshStandardMaterial({
        //         opacity: 0,
        //         transparent: true,
        //         // color: "red"
        //         //map: new THREE.TextureLoader().load('../Resources/Textures/Dino/redfoil.jpg'),
        //     }),
        //     0
        // );
        // duckBox.setCcdMotionThreshold(10);
        // duckCoordinates = [
        //     new THREE.Vector3(0, 30, -70),    //0
        //     new THREE.Vector3(0, 50, -70),    //1
        //     new THREE.Vector3(0, 15, -70),    //2
        //     new THREE.Vector3(25, 30, -70),   //3
        //     new THREE.Vector3(25, 45, -70),   //4
        //     new THREE.Vector3(25, 15, -70),   //5
        //     new THREE.Vector3(-25, 30, -70),  //6
        //     new THREE.Vector3(-25, 45, -70),  //7
        //     new THREE.Vector3(-25, 15, -70)   //8
        // ];

        // for (let i = 0; i < 9; i++) {
        //     duckBoxArray.push(duckBox.clone());
        //     duckBoxArray[i].position.set(duckCoordinates[i].x, duckCoordinates[i].y, duckCoordinates[i].z);
        // }

        //duck.setCcdSweptSphereRadius(3);

        loader.load( //loading respective model for respective level
            "../Models/ufo/scene.gltf",
            function (object) {
                object.scene.traverse(function (object) {
                    if (object.isMesh) {
                        object.castShadow = true;
                    }
                });

                realDuckModel = object.scene.children[0];
                realDuckModel.scale.set(0.025, 0.025, 0.025);

                for (let i = 0; i < 9; i++) { //assigning coordinates and adding to scene :)
                    realDuckModel.position.set(duckCoordinates[i].x, duckCoordinates[i].y, duckCoordinates[i].z);
                    realDuckModelArray.push(realDuckModel.clone());

                    scene.add(duckBoxArray[i]);
                    scene.add(realDuckModelArray[i]);
                }

            }
        );
    } else if (level == "2") {
        // duckBox = new Physijs.BoxMesh(
        //     new THREE.BoxGeometry(10, 10, 10),
        //     new THREE.MeshStandardMaterial({
        //         opacity: 0,
        //         transparent: true,
        //         // color: "red"
        //         //map: new THREE.TextureLoader().load('../Resources/Textures/Dino/redfoil.jpg'),
        //     }),
        //     0
        // );
        // duckBox.setCcdMotionThreshold(10);
        // duckCoordinates = [
        //     new THREE.Vector3(0, 30, -70),    //0
        //     new THREE.Vector3(0, 50, -70),    //1
        //     new THREE.Vector3(0, 15, -70),    //2
        //     new THREE.Vector3(25, 30, -70),   //3
        //     new THREE.Vector3(25, 45, -70),   //4
        //     new THREE.Vector3(25, 15, -70),   //5
        //     new THREE.Vector3(-25, 30, -70),  //6
        //     new THREE.Vector3(-25, 45, -70),  //7
        //     new THREE.Vector3(-25, 15, -70)   //8
        // ];

        // for (let i = 0; i < 9; i++) {
        //     duckBoxArray.push(duckBox.clone());
        //     duckBoxArray[i].position.set(duckCoordinates[i].x, duckCoordinates[i].y, duckCoordinates[i].z);
        // }

        //duck.setCcdSweptSphereRadius(3);

        loader.load( //loading respective model for respective level
            "../Models/plush/scene.gltf",
            function (object) {
                object.scene.traverse(function (object) {
                    if (object.isMesh) {
                        object.castShadow = true;
                    }
                });

                realDuckModel = object.scene.children[0];
                // duckModel.rotation.y=Math.Pi;
                realDuckModel.scale.set(0.3, 0.3, 0.3);

                for (let i = 0; i < 9; i++) { //assigning coordinates and adding to scene :)
                    realDuckModel.position.set(duckCoordinates[i].x, duckCoordinates[i].y, duckCoordinates[i].z);
                    realDuckModelArray.push(realDuckModel.clone());

                    scene.add(duckBoxArray[i]);
                    scene.add(realDuckModelArray[i]);
                }
            }
        );
    } else if (level == "3") {


        //duck.setCcdSweptSphereRadius(3);

        loader.load( //loading respective model for respective level
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

                for (let i = 0; i < 9; i++) { //assigning coordinates and adding to scene :)
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

function configureTargetCollisions() { //collision detection of targets with balls
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

    // duckBoxArray[0].addEventListener('collision', function (other_object) {
    //     if (playing && other_object == shotBalls[numBallsShot - 1] && !beenHit) {
    //         beenHit = true;
    //         hitSound = document.getElementById("boom");
    //         hitSound.play();
    //
    //         scene.remove(duckBoxArray[0]);
    //         scene.remove(realDuckModelArray[0]);
    //         score++;
    //         document.getElementById("scoreValue").textContent = score;
    //         if (score == goal) {
    //             decideOutcome();
    //         }
    //     }
    // });
    //
    // duckBoxArray[1].addEventListener('collision', function (other_object) {
    //     if (playing && other_object == shotBalls[numBallsShot - 1] && !beenHit) {
    //         beenHit = true;
    //         hitSound = document.getElementById("boom");
    //         hitSound.play();
    //         scene.remove(duckBoxArray[1]);
    //         scene.remove(realDuckModelArray[1]);
    //         score++;
    //         document.getElementById("scoreValue").textContent = score;
    //         if (score == goal) {
    //             decideOutcome();
    //         }
    //     }
    // });
    //
    // duckBoxArray[2].addEventListener('collision', function (other_object) {
    //     if (playing && other_object == shotBalls[numBallsShot - 1] && !beenHit) {
    //         beenHit = true;
    //         hitSound = document.getElementById("boom");
    //         hitSound.play();
    //         scene.remove(duckBoxArray[2]);
    //         scene.remove(realDuckModelArray[2]);
    //         score++;
    //         document.getElementById("scoreValue").textContent = score;
    //         if (score == goal) {
    //             decideOutcome();
    //         }
    //     }
    // });
    //
    // duckBoxArray[3].addEventListener('collision', function (other_object) {
    //     if (playing && other_object == shotBalls[numBallsShot - 1] && !beenHit) {
    //         beenHit = true;
    //         hitSound = document.getElementById("boom");
    //         hitSound.play();
    //         scene.remove(duckBoxArray[3]);
    //         scene.remove(realDuckModelArray[3]);
    //         score++;
    //         document.getElementById("scoreValue").textContent = score;
    //         if (score == goal) {
    //             decideOutcome();
    //         }
    //     }
    // });
    //
    // duckBoxArray[4].addEventListener('collision', function (other_object) {
    //     if (playing && other_object == shotBalls[numBallsShot - 1] && !beenHit) {
    //         beenHit = true;
    //         hitSound = document.getElementById("boom");
    //         hitSound.play();
    //         scene.remove(duckBoxArray[4]);
    //         scene.remove(realDuckModelArray[4]);
    //         score++;
    //         document.getElementById("scoreValue").textContent = score;
    //         if (score == goal) {
    //             decideOutcome();
    //         }
    //     }
    // });
    //
    // duckBoxArray[5].addEventListener('collision', function (other_object) {
    //     if (playing && other_object == shotBalls[numBallsShot - 1] && !beenHit) {
    //         beenHit = true;
    //         hitSound = document.getElementById("boom");
    //         hitSound.play();
    //         scene.remove(duckBoxArray[5]);
    //         scene.remove(realDuckModelArray[5]);
    //         score++;
    //         document.getElementById("scoreValue").textContent = score;
    //         if (score == goal) {
    //             decideOutcome();
    //         }
    //     }
    // });
    //
    // duckBoxArray[6].addEventListener('collision', function (other_object) {
    //     if (playing && other_object == shotBalls[numBallsShot - 1] && !beenHit) {
    //         beenHit = true;
    //         hitSound = document.getElementById("boom");
    //         hitSound.play();
    //         scene.remove(duckBoxArray[6]);
    //         scene.remove(realDuckModelArray[6]);
    //         score++;
    //         document.getElementById("scoreValue").textContent = score;
    //         if (score == goal) {
    //             decideOutcome();
    //         }
    //     }
    // });
    //
    // duckBoxArray[7].addEventListener('collision', function (other_object) {
    //     if (playing && other_object == shotBalls[numBallsShot - 1] && !beenHit) {
    //         beenHit = true;
    //         hitSound = document.getElementById("boom");
    //         hitSound.play();
    //         scene.remove(duckBoxArray[7]);
    //         scene.remove(realDuckModelArray[7]);
    //         score++;
    //         document.getElementById("scoreValue").textContent = score;
    //         if (score == goal) {
    //             decideOutcome();
    //         }
    //     }
    // });
    //
    // duckBoxArray[8].addEventListener('collision', function (other_object) {
    //     if (playing && other_object == shotBalls[numBallsShot - 1] && !beenHit) {
    //         beenHit = true;
    //         hitSound = document.getElementById("boom");
    //         hitSound.play();
    //         scene.remove(duckBoxArray[8]);
    //         scene.remove(realDuckModelArray[8]);
    //         score++;
    //         document.getElementById("scoreValue").textContent = score;
    //         if (score == goal) {
    //             decideOutcome();
    //         }
    //     }
    // });
    // // }
}

function deleteTargets() { //deletion of targets
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


function moveBackTargetsAnimation() {
    //index 5 & 8
    realDuckModelArray[5].position.z -= 3.5;
    realDuckModelArray[5].rotation.z -= 0.1;
    realDuckModelArray[8].position.z -= 3.5;
    realDuckModelArray[8].rotation.z += 0.1;
}

function moveForwardTargetsAnimation() {
    //index 5 & 8
    realDuckModelArray[5].position.z += 3.5;
    realDuckModelArray[5].rotation.z -= 0.1;
    realDuckModelArray[8].position.z += 3.5;
    realDuckModelArray[8].rotation.z += 0.1;
}

function moveLeftTargetsAnimation() {
    //index 5 & 8
    realDuckModelArray[2].position.x -= 2;
}

function moveRightTargetsAnimation() {
    //index 5 & 8
    realDuckModelArray[2].position.x += 2;
}