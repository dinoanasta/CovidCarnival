function createStallPlatform(){
    //Level specific primary material
    let primaryMaterial = new THREE.MeshStandardMaterial({
        map: textureLoader.load('../Resources/Textures/Dino/' + primaryStallMaterial),
        // transparent: true,
        // opacity: 0.5
    });

    //Level specific secondary material
    let secondaryMaterial =  new THREE.MeshStandardMaterial({
            map: textureLoader.load('../Resources/Textures/Dino/' + secondaryBarrierMaterial)
    });

    //Base
    let baseSize = {width: 100, height: 2, depth:200}
    let base = new Physijs.BoxMesh(
        new THREE.BoxGeometry(100, 2, 200),
        primaryMaterial,
        0
    );
    base.castShadow = true;
    base.receiveShadow = true;

    //Shooter Barrier
    let shooterBarrierSize = {width: 90, height: 10, depth:20};
    let shooterBarrier = new Physijs.BoxMesh(
        new THREE.BoxGeometry(90,10,20),
        secondaryMaterial,
        0
    );
    shooterBarrier.position.set(0, shooterBarrierSize.height/2 + baseSize.height/2, 60);
    shooterBarrier.castShadow = true;
    shooterBarrier.receiveShadow = true;
    base.add(shooterBarrier);

    //Far wall
    let farSize = {width: 100, height: 50, depth:5};
    let far = new Physijs.BoxMesh(
        new THREE.CubeGeometry(100,50,5),
        primaryMaterial,
        0
    )
    far.position.set(0, farSize.height - farSize.height/2 + baseSize.height/2, farSize.depth - farSize.depth/2 - baseSize.depth/2);
    far.castShadow = true;
    far.receiveShadow = true;

    //Near wall
    let nearSize = {width: 100, height: 15, depth:5};
    let near = new Physijs.BoxMesh(
        new THREE.CubeGeometry(100,15,5),
        primaryMaterial,
        0
    )
    near.position.set(0, nearSize.height/2 + baseSize.height/2, -nearSize.depth/2 + baseSize.depth/2);
    near.castShadow = true;
    near.receiveShadow = true;

    //Left wall
    let leftSize = {width: 5, height: 50, depth:200};
    let left = new Physijs.BoxMesh(
        new THREE.CubeGeometry(5,50,200),
        primaryMaterial,
        0
    )
    left.position.set(leftSize.width/2 - baseSize.width/2, leftSize.height/2 + baseSize.height/2, 0);
    left.castShadow = true;
    left.receiveShadow = true;

    //Right wall
    let rightSize = {width: 5, height: 50, depth:200};
    let right = new Physijs.BoxMesh(
        new THREE.CubeGeometry(5,50,200),
        primaryMaterial,
        0
    )
    right.position.set(-rightSize.width/2  + baseSize.width/2, rightSize.height/2 + baseSize.height/2, 0);
    right.castShadow = true;
    right.receiveShadow = true;

    //Add all walls to base
    base.add( far );
    base.add(near);
    base.add(left);
    base.add(right);

    //3D Covid Carnival Text
    let covidGeo;
    let covidText;

    let carnivalGeo;
    let carnivalText;

    fontLoader.load( '../Resources/Fonts/helvetiker_bold.typeface.json', function (font ) {
        covidGeo = new THREE.TextGeometry( '  COVID', {
            font: font,
            size: 20,
            height: 5,
            curveSegments: 100,
            bevelEnabled: true,
            bevelThickness: 2,
            bevelSize: 2,
            bevelOffset: 0,
            bevelSegments: 1
        } );
        covidText = new THREE.Mesh(
            covidGeo,
            secondaryMaterial
        );

        carnivalGeo = new THREE.TextGeometry( ' CARNIVAL', {
            font: font,
            size: 20,
            height: 5,
            curveSegments: 100,
            bevelEnabled: true,
            bevelThickness: 2,
            bevelSize: 2,
            bevelOffset: 0,
            bevelSegments: 1
        } );
        carnivalText = new THREE.Mesh(
            carnivalGeo,
            secondaryMaterial
        );

        covidText.position.set(-60,85,-100);
        carnivalText.position.set(-80,55,-100);

        //Add text to base
        base.add(covidText);
        base.add(carnivalText);
    } );

    //Physijs plane to make it seem like balls bounce off the text
    let textPlane = new Physijs.PlaneMesh(
        new THREE.PlaneGeometry(160, 80),
        new THREE.MeshStandardMaterial({
            opacity: 0,
            transparent: true
            //map: new THREE.TextureLoader().load('../Resources/Textures/Dino/redfoil.jpg'),
        }),
        0
    );
    textPlane.position.set(0, 90, -92);
    base.add(textPlane);

    //Rocket model on shooter barrier
    loader.load(
        "../Models/rocket/scene.gltf",
        function (object) {
            object.scene.traverse( function( object ) {
                if ( object.isMesh ) {
                    object.castShadow = true;
                }
            } );

            rocketModel = object.scene.children[0];

            rocketModel.position.set(30, 12, 60);
            rocketModel.scale.set(4, 4, 4);

            rocketModel.castShadow = true;
            rocketModel.receiveShadow = true;
            scene.add(rocketModel);
        }
    );

    //Rocket physics box
    let rocketBox =new Physijs.BoxMesh(
        new THREE.BoxGeometry(8, 14, 8),
        new THREE.MeshStandardMaterial({
            opacity: 0.00001,
            transparent: true
        }),
        0
    );
    rocketBox.position.set(30, 20, 60);
    base.add(rocketBox);

    //Add base to scene
    scene.add(base);
}