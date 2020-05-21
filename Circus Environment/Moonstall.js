function makeStall(){

    var stall = makeWall2();

    var wall = makeWall();
    wall.position.x = 200;
    wall.position.z = 150;
    wall.rotation.y = Math.PI/2;

    var wall2 = makeWall();
    wall2.position.x = -200;
    wall2.position.z = 150;
    wall2.rotation.y = Math.PI/2;

    var roof = makeRoof();
    roof.position.y = 185;
    roof.position.z = 100;
    roof.rotation.y = Math.PI/4;

    stall.add(miniGame());
    stall.add(wall);
    stall.add(wall2);
    stall.add(roof);

    return stall;
}

function miniGame(){

    var geoWall1 = new THREE.BoxBufferGeometry(400,200,10);
    var geoWall2 = new THREE.BoxBufferGeometry(300,150,10);
    var matWall = new THREE.MeshLambertMaterial({color: 0xFFFFFF,
        map : textureLoader.load('../Resources/Textures/Mikayla/neontexture1.jpg')});

    var game = new THREE.Mesh(geoWall1,matWall);
    game.position.y = -10;
    var side1 = new THREE.Mesh(geoWall2,matWall);
    side1.position.x = -190;
    side1.position.y = -50;
    side1.position.z = 150;
    side1.rotation.y = Math.PI/2;
    var side2 = side1.clone();
    side2.position.x = 190;
    game.add(side1);
    game.add(side2);
    game.position.y = -30;
    game.position.z = 10;

    var geoBall = new THREE.SphereBufferGeometry(30,20,20);
    var matBall = new THREE.MeshBasicMaterial({map : textureLoader.load('../Resources/Textures/Dino/trippy2.jpeg')});
    var ball = new THREE.Mesh(geoBall,matBall);
    ball.position.x = -150;
    ball.position.y = -75;
    ball.position.z = 200;

    var ball2 = ball.clone();
    ball2.scale.set(0.5,0.5,0.5);
    ball2.position.x = 150;
    ball2.position.y = -80;
    ball2.position.z = 250;

    var ball3 = ball.clone();
    ball3.position.x = 150;
    ball3.position.z = 20;

    var ball4 = ball2.clone();
    ball4.position.x = -150;
    ball4.position.z = 250;

    var ball5 = ball2.clone();
    ball5.position.x = 30;
    ball5.position.y = -90;
    ball5.position.z = 20;

    var ball6 = ball.clone();
    ball6.position.x = -60;
    ball6.position.y = -75;
    ball6.position.z = 60;

    var ball7 = ball2.clone();
    ball7.position.x = 30;
    ball7.position.y = -75;
    ball7.position.z = 200;

    game.add(ball);
    game.add(ball2);
    game.add(ball3);
    game.add(ball4);
    game.add(ball5);
    game.add(ball6);
    game.add(ball7);
    return game;

}

function makeRoof(){

    var geometry = new THREE.ConeGeometry(350,75,4);
    var material = new THREE.MeshBasicMaterial({ map : textureLoader.load('../Resources/Textures/Mikayla/right.png')});

    return new THREE.Mesh(geometry,material);
}

function makeWall2(){

    var geoWall = new THREE.CubeGeometry(400,300,10);
    var matWall = new THREE.MeshBasicMaterial({ map : textureLoader.load('../Resources/Textures/Mikayla/right.png')});

    return new THREE.Mesh(geoWall,matWall);
}

function makeWall(){

    var geoWall = new THREE.CubeGeometry(300,300,10);
    var matWall = new THREE.MeshBasicMaterial({ map : textureLoader.load('../Resources/Textures/Mikayla/right.png')});

    return new THREE.Mesh(geoWall,matWall);
}




