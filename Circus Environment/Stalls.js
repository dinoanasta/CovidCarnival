function addMoonStall(){
    stall = makeStall();
    stall.position.z = -300;

    var moonGeo = new THREE.SphereGeometry(75,200,200);
    var moonMat = new THREE.MeshBasicMaterial({ map : textureLoader.load('../Resources/Textures/Mikayla/moon7.jfif')});

    moon = new THREE.Mesh(moonGeo,moonMat);
    moon.position.y = 300;
    moon.position.z = 100;

    stall.add(moon);

    stall.scale.set(0.2,0.2,0.2);
    stall.position.x = 0;
    stall.position.y = 30;
    stall.position.z = -20;
    stallHolder.add(stall);
    scene.add(stallHolder);
}