function createPlane() { //Creates the flat area of the carnival
    let surfaceMaterial = new THREE.MeshPhongMaterial({
        //color: 0xE6E686,
        //specular: 0x222222,
        shininess: 100,
        flatShading: true,
        map: textureLoader.load('../Resources/Textures/Dino/redblocks.jpg')
    });

    let surfaceGeometry = new THREE.BoxGeometry(1000, 50,1000); //makes the size of the plane 1000x1000
    let groundShape = new THREE.Mesh(surfaceGeometry,surfaceMaterial,0);
    groundShape.position.y = -25;
    world.add(groundShape);
}

function CreateBarrier(StartX,StartY, StartZ) { //creates barriers of carnival
    wholeBarrier = new THREE.Object3D(); //an object3D to store the individual cylinders

    //loads textures of each cylinder
    var texture1 = textureLoader.load("../Resources/Textures/Razeen/yellow.jpg");
    var texture2 = textureLoader.load("../Resources/Textures/Razeen/red.jpg");
    var texture3 = textureLoader.load("../Resources/Textures/Razeen/purple.jpg");
    var texture4 = textureLoader.load("../Resources/Textures/Razeen/blue2.jpg");
    var geo = new THREE.CylinderGeometry(10,10,700,50,50); //creates a cylinder with radius 10 and 700 height

    //Creates the material for each of the cylinders with different emissive colours
    var mat1 = new THREE.MeshPhongMaterial({
        shininess: 0.8,
        emissive : 0xFFFB09,
        emissiveIntensity: 0.4,
        color: 0xFFFFFF,
        map: texture1
    });
    var mat2 = new THREE.MeshPhongMaterial({
        shininess: 0.8,
        emissive : 0xFF091C,
        emissiveIntensity: 0.4,
        specular: 0xf0f0f0,
        color: 0xFFFFFF,
        map: texture2
    });
    var mat3 = new THREE.MeshPhongMaterial({
        shininess: 0.8,
        emissive : 0x9207AB,
        emissiveIntensity: 0.4,
        specular: 0xf0f0f0,
        color: 0xFFFFFF,
        map: texture3
    });
    var mat4 = new THREE.MeshPhongMaterial({
        shininess: 0.8,
        emissive : 0x069AFA,
        emissiveIntensity: 0.4,
        specular: 0xf0f0f0,
        color: 0xFFFFFF,
        map: texture4
    });

    //Creates Each cylinder with the above geometry and different materials and adds it to the wholebarrier Object 3D container

    cylinder1 = new THREE.Mesh(geo,mat1,0);
    cylinder1.position.x = StartX;
    cylinder1.position.y = StartY;
    cylinder1.position.z = StartZ;
    wholeBarrier.add(cylinder1);

    cylinder2 = new THREE.Mesh(geo,mat2,0);
    cylinder2.position.x = StartX+40;
    cylinder2.position.y = StartY;
    cylinder2.position.z = StartZ+30;
    wholeBarrier.add(cylinder2);

    cylinder3 = new THREE.Mesh(geo,mat3,0);
    cylinder3.position.x = StartX+80;
    cylinder3.position.y = StartY;
    cylinder3.position.z = StartZ;
    wholeBarrier.add(cylinder3);

    cylinder4 = new THREE.Mesh(geo,mat4,0);
    cylinder4.position.x = StartX+40;
    cylinder4.position.y = StartY;
    cylinder4.position.z = StartZ-30;
    wholeBarrier.add(cylinder4);
    scene.add(wholeBarrier);
    return wholeBarrier;
}

function addBarriers(){ //creates the cylindrical and adds barriers of carnival

    barrier1 = CreateBarrier(0,20,400);
    barrier1.rotation.z = -0.5*Math.PI;
    barrier1.position.x = -10;
    barrier1.position.y =110;
    barrier1.position.z = 150;
    world.add(barrier1);
    //scene.add(barrier1);

    barrier2 = CreateBarrier(0,20,-400);
    barrier2.rotation.z = -0.5*Math.PI;
    barrier2.position.x = -10;
    barrier2.position.y = 120;
    barrier2.position.z = -150;
    world.add(barrier2);
    //scene.add(barrier2);

    barrier3= CreateBarrier(-80,10,20);
    barrier3.rotation.x = -0.5*Math.PI;
    barrier3.position.x = 620;
    barrier3.position.y = 70;
    world.add(barrier3);
    // scene.add(barrier3);

    barrier4= CreateBarrier(80,10,20);
    barrier4.rotation.x = -0.5*Math.PI;
    barrier4.position.x = -700;
    barrier4.position.y = 70;
    world.add(barrier4);
    //scene.add(barrier4);


    var tbGeo = new THREE.BoxGeometry(750,50,30); //creates wall barriers with a width of 750 and height of 50
    var tbMesh = new THREE.MeshLambertMaterial({
        map: textureLoader.load("../Resources/Textures/Dino/redfoil.jpg")
    });

    tbarrier1 = new THREE.Mesh(
        tbGeo,
        tbMesh,
        0);
    tbarrier1.position.z = -480;
    tbarrier1.position.x = -10;
    tbarrier1.position.y =25;
    world.add(tbarrier1);
    // scene.add(tbarrier1);


    tbarrier2 = new THREE.Mesh(
        tbGeo,
        tbMesh,
        0);
    tbarrier2.position.z = 480;
    tbarrier2.position.x = -10;
    tbarrier2.position.y = 25;
    world.add(tbarrier2);
    // scene.add(tbarrier2);


    tbarrier3 = new THREE.Mesh(
        tbGeo,
        tbMesh,
        0);
    tbarrier3.rotation.y = -0.5*Math.PI;
    //tbarrier3.position.z = 225;
    tbarrier3.position.x = -480;
    tbarrier3.position.y = 25;
    world.add(tbarrier3);
    // scene.add(tbarrier3);


    tbarrier4 = new THREE.Mesh(
        tbGeo,
        tbMesh,
        0);
    tbarrier4.rotation.y = -0.5*Math.PI;
    //tbarrier3.position.z = 225;
    tbarrier4.position.x = 480;
    tbarrier4.position.y = 25;
    // scene.add(tbarrier4);
    world.add(tbarrier4);

}

