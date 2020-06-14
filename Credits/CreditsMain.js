//Scene Variables
let light, scene, camera, ambientLight;
let renderer;
let controls;
let cubemap;

//CovidCarnival Text Variable for credits
let covidCarnivalText;
var geoText;
var matText;

//Loaders
var textureLoader = new THREE.TextureLoader();
var loader = new THREE.GLTFLoader();
var textLoader = new THREE.FontLoader();

function setupScene() {
    scene = new THREE.Scene()

    //Creation of camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        10000);

    //position of camera in 3D space
    camera.position.x = 0;
    camera.position.y = 1000;
    camera.position.z = 1500;

    // A light shining from the direction of the camera which moves with the camera.
    light = new THREE.DirectionalLight(0xFFFFFF, 0.6);
    light.position.set(0, 0, 1);
    camera.add(light);
    scene.add(camera);

    //Add ambient light
    ambientLight = new THREE.AmbientLight(0xE6E686);
    scene.add(ambientLight);

    //Creates the controls and imposes restriction for how the player can navigate the world
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.maxDistance = 2000;
    controls.minDistance = 200;
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = 15.9*Math.PI/32;
    controls.mouseButtons = {
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.ROTATE,
        LEFT: THREE.MOUSE.PAN
    }

    var textureURLs = [  // URLs of the six faces of the cubeMap map
        "../Resources/CubeMaps/skybox (2)/right.png",
        "../Resources/CubeMaps/skybox (2)/left.png",
        "../Resources/CubeMaps/skybox (2)/top.png",
        "../Resources/CubeMaps/skybox (2)/bottom.png",
        "../Resources/CubeMaps/skybox (2)/front.png",
        "../Resources/CubeMaps/skybox (2)/back.png"
    ];
    var materials = [];

    for (var i = 0; i < 6; i++) {
        var texture = new textureLoader.load( textureURLs[i] );
        materials.push( new THREE.MeshBasicMaterial( {
            color: "white",
            side: THREE.DoubleSide,

            map: texture
        } ) );

    }

    cubeMap = new THREE.Mesh( new THREE.CubeGeometry(5000,5000,5000),
        materials );
    scene.add(cubeMap);


    //Planes
    addPlanes();

    //Models
    ModelsLoad();

    //Text
    MakeText();

    //Balls
    var balls = Balls();
    balls.position.z = -1000;
    balls.position.x = -1200;
    balls.position.y = 150;
    scene.add(balls);

    var ball2 = Balls();
    ball2.position.z = -1000;
    ball2.position.x = -1700;
    ball2.position.y = 150;
    scene.add(ball2);

}



//Planes
function addPlanes() {

    //Creates the flat area of the credits
    let surfaceMaterial = new THREE.MeshPhongMaterial({
        shininess: 100,
        flatShading: true,
        map: textureLoader.load('../Resources/Textures/Dino/redblocks.jpg')});

    let surfaceGeometry = new THREE.BoxGeometry(800,800); //makes the size of the plane 1000x1000
    let groundShape = new THREE.Mesh(surfaceGeometry,surfaceMaterial,0);
    groundShape.rotation.x = -0.5*Math.PI; //rotates the plain -90 degrees

    // scene.add(groundShape);
    scene.add(groundShape);


    //Creates the flat area of the credits
    let surfaceMaterial2 = new THREE.MeshPhongMaterial({
        shininess: 100,
        flatShading: true,
        map: textureLoader.load('../Resources/Textures/Dino/greenrocks.jpg')});
    let groundShape2 = new THREE.Mesh(surfaceGeometry,surfaceMaterial2,0);
    groundShape2.rotation.x = -0.5*Math.PI; //rotates the plain -90 degrees
    groundShape2.position.z = -1000;
    groundShape2.position.x = -1500;

    scene.add(groundShape2);

    let surfaceMaterial3 = new THREE.MeshPhongMaterial({
        shininess: 100,
        flatShading: true,
        map: textureLoader.load('../Resources/Textures/Dino/bluegeo.jpg')});
    let groundShape3 = new THREE.Mesh(surfaceGeometry,surfaceMaterial3,0);
    groundShape3.rotation.x = -0.5*Math.PI; //rotates the plain -90 degrees
    groundShape3.position.z = -1000;
    groundShape3.position.x = 1500;

    scene.add(groundShape3);
}

