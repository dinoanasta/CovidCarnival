function createTargets() {

    duck = new Physijs.BoxMesh(
        new THREE.BoxGeometry(7, 7, 7),
        new THREE.MeshStandardMaterial({
            opacity: 0.0001,
            // transparent: true
            // map: new THREE.TextureLoader().load('../../Resources/Textures/Dino/redfoil.jpg'),
        }),
        1
    );

    duckCoordinates = [
        new THREE.Vector3(0, 30, -70),    //0
        new THREE.Vector3(0, 50, -70),    //1
        new THREE.Vector3(0, 15, -70),    //2
        new THREE.Vector3(25, 30, -70),   //3
        new THREE.Vector3(25, 45, -70),   //4
        new THREE.Vector3(25, 15, -70),   //5
        new THREE.Vector3(-25, 30, -70),  //6
        new THREE.Vector3(-25, 45, -70),  //7
        new THREE.Vector3(-25, 15, -70)   //8
    ];

    realDuckModelArray = [
        new THREE.Mesh,
        new THREE.Mesh,
        new THREE.Mesh,
        new THREE.Mesh,
        new THREE.Mesh,
        new THREE.Mesh,
        new THREE.Mesh,
        new THREE.Mesh,
        new THREE.Mesh
    ];

    duckArray = [
        duck.clone(true),
        duck.clone(true),
        duck.clone(true),
        duck.clone(true),
        duck.clone(true),
        duck.clone(true),
        duck.clone(true),
        duck.clone(true),
        duck.clone(true)
    ];

    //duck.setCcdSweptSphereRadius(3);
    for (let x = 0; x < 9; x++) {
        duckArray[x].position.set(duckCoordinates[x].x, duckCoordinates[x].y, duckCoordinates[x].z);
    }

    // duckArray[1].position.set(duckCoordinates[1].x, duckCoordinates[1].y, duckCoordinates[1].z);
    // duckArray[2].position.set(duckCoordinates[2].x, duckCoordinates[2].y, duckCoordinates[2].z);
    // duckArray[3].position.set(duckCoordinates[3].x, duckCoordinates[3].y, duckCoordinates[3].z);
    // duckArray[4].position.set(duckCoordinates[4].x, duckCoordinates[4].y, duckCoordinates[4].z);
    // duckArray[5].position.set(duckCoordinates[5].x, duckCoordinates[5].y, duckCoordinates[5].z);
    // duckArray[6].position.set(duckCoordinates[6].x, duckCoordinates[6].y, duckCoordinates[6].z);
    // duckArray[7].position.set(duckCoordinates[7].x, duckCoordinates[7].y, duckCoordinates[7].z);
    // duckArray[8].position.set(duckCoordinates[8].x, duckCoordinates[8].y, duckCoordinates[8].z);

    //rand.castShadow = true; disabling this to debug on my machine because its kak slow :/
    //rand.receiveShadow = true; disabling this to debug on my machine because its kak slow :/

    loader.load(
        "../../Models/glTF/Duck.gltf",
        function (object) {
            object.scene.traverse(function (object) {
                if (object.isMesh) {
                    //object.castShadow = true;
                }
            });

            duckModel = object.scene.children[0];
            // duckModel.rotation.y=Math.Pi;
            duckModel.position.set(duckArray[0].position.x, duckArray[0].position.y - 4, duckArray[0].position.z);
            duckModel.scale.set(0.05, 0.05, 0.05);

            //duckModel.castShadow = true;
            //duckModel.receiveShadow = true;
            for (let x = 0; x < 9; x++) {
                realDuckModelArray[x] = duckModel.clone(true);
                realDuckModelArray[x].position.set(duckArray[x].position.x, duckArray[x].position.y - 4, duckArray[x].position.z);
            }

        }
    );

}

function addTargets(){


    //adding a duck
    for (let x = 0; x < 9; x++) {
        scene.add(duckArray[x]);
        scene.add(realDuckModelArray[x]);
        console.log(x);
    }

    for (let x = 0; x < 9; x++) {
        duckArray[x].addEventListener('collision', function (other_object, relative_velocity, relative_rotation, contact_normal) {
            if (other_object == ball) {
                console.log("bang bang!");
                console.log(duckArray[x].position.y);
                duckArray[x].position.y = duckArray[x].position.y + 500;
                realDuckModelArray[x].position.set(duckArray[x].position.x, duckArray[x].position.y + 4, duckArray[x].position.z);
                console.log(duckArray[x].position.y);
                duckArray[x].__dirtyPosition = true;
                //score++;
                // document.getElementById("Score").innerHTML = "Score: " + score;
            }
        });
    }
}