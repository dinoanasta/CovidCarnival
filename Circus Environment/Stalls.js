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

    moonStall.scale.set(1.8,1.5,1.8);
    moonStall.position.x = 0;
    moonStall.position.y = 300;
    moonStall.position.z = -900;

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

        var matText = new THREE.MeshStandardMaterial({ map : textureLoader.load('../Resources/Textures/Dino/liquid.jpg')})

        moonText = new THREE.Mesh(geoText,matText);
        moonText.position.x = -160;
        moonText.position.y = 250;
        moonText.position.z = 100;
        creditStall.add(moonText);

    })

 /*   sphereCamera2 = new THREE.CubeCamera(1,3000, 512);
    sphereCamera2.position.set(0, 100, 0);

    var matBall = textureLoader.load('../Resources/Textures/Dino/redgreenliquid.jpg');

    loader.load("../Models/ufo/scene.gltf", function (object) {
        let prize2 = object.scene.children[0];
        matBall.encoding = THREE.sRGBEncoding;
        matBall.flipY = false;

        prize2.material = new THREE.MeshPhongMaterial({
            map: matBall,
            color: 0xff00ff,
        });

        //prize2.material.envmap = new THREE.MeshBasicMaterial( {envMap: sphereCamera2.renderTarget.texture} );
        prize2.scale.set(0.5, 0.5, 0.5);
        prize2.position.set(0, 0, 200);
        creditStall.add(prize2);

    })*/

    creditStall.scale.set(1.2,1.2,1.2);
    creditStall.position.x = 600;
    creditStall.position.y = 200;
    creditStall.position.z = 300;
    creditStall.rotation.y = -Math.PI/6;

    scene.add(creditStall);
}

function addBonusStall(){
    bonusStall = makeBonusStall();

    textLoader.load('../Resources/Fonts/droid_serif_bold.typeface.json',function (font) {
        var geoText = new THREE.TextBufferGeometry( "PRIZES" , {
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

        var matText = new THREE.MeshStandardMaterial({ map : textureLoader.load('../Resources/Textures/Dino/liquid.jpg')})

        moonText = new THREE.Mesh(geoText,matText);
        moonText.position.x = -100;
        moonText.position.y = 500;
        moonText.scale.set(1.3,1.3,1.3);
        //moonText.position.z = 100;
        bonusStall.add(moonText);

    })

    bonusStall.scale.set(1,1,1);
    bonusStall.position.x = -500;
    bonusStall.position.y = 200;
    bonusStall.position.z = 450;
    bonusStall.rotation.y = Math.PI/6;

    scene.add(bonusStall);

}