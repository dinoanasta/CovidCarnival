Physijs.scripts.worker = '../js/physijs_worker.js';
Physijs.scripts.ammo = '../js/ammo.js';

var render, renderer, scene, camera, skybox, crosshair1, crosshair2, bullet, controls, newBullet, physicsTargets;
var camLight;  // A light shining from the direction of the camera; moves with the camera.

var points = 0;
var duck;
var duckGroup = new THREE.Group();
var duckArray = [new THREE.Mesh(), new THREE.Mesh(), new THREE.Mesh(), new THREE.Mesh(), new THREE.Mesh(), new THREE.Mesh(), new THREE.Mesh(), new THREE.Mesh(), new THREE.Mesh()];
var pos = new THREE.Vector3();
var frameNumber = 0;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var mouseCoords = new THREE.Vector2()

var loader = new THREE.GLTFLoader();

var ducksKilled = 0;

var coordinates = [
    new THREE.Vector3(0, 0, 250),
    new THREE.Vector3(200, 0, 250),
    new THREE.Vector3(-200, 0, 250),
    new THREE.Vector3(400, 0, 250),
    new THREE.Vector3(-400, 0, 250),
    new THREE.Vector3(0, 200, 250),
    new THREE.Vector3(0, -200, 250),
    new THREE.Vector3(0, 400, 250),
    new THREE.Vector3(0, -400, 250)
];

//Dino Variables
let timeLeft;
let playing;
let countdown;
let totalScore = 0;

function setupScene(){
    scene = new Physijs.Scene;
    scene.setGravity(new THREE.Vector3(0, 0, 0));

    camera = new THREE.PerspectiveCamera(
        55,
        window.innerWidth / window.innerHeight,
        45,
        3000
    );
    camera.position.set(0, 0, -250);

    camLight = new THREE.DirectionalLight();

    camera.add(camLight);
    scene.add(camera);

    //Orbit controls
    controls = new THREE.OrbitControls(camera, document.querySelector('.playing'));
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false;

    //Skybox
    const materialArray = [];
    const texture_ft = new THREE.TextureLoader().load('../Resources/Cubemaps/bonus1/right.png');
    const texture_bk = new THREE.TextureLoader().load('../Resources/Cubemaps/bonus1/left.png');
    const texture_up = new THREE.TextureLoader().load('../Resources/Cubemaps/bonus1/top.png');
    const texture_dn = new THREE.TextureLoader().load('../Resources/Cubemaps/bonus1/bottom.png');
    const texture_rt = new THREE.TextureLoader().load('../Resources/Cubemaps/bonus1/front.png');
    const texture_lf = new THREE.TextureLoader().load('../Resources/Cubemaps/bonus1/back.png');
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));
    for (let i = 0; i < 6; i++) {
        materialArray[i].side = THREE.BackSide;
    }

    skybox = new THREE.Mesh(
        new THREE.BoxGeometry(1000, 1000, 1000),
        materialArray,
        0
    );
    scene.add(skybox);

    //Crosshair
    crosshair1 = new THREE.Mesh(
        new THREE.CubeGeometry(50, 1, 1),
        new THREE.MeshBasicMaterial({ color: 0xff0000 }),
        0
    );
    crosshair1.position.set(0, 0, 0);

    crosshair2 = crosshair1.clone(true);
    crosshair2.rotation.z = Math.PI / 2;

    scene.add(crosshair1);
    scene.add(crosshair2);
}


function startPlaying(){
    document.getElementById("GameHUD").style.visibility = 'visible';
    document.getElementById("preGameHUD").style.visibility = 'hidden';

    playing = true;
    controls.update();

    setupTimer();
}

function setupTimer(){
    //Timer
    let length = 5;

    document.getElementById("timeValue").textContent = length;

    setTimeout( function(){
            timeLeft = length;
            countdown = setInterval(function() {
                timeLeft--;
                document.getElementById("timeValue").textContent = timeLeft;
                if (timeLeft <= 0){
                    clearInterval(countdown);
                    gameOver();
                }
            },1000);
        },
        1000
    );
}

function gameOver(){
    document.getElementById("GameHUD").style.visibility = 'hidden';
    document.getElementById("postGameHUD").style.visibility = 'visible';

    document.getElementById("gameOverText").textContent = 'Final score: ' + totalScore;
}

function setupEventHandlers() {
    window.addEventListener('keydown', handleKeyDown, false);
    window.addEventListener('keyup', handleKeyUp, false);
    window.addEventListener('mousedown', onMouseDown, false);
    window.addEventListener('resize', onWindowResize, false);

    document.getElementById("playButton").onclick = startPlaying;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseDown(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

function handleKeyUp(event){
    if (event.code == 'Space') {
        //console.log('Space release')
        //scene.remove(bullet);
    }
}

function handleKeyDown(event){
    if (event.code == 'Space') {
        //console.log('Space in');

        mouseCoords.set(
            mouse.x * 0.005,
            mouse.y * 0.005
        );

        raycaster.setFromCamera(mouseCoords, camera);

        bullet = new Physijs.SphereMesh(
            new THREE.SphereGeometry(5, 8, 8),
            new THREE.MeshLambertMaterial({ color: 0x00ff00 }),
            1
        );
        bullet.__dirtyPosition = true;
        bullet.setCcdMotionThreshold(1);
        bullet.setCcdSweptSphereRadius(0.2);
        bullet.position.copy(raycaster.ray.direction);
        bullet.position.add(raycaster.ray.origin);

        //bullet.setCcdSweptSphereRadius(0.2);
        //bullet.setCcdMotionThreshold(1);
        scene.add(bullet);
        pos.copy(raycaster.ray.direction);
        pos.multiplyScalar(250);
        bullet.setLinearVelocity(new THREE.Vector3(pos.x * 8, pos.y * 8, pos.z * 8));
    }
}

function render() {
    // render the scene
    raycaster.setFromCamera(mouseCoords, camera);

    crosshair1.rotation.z += 0.05;
    crosshair1.rotation.x += 0.05;
    crosshair2.rotation.z += 0.05;

    for (var i = 0; i < 9; i++) {
        duckArray[i].rotation.y += 0.1;
        duckArray[i].rotation.x += 0.1;
    }

    skybox.rotation.x -= 0.01;
    skybox.rotation.y += 0.05;
    skybox.rotation.z += 0.1;
    frameNumber++;

    scene.simulate();
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
};
