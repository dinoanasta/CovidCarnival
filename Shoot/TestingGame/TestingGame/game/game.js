
Physijs.scripts.worker = '../js/physijs_worker.js';
Physijs.scripts.ammo = '../js/ammo.js';

var initScene, render, renderer, scene, camera, box, target, bullet, controls, newBullet, tempStuff;
var framerate = 0;

const materialArray = [];
const texture_ft = new THREE.TextureLoader().load('tropic_ft.jpg');
const texture_bk = new THREE.TextureLoader().load('tropic_bk.jpg');
const texture_up = new THREE.TextureLoader().load('tropic_up.jpg');
const texture_dn = new THREE.TextureLoader().load('tropic_dn.jpg');
const texture_rt = new THREE.TextureLoader().load('tropic_rt.jpg');
const texture_lf = new THREE.TextureLoader().load('tropic_lf.jpg');


materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

for (let i = 0; i < 6; i++) {
    materialArray[i].side = THREE.BackSide;
}

target = new Physijs.SphereMesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x000000 }),
    0
);
target.__dirtyPosition = true;
target.position.set(0, 0, 0);

bullet = new Physijs.SphereMesh(
    new THREE.SphereGeometry(5, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x0000ff }),
    0.5
);

bullet.position.set(0, 0, -100);

box = new THREE.Mesh(
    new THREE.BoxGeometry(1000, 1000, 1000),
    materialArray,
    0
);

tempStuff=new Physijs.SphereMesh(
    new THREE.SphereGeometry(10, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0xffffff }),
    0
);
tempStuff.__dirtyPosition = true;
tempStuff.position.set(0, 0, 100);

initScene = function () {
    renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene = new Physijs.Scene;

    camera = new THREE.PerspectiveCamera(
        55,
        window.innerWidth / window.innerHeight,
        45,
        30000
    );
    camera.position.set(0, 0, -250);
    scene.add(camera);


    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.minDistance = 250;
    controls.maxDistance = 250;
    controls.enableDamping = true;


    scene.add(target);
    tempStuff.addEventListener('collision', function (other_object, relative_velocity, relative_rotation, contact_normal) {
        console.log("youre in kak my bru");
        tempStuff.__dirtyPosition = true;
        targetempStufft.position.set(100, 50, 0);
        
        
        
        //scene.remove(bullet);
        //bullet.setLinearVelocity(new THREE.Vector3(0, 0, 0));
        //scene.add(bullet);
        // `this` has collided with `other_object` with an impact speed of `relative_velocity` and a rotational force of `relative_rotation` and at normal `contact_normal`
    });


    //scene.add(bullet);
    //scene.add(bullet);

    scene.add(tempStuff);

    scene.add(box);

    document.addEventListener('keyup', event => {
        if (event.code === 'Space') {
            console.log('Space release')
            scene.remove(bullet);
        }
    });

    document.addEventListener('keydown', event => {
        if (event.code === 'Space') {
            console.log('Space in')
            newBullet = bullet.clone(true);
            scene.add(newBullet);
            newBullet.__dirtyPosition = true;
            newBullet.position.set(-1*camera.position.x, -1*camera.position.y, -1*camera.position.z);
            newBullet.setLinearVelocity(new THREE.Vector3(3*(target.position.x-camera.position.x), 3*(target.position.y-camera.position.y), 3*(target.position.z-camera.position.z)));


            console.log(camera.position);

        }
    });

    requestAnimationFrame(render);
};

render = function () {
    renderer.render(scene, camera); // render the scene
    //console.log(camera.position);
    scene.simulate();
    
    //target.setLinearVelocity(new THREE.Vector3(0, 0, 0));
    bullet.setLinearVelocity(new THREE.Vector3(-0.5*camera.position.y, 0.5*camera.position.y, camera.position.z));
    //newBullet.setLinearVelocity(new THREE.Vector3(0, 0, 1000));
    controls.update();

    requestAnimationFrame(render);
};

window.onload = initScene();
