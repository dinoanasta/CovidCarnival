function createStallPlatform(){
    let platformMat = new THREE.MeshStandardMaterial({
        map: textureLoader.load('../../Resources/Textures/Dino/neontexture1.jpg'),
        //transparent: true,
        //opacity: 0.9
    });

    // Base
    let baseSize = {width: 100, height: 2, depth:200}
    let base = new Physijs.BoxMesh(
        new THREE.BoxGeometry(100, 2, 200),
        platformMat,
        0
    );
    base.castShadow = true;
    base.receiveShadow = true;

    //Shooter Barrier
    let shooterBarrierSize = {width: 90, height: 10, depth:20};
    let shooterBarrier = new Physijs.BoxMesh(
        new THREE.BoxGeometry(90,10,20),
        new THREE.MeshStandardMaterial({
            map: textureLoader.load('../../Resources/Textures/Dino/redfoil.jpg'),
        }),
        0
    );
    shooterBarrier.position.set(0, shooterBarrierSize.height/2 + baseSize.height/2, 60);
    shooterBarrier.castShadow = true;
    shooterBarrier.receiveShadow = true;
    base.add(shooterBarrier);

    //Far
    let farSize = {width: 100, height: 50, depth:5};
    let far = new Physijs.BoxMesh(
        new THREE.CubeGeometry(100,50,5),
        platformMat,
        0
    )
    far.position.set(0, farSize.height - farSize.height/2 + baseSize.height/2, farSize.depth - farSize.depth/2 - baseSize.depth/2);
    far.castShadow = true;
    far.receiveShadow = true;

    //Near wall
    let nearSize = {width: 100, height: 15, depth:5};
    let near = new Physijs.BoxMesh(
        new THREE.CubeGeometry(100,15,5),
        platformMat,
        0
    )
    near.position.set(0, nearSize.height/2 + baseSize.height/2, -nearSize.depth/2 + baseSize.depth/2);
    near.castShadow = true;
    near.receiveShadow = true;

    //Left Panel
    let leftSize = {width: 5, height: 50, depth:200};
    let left = new Physijs.BoxMesh(
        new THREE.CubeGeometry(5,50,200),
        platformMat,
        0
    )
    left.position.set(leftSize.width/2 - baseSize.width/2, leftSize.height/2 + baseSize.height/2, 0);
    left.castShadow = true;
    left.receiveShadow = true;

    //Right Panel
    let rightSize = {width: 5, height: 50, depth:200};
    let right = new Physijs.BoxMesh(
        new THREE.CubeGeometry(5,50,200),
        platformMat,
        0
    )
    right.position.set(-rightSize.width/2  + baseSize.width/2, rightSize.height/2 + baseSize.height/2, 0);
    right.castShadow = true;
    right.receiveShadow = true;

    //Add all panels to base
    base.add( far );
    base.add(near);
    base.add(left);
    base.add(right);

    //Add base to scene
    scene.add(base);

}