//Loads models into te scene
function ModelsLoad() {

    loader.load("../Models/sci-fi_lantern/scene.gltf", function (object) {
        let lantern = object.scene.children[0];
        lantern.rotation.x = -0.5*Math.PI;
        //lantern.position.x = 250;
        lantern.position.y = 0;
        lantern.position.z = 170;
        lantern.scale.set(20,20,20);
        scene.add(lantern);
    });

    loader.load("../Models/glowingmushroom/scene.gltf", function (object) {
        let shroom = object.scene.children[0];
        shroom.rotation.x = -0.5 * Math.PI;
        shroom.position.x = 250;
        shroom.position.y = 20;
        shroom.position.z = -50;
        shroom.scale.set(50, 70, 50);
        scene.add(shroom);
    });

    //Sitting Alien
    loader.load("../Models/sitAlien/sitAlien.glb", function (object) {
        let shroom2 = object.scene.children[0];
        shroom2.scale.set(5, 5, 5);
        //shroom2.rotation.y = -Math.PI / 4;
        shroom2.position.x = 0;
        shroom2.position.y = 10;
        shroom2.position.z = -50;
        scene.add(shroom2);
    });

    loader.load("../Models/ufo/scene.gltf", function (object) { //Creates UFO alien model
        let ufo= object.scene.children[0];
        ufo.scale.set(0.5, 0.5, 0.5);
        //shroom2.rotation.y = -Math.PI / 4;
        ufo.position.x = 1200;
        ufo.position.y = 100;
        ufo.position.z = -1000;

        scene.add(ufo);
    });


    loader.load("../Models/plush/scene.gltf", function (object) { //Creates Plush Alien model
        let model= object.scene.children[0];
        model.scale.set(6, 6, 6);
        //shroom2.rotation.y = -Math.PI / 4;
        model.position.x = 1700;
        model.position.y = 150;
        model.position.z = -1000;

        scene.add(model);
    });

    var planGeo = new THREE.SphereBufferGeometry(80,120,120); // Creates spinning planet
    // var planGeo2 = new THREE.SphereGeometry(200,300,300);
    var planMesh = new THREE.MeshPhongMaterial({
        shininess: 0.8,
        //emissive : 0xFF091C,
        //emissiveIntensity: 0.4,
        specular: 0x03CFF0,
        map: textureLoader.load("../Resources/Textures/Dino/iridescent.jpg")
    }); //creates material and loads texture of planet

    planet = new THREE.Mesh(planGeo,planMesh);
    planet.position.x = -250;
    planet.position.y = 100;
    planet.position.z = -50;
    scene.add(planet);
}

//Actual text
function MakeText(){ //Creates Giant "Covid carnival" text
    var text1 = "All models used were \n" +
        "obtained from sketchfab.com \n " +
        "All sounds used were \n" +
        "obtained from zapsplat.com \n " +
        "All credit goes to the artists \n who have made these \n models and sounds under  \n free use and distribution.";
    var text2 = "Shooting and Game Mechanics: \n" +
        "Dino Anastasopoulos and Timothy Walters \n " +
        "Environment and Stall Design: \n" +
        "Razeen Gani and Mikayla Narothan \n" +
        "HUD Design and Model Choices: \n" +
        "Dino Anastasopoulos And Razeen Gani \n" +
        "Refraction/Reflection Design and Soundtrack: \n" +
        "Mikayla Narothan and Timothy Walters";
    var text3 = "Credit goes to Chandler Prall for \n" +
        "Physijs files and implementation \n" +
        "Credit goes out to all artists \n" +
        "for textures used within the game";

    var matText = new THREE.MeshStandardMaterial({ //Creates texture for font
        map: textureLoader.load('../Resources/Textures/Dino/bluefoil.jpg'),
    });

    textLoader.load('../Resources/Fonts/helvetiker_bold.typeface.json',function (font) {
        var geoText = new THREE.TextGeometry(text1 , { //Outlines properties and font of text
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
        //Create 3D "Covid Carnival" text mesh
        covidCarnivalText = new THREE.Mesh(geoText,matText);

        //scales and sets positions of text
        covidCarnivalText.scale.set(2,2,2);
        covidCarnivalText.position.x = -350;
        covidCarnivalText.position.y = 800;
        covidCarnivalText.position.z = 0;

        scene.add(covidCarnivalText); //adds text to world
    })

    textLoader.load('../Resources/Fonts/helvetiker_bold.typeface.json',function (font) {
        var geoText = new THREE.TextGeometry(text2 , { //Outlines properties and font of text
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

        //Create 3D "Covid Carnival" text mesh
        covidCarnivalText2 = new THREE.Mesh(geoText,matText);

        //scales and sets positions of text
        covidCarnivalText2.scale.set(2,2,2);
        covidCarnivalText2.position.x = -1900;
        covidCarnivalText2.position.y = 800;
        covidCarnivalText2.position.z = -1000;

        scene.add(covidCarnivalText2); //adds text to world
    })

    textLoader.load('../Resources/Fonts/helvetiker_bold.typeface.json',function (font) {
        var geoText = new THREE.TextGeometry(text3 , { //Outlines properties and font of text
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

        //Create 3D "Covid Carnival" text mesh
        covidCarnivalText3= new THREE.Mesh(geoText,matText);

        //scales and sets positions of text
        covidCarnivalText3.scale.set(2,2,2);
        covidCarnivalText3.position.x = 1000;
        covidCarnivalText3.position.y = 800;
        covidCarnivalText3.position.z = -1000;

        scene.add(covidCarnivalText3); //adds text to world
    })
}

//Creates The Ball Models
function Balls() {
    var game =new THREE.Object3D();
    var geoBall = new THREE.SphereBufferGeometry(50,20,20);
    var matBall = new THREE.MeshBasicMaterial({map : textureLoader.load('../Resources/Textures/Dino/redgreenliquid.jpg')});
    var ball = new THREE.Mesh(geoBall,matBall);
    ball.position.x = -150;
    ball.position.y = -55;
    ball.position.z = 100;

    var ball2 = ball.clone();
    // ball2.scale.set(0.5,0.5,0.5);
    ball2.position.x = 150;
    ball2.position.y = -60;
    ball2.position.z = 125;

    var ball3 = ball.clone();
    ball3.position.x = 150;
    ball3.position.z = 30;

    var ball6 = ball.clone();
    ball6.position.x = -60;
    ball6.position.y = -35;
    ball6.position.z = 60;

    var ball9 = ball.clone();
    //ball9.material = refMat;
    ball9.position.x = 100;
    ball9.position.z = 100;

    game.add(ball);
    game.add(ball2);
    game.add(ball3);
    game.add(ball6);
    game.add(ball9);
    return game;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    controls.update(); //Updates the orbit controls
    requestAnimationFrame( animate );
    cubeMap.rotation.y += 0.001;
    renderer.render( scene, camera );
}