function createPlane() {
    let surfaceMaterial = new THREE.MeshPhongMaterial({
        //color: 0xE6E686,
        //specular: 0x222222,
        shininess: 16,
        shading: THREE.FlatShading,
        map: textureLoader.load('../Resources/Textures/Razeen/BlackBlocks.jpg')
    });

    let surfaceGeometry = new THREE.BoxGeometry(1000,1000);
    let groundShape = new Physijs.BoxMesh(surfaceGeometry,surfaceMaterial,0);
    groundShape.rotation.x = -0.5*Math.PI;

    scene.add(groundShape);
}

function CreateBarrier(StartX,StartY, StartZ) {
    wholeBarrier = new THREE.Object3D();

    var texture1 = textureLoader.load("../Resources/Textures/Razeen/yellow.jpg");
    var texture2 = textureLoader.load("../Resources/Textures/Razeen/red.jpg");
    var texture3 = textureLoader.load("../Resources/Textures/Razeen/purple.jpg");
    var texture4 = textureLoader.load("../Resources/Textures/Razeen/blue2.jpg");
    var geo = new THREE.CylinderGeometry(10,10,700,50,50);

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

    cylinder1 = new Physijs.CylinderMesh(geo,mat1,0);
    cylinder1.position.x = StartX;
    cylinder1.position.y = StartY;
    cylinder1.position.z = StartZ;
    wholeBarrier.add(cylinder1);

    cylinder2 = new Physijs.CylinderMesh(geo,mat2,0);
    cylinder2.position.x = StartX+40;
    cylinder2.position.y = StartY;
    cylinder2.position.z = StartZ+30;
    wholeBarrier.add(cylinder2);

    cylinder3 = new Physijs.CylinderMesh(geo,mat3,0);
    cylinder3.position.x = StartX+80;
    cylinder3.position.y = StartY;
    cylinder3.position.z = StartZ;
    wholeBarrier.add(cylinder3);

    cylinder4 = new Physijs.CylinderMesh(geo,mat4,0);
    cylinder4.position.x = StartX+40;
    cylinder4.position.y = StartY;
    cylinder4.position.z = StartZ-30;
    wholeBarrier.add(cylinder4);
    scene.add(wholeBarrier);
    return wholeBarrier;
}

function addBarriers(){

    barrier1 = CreateBarrier(0,20,400);
    barrier1.rotation.z = -0.5*Math.PI;
    barrier1.position.x = -10;
    barrier1.position.y = 190;
    barrier1.position.z = -500;
    scene.add(barrier1);

    barrier2 = CreateBarrier(0,20,-400);
    barrier2.rotation.z = -0.5*Math.PI;
    barrier2.position.x = -10;
    barrier2.position.y = 190;
    barrier1.position.z = 100;
    scene.add(barrier2);

    barrier3= CreateBarrier(-80,10,20);
    barrier3.rotation.x = -0.5*Math.PI;
    barrier3.position.x = 600;
    barrier3.position.y = 130;
    scene.add(barrier3);

    barrier4= CreateBarrier(80,10,20);
    barrier4.rotation.x = -0.5*Math.PI;
    barrier4.position.x = -600;
    barrier4.position.y = 130;
    scene.add(barrier4);

    var tbGeo = new THREE.BoxGeometry(750,80,30);
    var tbMesh = new THREE.MeshNormalMaterial();
    tbarrier1 = new Physijs.BoxMesh(tbGeo,tbMesh,0);
    tbarrier1.position.z = -480;
    tbarrier1.position.x = -10;
    tbarrier1.position.y =45;
    scene.add(tbarrier1);

    var coverGeo = new THREE.BoxGeometry(750,80);
    var ctexture1 = textureLoader.load("../Resources/Textures/Razeen/abstract.jpg");
    var cMesh1 = new THREE.MeshLambertMaterial({map:ctexture1});
    cover1 = new THREE.Mesh(coverGeo,cMesh1);
    cover1.position.z = -465;
    cover1.position.x = -10;
    cover1.position.y =45;
    scene.add(cover1);

    tbarrier2 = new Physijs.BoxMesh(tbGeo,tbMesh,0);
    tbarrier2.position.z = 480;
    tbarrier2.position.x = -10;
    tbarrier2.position.y = 45;
    scene.add(tbarrier2);

    var ctexture2 = textureLoader.load("../Resources/Textures/Razeen/abstract2.jpg");
    var cMesh2 = new THREE.MeshLambertMaterial({map:ctexture2});
    cover2 = new THREE.Mesh(coverGeo,cMesh2);
    cover2.position.z = 465;
    cover2.position.x = -10;
    cover2.position.y =45;
    scene.add(cover2);

    tbarrier3 = new Physijs.BoxMesh(tbGeo,tbMesh,0);
    tbarrier3.rotation.y = -0.5*Math.PI;
    //tbarrier3.position.z = 225;
    tbarrier3.position.x = -480;
    tbarrier3.position.y = 45;
    scene.add(tbarrier3);

    var ctexture3 = new THREE.TextureLoader().load("../Resources/Textures/Razeen/love.jpg");
    var cMesh3 = new THREE.MeshLambertMaterial({map:ctexture3});
    cover3 = new THREE.Mesh(coverGeo,cMesh3);
    //cover3.position.z = 210;
    cover3.rotation.y = -0.5*Math.PI;
    cover3.position.x = -465;
    cover3.position.y =45;
    scene.add(cover3);

    tbarrier4 = new Physijs.BoxMesh(tbGeo,tbMesh,0);
    tbarrier4.rotation.y = -0.5*Math.PI;
    //tbarrier3.position.z = 225;
    tbarrier4.position.x = 480;
    tbarrier4.position.y = 45;
    scene.add(tbarrier4);

    var ctexture4 = new THREE.TextureLoader().load("../Resources/Textures/Razeen/astronaut.jpg");
    var cMesh4 = new THREE.MeshLambertMaterial({map:ctexture4});
    cover4 = new THREE.Mesh(coverGeo,cMesh4);
    //cover3.position.z = 210;
    cover4.rotation.y = -0.5*Math.PI;
    cover4.position.x = 465;
    cover4.position.y =45;
    scene.add(cover4);

}