//Creates Giant "Covid carnival" text
function MakeText(){
    //Loads fonts and specifies characteristics
    fontLoader.load('../Resources/Fonts/helvetiker_bold.typeface.json',function (font) {
        geoText = new THREE.TextGeometry( "COVID CARNIVAL" , {
            font : font,
            size : 20,
            height :12,
            curveSegments: 10,
            bevelEnabled : true,
            bevelThickness: 2,
            bevelSize: 2,
            bevelOffset : 0,
            bevelSegments: 4

        });

        matText = new THREE.MeshStandardMaterial({
            map: textureLoader.load('../Resources/Textures/Dino/redfoil.jpg'),
        });


        //Create 3D "Covid Carnival" text mesh
        covidCarnivalText = new THREE.Mesh(geoText,matText);

        //scales and sets positions of text
        covidCarnivalText.scale.set(5,5,5);
        covidCarnivalText.position.set(0,850, 0);

        scene.add(covidCarnivalText); //adds text to world
    })
}

function loadModels(){

    //Lantern
    loader.load("../Models/sci-fi_lantern/scene.gltf", function (object) {
         let lantern = object.scene.children[0];
         lantern.rotation.x = -0.5*Math.PI;
         lantern.position.y = 0;
         lantern.position.z = 450;
         lantern.position.x = -450;
         lantern.scale.set(10,10,10);
         world.add(lantern);
    });

    //Glowing mushroom
    loader.load("../Models/glowingmushroom/scene.gltf", function (object) {
     magicMushroom = object.scene.children[0];
     magicMushroom.rotation.x = -0.5*Math.PI;
     magicMushroom.position.x = 450;
     magicMushroom.position.y = 20;
     magicMushroom.position.z = 450;
     magicMushroom.scale.set(30,50,30);
     world.add(magicMushroom);
    });

    //Sitting Alien
    loader.load("../Models/sitAlien/sitAlien.glb", function (object) {
     let sittingAlien = object.scene.children[0];
     sittingAlien.scale.set(2,2,2);
     sittingAlien.rotation.y = -Math.PI/4;
     sittingAlien.position.x = 470;
     sittingAlien.position.y = 10;
     sittingAlien.position.z = -470;
     world.add(sittingAlien);
    });

    //Creates Spinning planet
    var planGeo = new THREE.SphereBufferGeometry(60,100,100);
    // var planGeo2 = new THREE.SphereGeometry(200,300,300);
    var planMesh = new THREE.MeshPhongMaterial({
    shininess: 0.8,
    //emissive : 0xFF091C,
    //emissiveIntensity: 0.4,
    specular: 0x03CFF0,
    map: textureLoader.load("../Resources/Textures/Dino/iridescent.jpg")
    }); //creates material and loads texture of planet

    planet = new THREE.Mesh(planGeo,planMesh);
    planet.position.x = -420;
    planet.position.y = 100;
    planet.position.z = -420;
    world.add(planet);

    //scales the big world variable and adds it to the scene
    world.scale.set(2.3,2.3,2.3);
    // prizes.position.set(0,300,-50);
    // world.add(prizes);
    scene.add(world);


    //Clickable mushroom box
    mushy = new THREE.Mesh(
        new THREE.BoxGeometry(250, 200, 400),
        new THREE.MeshStandardMaterial({
            opacity: 0,
            transparent: true,
            // color: "red",
        }),
        0
    );
    mushy.position.set(1035, 200, 1035);
    scene.add(mushy);
}

function rotateObjects(){
    covidCarnivalText.rotation.y += 0.025;

    globe.rotation.z += 0.05;

    if(prize1  != null){
        prize1.rotation.z += 0.05;

    }
    if(prize2  != null){
        prize2.rotation.z += 0.05;

    }
    if(prize3  != null){
        prize3.rotation.y += 0.05;

    }
}
