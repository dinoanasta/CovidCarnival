function addMoonStall(){
    moonStall = makeStall();
    moonStall.position.z = -300;

    var moonGeo = new THREE.SphereGeometry(75,200,200);
    var moonMat = new THREE.MeshLambertMaterial({ map : textureLoader.load('../Resources/Textures/Mikayla/moon7.jfif')});

    moon = new THREE.Mesh(moonGeo,moonMat);
    moon.position.y = 300;
    moon.position.z = 100;

    moonStall.add(moon);

    moonStall.scale.set(1.3,1.3,1.3);
    moonStall.position.x = 0;
    moonStall.position.y = 200;
    moonStall.position.z = -50;

    scene.add(moonStall);
}