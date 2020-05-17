
Physijs.scripts.worker = '/js/physijs_worker.js';
Physijs.scripts.ammo = '/js/ammo.js';

var initScene, render, renderer, scene, camera, box, target, target2, bullet, controls, newBullet, tempStuff;
var points = 0;
var duck;
var duckGroup = new THREE.Group();
var duckArray = [new THREE.Mesh(), new THREE.Mesh(), new THREE.Mesh(), new THREE.Mesh(), new THREE.Mesh(), new THREE.Mesh(), new THREE.Mesh(), new THREE.Mesh(), new THREE.Mesh()];
var pos = new THREE.Vector3();
var frameNumber = 0;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var mouseCoords = new THREE.Vector2();

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

var light;  // A light shining from the direction of the camera; moves with the camera.
light = new THREE.DirectionalLight();
light.position.set(-100, 100, 1);



const materialArray = [];
const texture_ft = new THREE.TextureLoader().load('/textures/torture_ft.jpg');
const texture_bk = new THREE.TextureLoader().load('/textures/torture_bk.jpg');
const texture_up = new THREE.TextureLoader().load('/textures/torture_up.jpg');
const texture_dn = new THREE.TextureLoader().load('/textures/torture_dn.jpg');
const texture_rt = new THREE.TextureLoader().load('/textures/torture_rt.jpg');
const texture_lf = new THREE.TextureLoader().load('/textures/torture_lf.jpg');


materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

for (let i = 0; i < 6; i++) {
    materialArray[i].side = THREE.BackSide;
}

