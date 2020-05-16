function moveLaser (mouseCoords){
    avatarHead.set(avatar.position.x, avatar.position.y +25, avatar.position.z-5);

    rayx = mouseCoords.x*100;
    rayy = mouseCoords.y*100;

    rayDirection.set(rayx,rayy, -100).normalize();

    //let direction = new THREE.Vector3().subVectors(rayDirection, avatarHead);

    laser.position.copy(avatarHead);
    laser.setDirection(rayDirection);
    laser.setLength(200, 0, 0);
}

function onMouseMove(event){
    mouseCoords.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );
    moveLaser(mouseCoords);

}

let numBalls = 0;

var b_count = 10; //Razeen
function onMouseDown(event) {

    if(numBalls < ammoCount){
        let sound = document.getElementById("raygun");
        //sound.play();

        mouseCoords.set(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1
        );

        let ballRadius = 3;

        let ball = new Physijs.SphereMesh(
            new THREE.SphereGeometry(ballRadius, 10, 10),
            new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('../../Resources/Textures/Dino/trippy2.jpeg'),
            }),
            10
        )

        avatarHead.set(avatar.position.x, avatar.position.y +25, avatar.position.z-5);

        rayx = mouseCoords.x*100;
        rayy = mouseCoords.y*100;

        rayDirection.set(rayx,rayy, -100);

        raycaster.set(avatarHead, rayDirection);

        ball.castShadow = true;
        ball.receiveShadow = true;

        ball.position.copy(avatarHead);

        scene.add(ball);

        //Razeen
        b_count = b_count-1; //Reduces number of balls left for user to shoot
        document.getElementById("ball_count").innerHTML = b_count; // changes ammo count on html

        pos.copy( raycaster.ray.direction );
        pos.multiplyScalar( 2 );
        ball.setLinearVelocity( new THREE.Vector3( pos.x, pos.y, pos.z ) );

        numBalls++;
    }else{
        //alert("Out of ammo");
        //Razeen
        //     let m = document.querySelectorAll('h2'); //Checks if header exists
            let Message = document.getElementById("Game_Over"); //Pulls Game_Over div from HTML doc

            // if(m){ //If header exists, remove it
            //   Message.removeChild(m);
            // }

            let message = document.createElement('h2'); // Creates a new Header Tag
            let text = document.createTextNode("Game Over, Restart?");
            message.appendChild(text);


            Message.appendChild(message);
            //
            // var btn = document.createElement('button'); // Creates a return button
            //
            // var btnText = document.createTextNode("Restart Game");
            // btn.appendChild(btnText);
            // let BTN = document.getElementById("Game_Over_Button");//Pulls Game_Over div from HTML doc
            // BTN.appendChild(btn);
    }

}


