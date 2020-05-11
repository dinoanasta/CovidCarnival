function createStallPlatform(){
    // Base
    let basePos = {x: 0, y: 0, z: 0};
    let baseScale = {x: 100, y: 2, z: 200};

    let base = new Physijs.BoxMesh(
        new THREE.BoxGeometry(),
        new THREE.MeshStandardMaterial({
            map: new THREE.TextureLoader().load('../Resources/Textures/Dino/neontexture1.jpg'),
        }),
        0
    );
    base.position.set(basePos.x, basePos.y, basePos.z);
    base.scale.set(baseScale.x, baseScale.y, baseScale.z);

    base.castShadow = true;
    base.receiveShadow = true;

    //Shooter Barrier
    let shooterBarrierPos = {x: 0, y: 5, z: 60};
    let shooterBarrierScale = {x: 100, y: 10, z: 20};

    let shooterBarrier = new Physijs.BoxMesh(
        new THREE.BoxGeometry(),
        new THREE.MeshStandardMaterial({
            map: new THREE.TextureLoader().load('../Resources/Textures/Dino/neontexture1.jpg'),
        }),
        0
    );

    shooterBarrier.position.set(shooterBarrierPos.x, shooterBarrierPos.y, shooterBarrierPos.z);
    shooterBarrier.scale.set(shooterBarrierScale.x, shooterBarrierScale.y, shooterBarrierScale.z);

    shooterBarrier.castShadow = true;
    shooterBarrier.receiveShadow = true;

    scene.add(shooterBarrier);

    scene.add(base);
}