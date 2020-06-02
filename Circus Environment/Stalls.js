function addMoonStall(){
    moonStall = makeStall();
    moonStall.position.z = -300;

    var moonGeo = new THREE.SphereGeometry(75,200,200);
    var moonMat = new THREE.MeshLambertMaterial({ map : textureLoader.load('../Resources/Textures/Mikayla/moon7.jfif')});

    moon = new THREE.Mesh(moonGeo,moonMat);
    moon.position.y = 300;
    moon.position.z = 100;

    textLoader.load('../Resources/Fonts/droid_serif_bold.typeface.json',function (font) {
        var geoText = new THREE.TextBufferGeometry( "PLAY GAME" , {
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
        moonText.position.x = -200;
        moonText.position.y = 250;
        moonText.position.z = 100;
        moonStall.add(moonText);

    })

    moonStall.scale.set(2,2,2);
    moonStall.position.x = 0;
    moonStall.position.y = 200;
    moonStall.position.z = -1000;

    scene.add(moonStall);
}

function addCreditStall(){
    creditStall = makeCreditsStall();

    textLoader.load('../Resources/Fonts/droid_serif_bold.typeface.json',function (font) {
        var geoText = new THREE.TextBufferGeometry( "CREDITS" , {
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
        moonText.position.x = -160;
        moonText.position.y = 250;
        moonText.position.z = 100;
        creditStall.add(moonText);

    })

    creditStall.scale.set(1.3,1.3,1.3);
    creditStall.position.x = 300;
    creditStall.position.y = 200;
    creditStall.position.z = -50;

    scene.add(creditStall);


}

function addBonusStall(){
    bonusStall = makeBonusStall();

    textLoader.load('../Resources/Fonts/droid_serif_bold.typeface.json',function (font) {
        var geoText = new THREE.TextBufferGeometry( "BONUS" , {
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
        moonText.position.x = -120;
        moonText.position.y = 250;
        moonText.position.z = 100;
        bonusStall.add(moonText);

    })

    bonusStall.scale.set(1,1,1);
    bonusStall.position.x = -300;
    bonusStall.position.y = 200;
    bonusStall.position.z = -50;

    scene.add(bonusStall);

}