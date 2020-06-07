function makeStall(){
    var texture = textureLoader.load('../Resources/Textures/Dino/neontexture1.jpg');

    var stall = makeWall2(texture);

    var wall = makeWall(texture);
    wall.position.x = 200;
    wall.position.z = 150;
    wall.rotation.y = Math.PI/2;

    var wall2 = makeWall(texture);
    wall2.position.x = -200;
    wall2.position.z = 150;
    wall2.rotation.y = Math.PI/2;

    var roof = makeRoof(texture);
    roof.position.y = 185;
    roof.position.z = 100;
    roof.rotation.y = Math.PI/4;

    stall.add(miniGame());
    stall.add(wall);
    stall.add(wall2);
    stall.add(roof);

    return stall;
}

function makeCreditsStall(){
    var texture = textureLoader.load('../Resources/Textures/Dino/greenfabric.jpg');

    var stall = makeWall2(texture);

    var wall = makeWall(texture);
    wall.position.x = 200;
    wall.position.z = 150;
    wall.rotation.y = Math.PI/2;

    var wall2 = makeWall(texture);
    wall2.position.x = -200;
    wall2.position.z = 150;
    wall2.rotation.y = Math.PI/2;

    var roof = makeRoof(texture);
    roof.position.y = 185;
    roof.position.z = 100;
    roof.rotation.y = Math.PI/4;

    stall.add(wall);
    stall.add(wall2);
    stall.add(roof);

    return stall;
}

function makeBonusStall(){
    var texture = textureLoader.load('../Resources/Textures/Dino/tealtexture.jpg');


    /*   var stall = makeWall2(texture);

       var wall = makeWall(texture);
       wall.position.x = 200;
       wall.position.z = 150;
       wall.rotation.y = Math.PI/2;

       var wall2 = makeWall(texture);
       wall2.position.x = -200;
       wall2.position.z = 150;
       wall2.rotation.y = Math.PI/2;

       var roof = makeRoof(texture);
       roof.position.y = 185;
       roof.position.z = 100;
       roof.rotation.y = Math.PI/4;

       stall.add(wall);
       stall.add(wall2);
       stall.add(roof);*/

    var box1Geo = new THREE.BoxBufferGeometry(200,300,150);
    var box2Geo = new THREE.BoxBufferGeometry(200,200,150);
    var box3Geo = new THREE.BoxBufferGeometry(200,150,150);
    var material = new THREE.MeshBasicMaterial({ map : texture});

    var podium = new THREE.Mesh(box1Geo,material);
    podium.position.y = -100;
    var box2 = new THREE.Mesh(box2Geo,material);
    box2.position.x = -200
    box2.position.y = -50;
    podium.add(box2);

    var box3 = new THREE.Mesh(box3Geo,material);
    box3.position.x = 200;
    box3.position.y = -75;
    podium.add(box3);


  /*  stall.add(box1);

    return stall;*/

    return podium;
}

function miniGame(){

    var geoWall1 = new THREE.BoxBufferGeometry(400,100,50);
    // var geoWall2 = new THREE.BoxBufferGeometry(300,150,10);
    var matWall = new THREE.MeshLambertMaterial({color: 0xFFFFFF,
        map : textureLoader.load('../Resources/Textures/Dino/greenfluid2.jpg')});

    var game = new THREE.Mesh(geoWall1,matWall);
    game.position.y = -100;
    game.position.z = 200;

    sphereCamera = new THREE.CubeCamera(1,3000, 512);
    sphereCamera.position.set(0, 100, 0);

    var geoBall = new THREE.SphereBufferGeometry(30,20,20);
    var refMat = new THREE.MeshBasicMaterial( {envMap: sphereCamera.renderTarget.texture} );
    var matBall = new THREE.MeshBasicMaterial({map : textureLoader.load('../Resources/Textures/Dino/redgreenliquid.jpg')});
    var ball = new THREE.Mesh(geoBall,matBall);
    ball.position.x = -150;
    ball.position.y = -35;
    ball.position.z = 100;

    var ball2 = ball.clone();
    ball2.scale.set(0.5,0.5,0.5);
    ball2.position.x = 150;
    ball2.position.y = -40;
    ball2.position.z = 125;

    var ball3 = ball.clone();
    ball3.position.x = 150;
    ball3.position.z = 30;

    var ball4 = ball2.clone();
    ball4.position.x = -100;
    ball4.position.z = 130;

    var ball5 = ball2.clone();
    ball5.position.x = 30;
    ball5.position.y = -50;
    ball5.position.z = 40;

    var ball6 = ball.clone();
    ball6.position.x = -60;
    ball6.position.y = -35;
    ball6.position.z = 60;

    var ball7 = ball2.clone();
    ball7.position.x = 30;
    ball7.position.y = -35;
    ball7.position.z = 100;

    var ball8 = ball2.clone();
    ball8.material = refMat;
    ball8.position.x = -130;
    ball8.position.z = 60;

    var ball9 = ball.clone();
    ball9.material = refMat;
    ball9.position.x = 100;
    ball9.position.z = 100;

    game.add(ball);
    game.add(ball2);
    game.add(ball3);
    game.add(ball4);
    game.add(ball5);
    game.add(ball6);
    game.add(ball7);
    game.add(ball8);
    game.add(ball9);
    return game;

}

function makeRoof(texture){

    var geometry = new THREE.ConeGeometry(350,75,4);
    var material = new THREE.MeshBasicMaterial({ map : texture});

    return new THREE.Mesh(geometry,material);
}

function makeWall2(texture){

    var geoWall = new THREE.CubeGeometry(400,300,10);
    var matWall = new THREE.MeshBasicMaterial({ map : texture});

    return new THREE.Mesh(geoWall,matWall);
}

function makeWall(texture){

    var geoWall = new THREE.CubeGeometry(300,300,10);
    var matWall = new THREE.MeshBasicMaterial({ map : texture});

    return new THREE.Mesh(geoWall,matWall);
}




