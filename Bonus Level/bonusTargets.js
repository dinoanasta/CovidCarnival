function createTargets() {
    //Actual target models
    loader.load('../Models/glowingmushroom/scene.gltf', function (gltf) {
        duck = gltf.scene.children[0];
        //duck.material = new THREE.MeshBasicMaterial();
        duck.scale.set(20, 20, 20);
        //duck.position.set(physicsTargets.position.x - 5, physicsTargets.position.y - 5, physicsTargets.position.z);

        for (let i = 0; i < 9; ++i) {
            duckArray[i] = duck.clone(true);
            duckArray[i].position.set(coordinates[i].x, coordinates[i].y, coordinates[i].z);
            // scene.add(duckArray[i]);
            duckGroup.add(duckArray[i]);
        }
        
    });
    scene.add(duckGroup);


    //Physics boxes around targets
    physicsTargets = new Physijs.BoxMesh(
        new THREE.BoxGeometry(70, 70, 70),
        new THREE.MeshPhongMaterial({
            opacity: 0,
            transparent: false,
            // color: "red"
        }),
        1
    );
    

    //assiging values to the the physiJS array for collision detection
    physicsTargetsArray = [physicsTargets.clone(true), physicsTargets.clone(true), physicsTargets.clone(true), physicsTargets.clone(true), physicsTargets.clone(true), physicsTargets.clone(true), physicsTargets.clone(true), physicsTargets.clone(true), physicsTargets.clone(true)];


    //collision detection takes place here, once a mushroom has been hit we change the z coordinate of it and increase the score by 1 and total score by 1000
    for (let i = 0; i < 9; i++) {
        physicsTargetsArray[i].addEventListener('collision', function (other_object, relative_velocity, relative_rotation, contact_normal) {
            if (physicsTargetsArray[i].position.z > 0) {
                physicsTargetsArray[i].position.z = physicsTargetsArray[i].position.z - 600;
                duckArray[i].position.z = duckArray[i].position.z - 600;
                physicsTargetsArray[i].__dirtyPosition = true;
                // other_object.__dirtyPosition = true;
                scene.remove(other_object);
                ducksKilled++;
            } else if (physicsTargetsArray[i].position.z < 0) {
                physicsTargetsArray[i].position.z = physicsTargetsArray[i].position.z + 600;
                duckArray[i].position.z = duckArray[i].position.z + 600;
                physicsTargetsArray[i].__dirtyPosition = true;
                // other_object.__dirtyPosition = true;
                scene.remove(other_object);
                ducksKilled++;
            }
            totalScore = ducksKilled * 1000;
            document.getElementById("scoreValue").textContent = totalScore;
        });
    }

    for (let i = 0; i < 9; ++i) {
        physicsTargetsArray[i].position.set(coordinates[i].x + 5, coordinates[i].y + 25, coordinates[i].z);
        physicsTargetsArray[i].__dirtyPosition = true;
        scene.add(physicsTargetsArray[i]);
    }
}

function rotationAnimation() {

    //format for x rotation is r*cos(theta) where r is radius 
    //format for y rotation is r*sin(theta) where r is radius 
    //equation for circle using polar coordinates

    //1 left
    duckArray[1].position.x = 200 * Math.cos((degrees - 0) * (Math.PI / 180));
    duckArray[1].position.y = 200 * Math.sin((degrees - 0) * (Math.PI / 180));

    physicsTargetsArray[1].position.x = 200 * Math.cos((degrees - 0) * (Math.PI / 180));
    physicsTargetsArray[1].position.y = 200 * Math.sin((degrees - 0) * (Math.PI / 180));

    //2 right
    duckArray[2].position.x = 200 * Math.cos((degrees - 180) * (Math.PI / 180));
    duckArray[2].position.y = 200 * Math.sin((degrees - 180) * (Math.PI / 180));

    physicsTargetsArray[2].position.x = 200 * Math.cos((degrees - 180) * (Math.PI / 180));
    physicsTargetsArray[2].position.y = 200 * Math.sin((degrees - 180) * (Math.PI / 180));

    //5 bottom
    duckArray[5].position.x = 200 * Math.cos((degrees + 90) * (Math.PI / 180));
    duckArray[5].position.y = 200 * Math.sin((degrees + 90) * (Math.PI / 180));

    physicsTargetsArray[5].position.x = 200 * Math.cos((degrees + 90) * (Math.PI / 180));
    physicsTargetsArray[5].position.y = 200 * Math.sin((degrees + 90) * (Math.PI / 180));

    //6 top
    duckArray[6].position.x = 200 * Math.cos((degrees - 90) * (Math.PI / 180));
    duckArray[6].position.y = 200 * Math.sin((degrees - 90) * (Math.PI / 180));

    physicsTargetsArray[6].position.x = 200 * Math.cos((degrees - 90) * (Math.PI / 180));
    physicsTargetsArray[6].position.y = 200 * Math.sin((degrees - 90) * (Math.PI / 180));

    //3 far left
    duckArray[3].position.x = 400 * Math.cos((degrees ) * (Math.PI / 180));
    duckArray[3].position.y = 400 * Math.sin((degrees ) * (Math.PI / 180));

    physicsTargetsArray[3].position.x = 400 * Math.cos((degrees) * (Math.PI / 180));
    physicsTargetsArray[3].position.y = 400 * Math.sin((degrees) * (Math.PI / 180));

    //4 far right
    duckArray[4].position.x = 400 * Math.cos((degrees - 180) * (Math.PI / 180));
    duckArray[4].position.y = 400 * Math.sin((degrees - 180) * (Math.PI / 180));

    physicsTargetsArray[4].position.x = 400 * Math.cos((degrees - 180) * (Math.PI / 180));
    physicsTargetsArray[4].position.y = 400 * Math.sin((degrees - 180) * (Math.PI / 180));

    //7 far bottom
    duckArray[7].position.x = 400 * Math.cos((degrees + 90) * (Math.PI / 180));
    duckArray[7].position.y = 400 * Math.sin((degrees + 90) * (Math.PI / 180));

    physicsTargetsArray[7].position.x = 400 * Math.cos((degrees + 90) * (Math.PI / 180));
    physicsTargetsArray[7].position.y = 400 * Math.sin((degrees + 90) * (Math.PI / 180));

    //8 far top
    duckArray[8].position.x = 400 * Math.cos((degrees - 90) * (Math.PI / 180));
    duckArray[8].position.y = 400 * Math.sin((degrees - 90) * (Math.PI / 180));

    physicsTargetsArray[8].position.x = 400 * Math.cos((degrees - 90) * (Math.PI / 180));
    physicsTargetsArray[8].position.y = 400 * Math.sin((degrees - 90) * (Math.PI / 180));


    //doing this to ensure balls dont go through the object and miss the collision detection code since the ball is travelling at a fast velocity
    for (let index = 0; index < 9; index++) {
        physicsTargetsArray[index].__dirtyPosition=true;
    }
}

