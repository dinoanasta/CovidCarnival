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
        //Unnecessary
        // {
        //     duckArray[0] = duck.clone(true);
        //     duckArray[0].position.set(coordinates[0].x, coordinates[0].y, coordinates[0].z);
        //
        //     duckArray[1] = duck.clone(true);
        //     duckArray[1].position.set(coordinates[1].x, coordinates[1].y, coordinates[1].z);
        //
        //     duckArray[2] = duck.clone(true);
        //     duckArray[2].position.set(coordinates[2].x, coordinates[2].y, coordinates[2].z);
        //
        //     duckArray[3] = duck.clone(true);
        //     duckArray[3].position.set(coordinates[3].x, coordinates[3].y, coordinates[3].z);
        //
        //     duckArray[4] = duck.clone(true);
        //     duckArray[4].position.set(coordinates[4].x, coordinates[4].y, coordinates[4].z);
        //
        //     duckArray[5] = duck.clone(true);
        //     duckArray[5].position.set(coordinates[5].x, coordinates[5].y, coordinates[5].z);
        //
        //     duckArray[6] = duck.clone(true);
        //     duckArray[6].position.set(coordinates[6].x, coordinates[6].y, coordinates[6].z);
        //
        //     duckArray[7] = duck.clone(true);
        //     duckArray[7].position.set(coordinates[7].x, coordinates[7].y, coordinates[7].z);
        //
        //     duckArray[8] = duck.clone(true);
        //     duckArray[8].position.set(coordinates[8].x, coordinates[8].y, coordinates[8].z);
        //
        //
        //     duckGroup.add(duckArray[0]);
        //     duckGroup.add(duckArray[1]);
        //     duckGroup.add(duckArray[2]);
        //     duckGroup.add(duckArray[3]);
        //     duckGroup.add(duckArray[4]);
        //     duckGroup.add(duckArray[5]);
        //     duckGroup.add(duckArray[6]);
        //     duckGroup.add(duckArray[7]);
        //     duckGroup.add(duckArray[8]);
        //
        // }
    });
    scene.add(duckGroup);


//Physics boxes around targets
    physicsTargets = new Physijs.BoxMesh(
        new THREE.BoxGeometry(70, 70, 70),
        new THREE.MeshPhongMaterial({
            opacity: 0,
            transparent: true,
            // color: "red"
        }),
        1
    );

    var physicsTargetsArray = [physicsTargets.clone(true), physicsTargets.clone(true), physicsTargets.clone(true), physicsTargets.clone(true), physicsTargets.clone(true), physicsTargets.clone(true), physicsTargets.clone(true), physicsTargets.clone(true), physicsTargets.clone(true)];

    for (let i = 0; i < 9; i++) {
        physicsTargetsArray[i].addEventListener('collision', function (other_object, relative_velocity, relative_rotation, contact_normal) {
            if (physicsTargetsArray[i].position.z > 0) {
                physicsTargetsArray[i].position.z = physicsTargetsArray[i].position.z - 600;
                duckArray[i].position.z = duckArray[i].position.z - 600;
                physicsTargetsArray[i].__dirtyPosition = true;
            } else if (physicsTargetsArray[i].position.z < 0) {
                physicsTargetsArray[i].position.z = physicsTargetsArray[i].position.z - 600 * -1;
                duckArray[i].position.z = duckArray[i].position.z - 600 * -1;
                physicsTargetsArray[i].__dirtyPosition = true;
            }
            ducksKilled++;
            scene.remove(bullet);
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