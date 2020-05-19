function addMoonStall(){
    moonStall = makeStall();
    moonStall.position.z = -300;

    var moonGeo = new THREE.SphereGeometry(75,200,200);
    var moonMat = new THREE.MeshLambertMaterial({ map : textureLoader.load('../Resources/Textures/Mikayla/moon7.jfif')});

    moon = new THREE.Mesh(moonGeo,moonMat);
    moon.position.y = 300;
    moon.position.z = 100;

    //moonStall.add(moon);
    makeText();

    moonStall.scale.set(1.3,1.3,1.3);
    moonStall.position.x = 0;
    moonStall.position.y = 200;
    moonStall.position.z = -50;

    scene.add(moonStall);
}

function makeText(){
    textLoader.load('../Resources/Fonts/droid_serif_bold.typeface.json',function (font) {
        var geoText = new THREE.TextBufferGeometry( "1" , {
            font : font,
            size : 50,
            height : 30,
            curveSegments: 20,
            bevelEnabled : true,
            bevelThickness: 10,
            bevelSize: 10,
            bevelOffset : 0,
            bevelSegments: 4

        });

        var matText = new THREE.MeshNormalMaterial({ map : textureLoader.load('../Resources/Textures/Mikayla/neontexture1.jpg')})

        moonText = new THREE.Mesh(geoText,matText);
        text.position.x = -20;
        text.position.y = 250;
        text.position.z = 100;
        moonStall.add(text);

    })

    return moonText;
}