target = new THREE.Mesh(
    new THREE.CubeGeometry(50, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    0
);
target.position.set(0, 0, 0);

target2 = target.clone(true);
target2.rotation.z = Math.PI / 2;


box = new THREE.Mesh(
    new THREE.BoxGeometry(1000, 1000, 1000),
    materialArray,
    0
);

tempStuff = new Physijs.BoxMesh(
    new THREE.BoxGeometry(70, 70, 70),
    new THREE.MeshPhongMaterial({
        color: 0x00ffff,
        opacity: 0.0001,
        transparent: true
    }),
    1
);

var tempStuffArray = [tempStuff.clone(true), tempStuff.clone(true), tempStuff.clone(true), tempStuff.clone(true), tempStuff.clone(true), tempStuff.clone(true), tempStuff.clone(true), tempStuff.clone(true), tempStuff.clone(true)];

function onMouseMove(event) {

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

var loader = new THREE.GLTFLoader();
loader.load('/models/glTF/Duck.gltf', handle_load);

function handle_load(gltf) {
    duck = gltf.scene.children[0];
    //duck.material = new THREE.MeshBasicMaterial();
    duck.scale.set(0.3, 0.3, 0.3);
    //duck.position.set(tempStuff.position.x - 5, tempStuff.position.y - 5, tempStuff.position.z);

    duckArray[0] = duck.clone(true);
    duckArray[0].position.set(coordinates[0].x, coordinates[0].y, coordinates[0].z);

    duckArray[1] = duck.clone(true);
    duckArray[1].position.set(coordinates[1].x, coordinates[1].y, coordinates[1].z);

    duckArray[2] = duck.clone(true);
    duckArray[2].position.set(coordinates[2].x, coordinates[2].y, coordinates[2].z);

    duckArray[3] = duck.clone(true);
    duckArray[3].position.set(coordinates[3].x, coordinates[3].y, coordinates[3].z);

    duckArray[4] = duck.clone(true);
    duckArray[4].position.set(coordinates[4].x, coordinates[4].y, coordinates[4].z);

    duckArray[5] = duck.clone(true);
    duckArray[5].position.set(coordinates[5].x, coordinates[5].y, coordinates[5].z);

    duckArray[6] = duck.clone(true);
    duckArray[6].position.set(coordinates[6].x, coordinates[6].y, coordinates[6].z);

    duckArray[7] = duck.clone(true);
    duckArray[7].position.set(coordinates[7].x, coordinates[7].y, coordinates[7].z);

    duckArray[8] = duck.clone(true);
    duckArray[8].position.set(coordinates[8].x, coordinates[8].y, coordinates[8].z);


    duckGroup.add(duckArray[0]);
    duckGroup.add(duckArray[1]);
    duckGroup.add(duckArray[2]);
    duckGroup.add(duckArray[3]);
    duckGroup.add(duckArray[4]);
    duckGroup.add(duckArray[5]);
    duckGroup.add(duckArray[6]);
    duckGroup.add(duckArray[7]);
    duckGroup.add(duckArray[8]);


}

tempStuffArray[0].position.set(coordinates[0].x + 5, coordinates[0].y + 25, coordinates[0].z);
tempStuffArray[0].__dirtyPosition = true;
tempStuffArray[1].position.set(coordinates[1].x + 5, coordinates[1].y + 25, coordinates[1].z);
tempStuffArray[1].__dirtyPosition = true;
tempStuffArray[2].position.set(coordinates[2].x + 5, coordinates[2].y + 25, coordinates[2].z);
tempStuffArray[2].__dirtyPosition = true;
tempStuffArray[3].position.set(coordinates[3].x + 5, coordinates[3].y + 25, coordinates[3].z);
tempStuffArray[3].__dirtyPosition = true;
tempStuffArray[4].position.set(coordinates[4].x + 5, coordinates[4].y + 25, coordinates[4].z);
tempStuffArray[4].__dirtyPosition = true;
tempStuffArray[5].position.set(coordinates[5].x + 5, coordinates[5].y + 25, coordinates[5].z);
tempStuffArray[5].__dirtyPosition = true;
tempStuffArray[6].position.set(coordinates[6].x + 5, coordinates[6].y + 25, coordinates[6].z);
tempStuffArray[6].__dirtyPosition = true;
tempStuffArray[7].position.set(coordinates[7].x + 5, coordinates[7].y + 25, coordinates[7].z);
tempStuffArray[7].__dirtyPosition = true;
tempStuffArray[8].position.set(coordinates[8].x + 5, coordinates[8].y + 25, coordinates[8].z);
tempStuffArray[8].__dirtyPosition = true;

// scene.add(tempStuffArray[0].clone(true));
// scene.add(tempStuffArray[1].clone(true));
// scene.add(tempStuffArray[2].clone(true));
// scene.add(tempStuffArray[3].clone(true));
// scene.add(tempStuffArray[4].clone(true));
// scene.add(tempStuffArray[5].clone(true));
// scene.add(tempStuffArray[6].clone(true));
// scene.add(tempStuffArray[7].clone(true));
// scene.add(tempStuffArray[8].clone(true));

initScene = function () {
    renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene = new Physijs.Scene;
    scene.setGravity(new THREE.Vector3(0, 0, 0));

    camera = new THREE.PerspectiveCamera(
        55,
        window.innerWidth / window.innerHeight,
        45,
        30000
    );
    camera.position.set(0, 0, -250);
    scene.add(camera);
    camera.add(light);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    // controls.minDistance = 240;
    // controls.maxDistance = 250;



    scene.add(target);
    scene.add(target2);

    scene.add(box);

    scene.add(duckGroup);
    scene.add(tempStuffArray[0]);
    scene.add(tempStuffArray[1]);
    scene.add(tempStuffArray[2]);
    scene.add(tempStuffArray[3]);
    scene.add(tempStuffArray[4]);
    scene.add(tempStuffArray[5]);
    scene.add(tempStuffArray[6]);
    scene.add(tempStuffArray[7]);
    scene.add(tempStuffArray[8]);



    for (let i = 0; i < 9; i++) {

        tempStuffArray[i].addEventListener('collision', function (other_object, relative_velocity, relative_rotation, contact_normal) {
            console.log("hello my friend")
            if (tempStuffArray[i].position.z > 0) {
                tempStuffArray[i].position.z = tempStuffArray[i].position.z - 600;
                duckArray[i].position.z = duckArray[i].position.z - 600;
                tempStuffArray[i].__dirtyPosition = true;
            }
            else if (tempStuffArray[i].position.z < 0) {
                tempStuffArray[i].position.z = tempStuffArray[i].position.z - 600 * -1;
                duckArray[i].position.z = duckArray[i].position.z - 600 * -1;
                tempStuffArray[i].__dirtyPosition = true;
            }
            ducksKilled++;

        });

    }

    document.addEventListener('keyup', event => {
        if (event.code === 'Space') {
            //console.log('Space release')
            //scene.remove(bullet);
        }
    });

    document.addEventListener('keydown', event => {
        if (event.code === 'Space') {
            //console.log('Space in');

            mouseCoords.set(
                mouse.x * 0.005,
                mouse.y * 0.005
            );

            raycaster.setFromCamera(mouseCoords, camera);


            bullet = new Physijs.SphereMesh(
                new THREE.SphereGeometry(5, 8, 8),
                new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
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
    });

    requestAnimationFrame(render);
};




render = function () {
    // render the scene
    //console.log(camera.position);
    raycaster.setFromCamera(mouse, camera);

    // tempStuffArray[0].rotation.y+=0.01;
    // duckArray[0].rotation.y+=0.01;
    // tempStuffArray[0].__dirtyRotation=true;
    // box.rotation.y+=0.05;
    // box.rotation.z+=0.05;
    // box.rotation.x+=0.1;
    //duckGroup.children[10].rotation.y+=0.01;

    target.rotation.z += 0.05;
    target.rotation.x += 0.05;
    target2.rotation.z += 0.05;

    for (var i = 0; i < 9; i++) {
        duckArray[i].rotation.y += 0.1;
        duckArray[i].rotation.x += 0.1;
    }
    //duckGroup.rotation.y+=0.1;

    box.rotation.x -= 0.01;
    box.rotation.y += 0.05;
    box.rotation.z += 0.1;
    frameNumber++;



    // if (frameNumber >= 30) {
    //     frameNumber = 0;
    // }
    // else if (frameNumber >= 0 && frameNumber < 15) {
    //     camera.position.z += 5;
    // }
    // else if (frameNumber >= 15 && frameNumber < 30) {
    //     camera.position.z -= 5;
    // }
    // duckGroup.rotation.z+=0.01;
    // tempStuffArray[0].rotation.z+=0.01;
    // console.log(frameNumber);
    //duckArray[0].rotation.y+=0.01;
    // for (let i = 0; i < 9; i+2) {
    //     tempStuffArray[i].position.z -= 1;
    //     tempStuffArray[i].__dirtyPosition = true;
    // }
    // duckGroup.rotation.y+=0.01;

    //duckGroup.rotation.x+=0.01;

    //duckArray[0].position.x+= 1;
    //duckArray[0].position.set(tempStuff.position.x, tempStuff.position.y, tempStuff.position.z)
    // duckGroup.position.y = tempStuff.position.y - 20;
    // duckGroup.position.z = tempStuff.position.z - 390;


    //

    //console.log(camera.position.x - target.position.x);
    //target.setLinearVelocity(new THREE.Vector3(0, 0, 0));
    //bullet.setLinearVelocity(new THREE.Vector3(-0.5*camera.position.y, 0.5*camera.position.y, camera.position.z));
    //newBullet.setLinearVelocity(new THREE.Vector3(0, 0, 1000));
    scene.simulate();
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
};

window.onload = initScene();
window.addEventListener('mousemove', onMouseMove, false);