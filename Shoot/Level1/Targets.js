function createTargets(){
    duckBox = new Physijs.BoxMesh(
        new THREE.BoxGeometry(7, 7, 7),
        new THREE.MeshStandardMaterial({
            opacity: 0.000001,
            transparent: true,
            color: "red"
            //map: new THREE.TextureLoader().load('../../Resources/Textures/Dino/redfoil.jpg'),
        }),
        0
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

    for (let i = 0; i < 9; i++) {
        duckBoxArray.push(duckBox.clone());
        duckBoxArray[i].position.set(duckCoordinates[i].x, duckCoordinates[i].y, duckCoordinates[i].z);
    }

    //duck.setCcdSweptSphereRadius(3);

    loader.load(
        "../../Models/alien/scene.gltf",
        function (object) {
            object.scene.traverse(function (object) {
                if (object.isMesh) {
                    object.castShadow = true;
                }
            });

            realDuckModel = object.scene.children[0];
            // duckModel.rotation.y=Math.Pi;
            realDuckModel.scale.set(0.3, 0.3, 0.3);

            for (let i = 0; i < 9; i++) {
                realDuckModel.position.set(duckCoordinates[i].x,  duckCoordinates[i].y,  duckCoordinates[i].z);
                realDuckModelArray.push(realDuckModel.clone());

                scene.add(duckBoxArray[i]);
                scene.add(realDuckModelArray[i]);
            }
        }
    );
}

function configureTargetCollisions(){
    hitSound = document.getElementById("boom");
    for (let i = 0; i < 9; i++) {
        duckBoxArray[i].addEventListener('collision', function (other_object) {
            if (other_object == thisBall) {
                hitSound.play();
                scene.remove(duckBoxArray[i]);
                scene.remove(realDuckModelArray[i]);
                score++;
                document.getElementById("scoreValue").textContent = score;
                if(score==goal){
                    decideOutcome();
                }
            }
        });
    }
}

function deleteTargets(){
    for (let i = 0; i < 9; i++) {
        duckBoxArray.pop();
        realDuckModelArray.pop();
    }
    realDuckModelArray = [];
    duckBoxArray = [];
}