function loadModels(){

     loader.load("../Models/sci-fi_lantern/scene.gltf", function (object) {
         let lantern = object.scene.children[0];
         lantern.rotation.x = -0.5*Math.PI;
         lantern.position.y = 20
         lantern.position.z = 450;
         lantern.position.x = -450;
         lantern.scale.set(15,15,15);
         scene.add(lantern);
     });

     loader.load("../Models/low_poly_glowing_mushroom/scene.gltf", function (object) {
         let shroom = object.scene.children[0];
         shroom.rotation.x = -0.5*Math.PI;
         shroom.position.x = 450;
         shroom.position.y = 10;
         shroom.position.z = 450;
         shroom.scale.set(60,80,50);
         scene.add(shroom);
     });
     //
     loader.load("../Models/mushroom/scene.gltf", function (object) {
         let shroom2 = object.scene.children[0];
         shroom2.rotation.x = -0.5*Math.PI;
         shroom2.position.x = 450;
         shroom2.position.y = 100;
         shroom2.position.z = -600;
         shroom2.scale.set(60,80,50);
         scene.add(shroom2);
     });
     //
     // loader.load("../Models/subwoofer/scene.gltf", function (object) {
     //     let speaker = object.scene.children[0];
     //     speaker.rotation.x = -0.5*Math.PI;
     //     speaker.rotation.z = 0.25*Math.PI;
     //     speaker.position.x = -225;
     //     speaker.position.y = 250;
     //     speaker.position.z = -460;
     //     speaker.scale.set(5,5,5);
     //     scene.add(speaker);
     // });

    function MakeText(){

        var loader = new THREE.FontLoader();

        loader.load('../Resources/Fonts/helvetiker_bold.typeface.json',function (font) {
            var geoText = new THREE.TextBufferGeometry( "COVID CARNIVAL" , {
                font : font,
                size : 50,
                height : 20,
                curveSegments: 16,
                bevelEnabled : true,
                bevelThickness: 5,
                bevelSize: 5,
                bevelOffset : 0,
                bevelSegments: 4

            });

            var matText = new THREE.MeshLambertMaterial({
                color : 'red'
            })

            text = new THREE.Mesh(geoText,matText);
            //geoText.computeBoundingBox();
            //geoText.boundingBox.getCenter(text.position).multiplyScalar(-1);
            //geoText.boundingBox.getCenter(text.position).multiplyScalar(-1);

            text.scale.set(2,2,2);
            text.position.x = -550;
            text.position.y = 1000;
            text.position.z = 100;

            scene.add(text);
        });
    }

    MakeText();

    var planGeo = new THREE.SphereGeometry(70,100,100);
    var planGeo2 = new THREE.SphereGeometry(200,300,300);
    var planMesh = new THREE.MeshPhongMaterial({
        shininess: 0.8,
        //emissive : 0xFF091C,
        //emissiveIntensity: 0.4,
        specular: 0x03CFF0,
        map: textureLoader.load("../Resources/Textures/Razeen/vortex.jpg")
    });

    planet = new Physijs.Mesh(planGeo,planMesh);
    planet.position.x = -480;
    planet.position.y = 70;
    planet.position.z = -450;

    planet2 = new Physijs.Mesh(planGeo2,planMesh);
    planet2.position.y = 800;
    planet2.position.z = 50;

    scene.add(planet);
    scene.add(planet2);



}
