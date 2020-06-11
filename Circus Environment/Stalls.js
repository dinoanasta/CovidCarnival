function addMoonStall(){

    //makeStall() creates the Play stall structure.
    //function is in Moonstall.js
    moonStall = makeStall();

    // Rotating moon
    var moonGeo = new THREE.SphereGeometry(75,200,200);
    var moonMat = new THREE.MeshLambertMaterial({ map : textureLoader.load('../Resources/Textures/Mikayla/moon7.jfif')});

    moon = new THREE.Mesh(moonGeo,moonMat);
    moon.position.y = 300;
    moon.position.z = 100;

    //Play game text above stall
    fontLoader.load('../Resources/Fonts/droid_serif_bold.typeface.json',function (font) {
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

        var text = new THREE.Mesh(geoText,matText);
        text.position.x = -200;
        text.position.y = 250;
        text.position.z = 100;
        moonStall.add(text);

    })

    moonStall.scale.set(1.8,1.5,1.8);
    moonStall.position.x = 0;
    moonStall.position.y = 300;
    moonStall.position.z = -900;

    //add stall to scene
    scene.add(moonStall);
}

function addCreditStall(){

    //makeStall() creates the credit stall structure.
    //function is in Moonstall.js
    creditStall = makeCreditsStall();

    //Credits text above stall
    fontLoader.load('../Resources/Fonts/droid_serif_bold.typeface.json',function (font) {
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

        var text = new THREE.Mesh(geoText,matText);
        text.position.x = -160;
        text.position.y = 250;
        text.position.z = 100;
        creditStall.add(text);

    })

    //astronaut models inside stall
    loader.load("../Models/hiphop/scene.gltf", function (object) {
        let astro = object.scene.children[0];
        astro.material = new THREE.MeshPhongMaterial({
            color: 0xff00ff
        });

        astro.rotation.z = -Math.PI/10;
        astro.scale.set(50, 50, 50);
        astro.position.set(150,-150, 300);

        creditStall.add(astro);

    });

    loader.load("../Models/hiphop/scene.gltf", function (object) {
        let astro = object.scene.children[0];

        astro.material = new THREE.MeshPhongMaterial({
            color: 0xff00ff
        });

        astro.rotation.z = Math.PI/10;
        astro.scale.set(50, 50, 50);
        astro.position.set(-150,-150, 300);
        creditStall.add(astro);

    });

    loader.load("../Models/robotUFO/scene.gltf", function (object) {
        globe = object.scene.children[0];

        globe.scale.set(0.25, 0.25, 0.25);
        globe.position.set(0,-100, 150);
        creditStall.add(globe);
    });



    creditStall.scale.set(1.2,1.2,1.2);
    creditStall.position.x = 600;
    creditStall.position.y = 200;
    creditStall.position.z = 300;
    creditStall.rotation.y = -Math.PI/6;

    // add stall to scene
    scene.add(creditStall);
}

function addBonusStall(){
    //makeStall() creates the bonus stall structure.
    //this stall is the prize podium
    //after a level is completed the player recieves a prize in this stall
    //function is in Moonstall.js
    bonusStall = makeBonusStall();

    //prizes text above stall
    //this text is reflective
    fontLoader.load('../Resources/Fonts/droid_serif_bold.typeface.json',function (font) {
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

        var refMat = new THREE.MeshBasicMaterial( {envMap: sphereCamera.renderTarget.texture} );

        var text = new THREE.Mesh(geoText,refMat);
        text.position.x = -100;
        text.position.y = 500;
        text.scale.set(1.3,1.3,1.3);
        bonusStall.add(text);

    })

    bonusStall.scale.set(1,1,1);
    bonusStall.position.x = -500;
    bonusStall.position.y = 200;
    bonusStall.position.z = 450;
    bonusStall.rotation.y = Math.PI/6;

    //adds stall to scene
    scene.add(bonusStall);
}

function addPrize1() {

    //adds level 1 prize to bonus stall
    loader.load("../Models/ufo/scene.gltf", function (object) {
        prize1 = object.scene.children[0];

        prize1.material = new THREE.MeshPhongMaterial({
            color: 0xff00ff
        });

        prize1.scale.set(0.35, 0.35, 0.35);
        prize1.position.set(200, 80, 0);
        bonusStall.add(prize1);
    });
}

function addPrize2() {

    //adds level 2 prize to bonus stall
    loader.load("../Models/plush/scene.gltf", function (object) {
        prize2 = object.scene.children[0];

        prize2.material = new THREE.MeshPhongMaterial({
            color: 0xff00ff
        });

        prize2.scale.set(3, 3, 3);
        prize2.position.set(-200, 150, 0);
        bonusStall.add(prize2);

    });

}

function addPrize3() {

    //adds level 3 prize to bonus stall
    loader.load("../Models/rocket2/scene.gltf", function (object) {
        prize3 = object.scene.children[0];

        prize3.material = new THREE.MeshPhongMaterial({
            color: 0xff00ff
        });

        prize3.rotation.x = -Math.PI;
        prize3.scale.set(40, 40, 40);
        prize3.position.set(0, 150, 0);
        bonusStall.add(prize3);

    });
}
