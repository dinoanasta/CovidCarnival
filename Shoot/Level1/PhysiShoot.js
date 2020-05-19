function aimer(){

}

function moveLaser (mouseCoords){
    avatarHead.set(avatarPosition.x, avatarPosition.y +25, avatarPosition.z-5);

    rayx = mouseCoords.x*200;
    rayy = mouseCoords.y*100;

    rayDirection.set(rayx,rayy-40, -100).normalize();

    laser.position.copy(avatarHead);
    laser.setDirection(rayDirection);
    laser.setLength(200, 0.00001, 0.00001);

    // let aimer = new THREE.Shape();
    // aimer.moveTo(0, 2);
    // aimer.lineTo(0, -2);
    //
    // aimer.moveTo(2, 0);
    // aimer.lineTo(-2, 0);
    //
    // var extrudeSettings = { amount: 3, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    //
    // var geometry = new THREE.ExtrudeBufferGeometry( aimer, extrudeSettings );
    //
    // var mesh = new THREE.Mesh(
    //     geometry,
    //     new THREE.MeshStandardMaterial({
    //             color: "red"
    //         }
    //     )
    // );
    //
    // mesh.position.set(rayDirection.x, rayDirection.y, -60);
    // scene.add(mesh);


}

function onMouseMove(event){
    mouseCoords.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );
    moveLaser(mouseCoords);


}

let numBalls = 0;
function onMouseDown(event) {

    if(numBalls < ammoCount){
        sound = document.getElementById("raygun");
        //sound.play();

        mouseCoords.set(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1
        );

        let ballRadius = 3;

        ball = new Physijs.SphereMesh(
            new THREE.SphereGeometry(ballRadius, 10, 10),
            new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('../../Resources/Textures/Dino/trippy2.jpeg'),
            }),
            10
        )

        avatarHead.set(avatarPosition.x, avatarPosition.y +25, avatarPosition.z-5);

        rayx = mouseCoords.x*200;
        rayy = mouseCoords.y*100;

        rayDirection.set(rayx,rayy-40, -100);

        raycaster.set(avatarHead, rayDirection);

        ball.castShadow = true;
        ball.receiveShadow = true;

        ball.position.copy(avatarHead);

        scene.add(ball);

        pos.copy( raycaster.ray.direction );
        pos.multiplyScalar( 2 );
        ball.setLinearVelocity( new THREE.Vector3( pos.x, pos.y, pos.z ) );

        numBalls++;

        document.getElementById("ballCountValue").innerHTML = ammoCount-numBalls; // changes ammo count on html
    }else{
        decideOutcome();
    }
}


