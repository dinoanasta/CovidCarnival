function addMoonStall(){
    moonStall = makeStall();
    moonStall.position.z = -300;

    var moonGeo = new THREE.SphereGeometry(75,200,200);
    var moonMat = new THREE.MeshLambertMaterial({ map : textureLoader.load('../Resources/Textures/Mikayla/moon7.jfif')});

    moon = new THREE.Mesh(moonGeo,moonMat);
    moon.position.y = 300;
    moon.position.z = 100;

    textLoader.load('../Resources/Fonts/droid_serif_bold.typeface.json',function (font) {
        var geoText = new THREE.TextBufferGeometry( "Level 1" , {
            font : font,
            size : 50,
            height : 20,
            curveSegments: 20,
            bevelEnabled : true,
            bevelThickness: 5,
            bevelSize: 2,
            bevelOffset : 0,
            bevelSegments: 4

        });

        var matText = new THREE.MeshStandardMaterial({ map : textureLoader.load('../Resources/Textures/Dino/greenfluid2.jpg')})

        moonText = new THREE.Mesh(geoText,matText);
        moonText.position.x = -100;
        moonText.position.y = 250;
        moonText.position.z = 100;
        moonStall.add(moonText);

    })

    moonStall.scale.set(1.3,1.3,1.3);
    moonStall.position.x = 0;
    moonStall.position.y = 200;
    moonStall.position.z = -50;

    scene.add(moonStall);
}