function makeStall(){
    //creates basic structure of play stall
    //extra features are added in Stalls.js

    moonStallTexture = textureLoader.load('../Resources/Textures/Dino/neontexture1.jpg');

    var stall = makeWall2(moonStallTexture);

    var wall = makeWall(moonStallTexture);
    wall.position.x = 200;
    wall.position.z = 150;
    wall.rotation.y = Math.PI/2;

    var wall2 = makeWall(moonStallTexture);
    wall2.position.x = -200;
    wall2.position.z = 150;
    wall2.rotation.y = Math.PI/2;

    var roof = makeRoof(moonStallTexture);
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
    //creates basic structure of credits stall
    //extra features are added in Stalls.js

    creditStallTexture = textureLoader.load('../Resources/Textures/Dino/greenfabric.jpg');

    var stall = makeWall2(creditStallTexture);

    var wall = makeWall(creditStallTexture);
    wall.position.x = 200;
    wall.position.z = 150;
    wall.rotation.y = Math.PI/2;

    var wall2 = makeWall(creditStallTexture);
    wall2.position.x = -200;
    wall2.position.z = 150;
    wall2.rotation.y = Math.PI/2;

    var roof = makeRoof(creditStallTexture);
    roof.position.y = 185;
    roof.position.z = 100;
    roof.rotation.y = Math.PI/4;

    //stall.add(credits());
    stall.add(wall);
    stall.add(wall2);
    stall.add(roof);

    return stall;
}

function makeBonusStall(){
    //creates basic structure of bonus stall
    //this stall is the prize podium
    //has a reflective texture
    //extra features are added in Stalls.js

    var box1Geo = new THREE.BoxBufferGeometry(200,300,150);
    var box2Geo = new THREE.BoxBufferGeometry(200,200,150);
    var box3Geo = new THREE.BoxBufferGeometry(200,150,150);
    var refMat = new THREE.MeshBasicMaterial( {envMap: sphereCamera.renderTarget.texture} );

    var podium = new THREE.Mesh(box1Geo,refMat);
    podium.position.y = -100;

    var box2 = new THREE.Mesh(box2Geo,refMat);
    box2.position.x = -200
    box2.position.y = -50;
    podium.add(box2);

    var box3 = new THREE.Mesh(box3Geo,refMat);
    box3.position.x = 200;
    box3.position.y = -75;
    podium.add(box3);

    return podium;
}

function miniGame(){

    //creates a mini game that resembles the actual game
    // displayed in play stall

    var geoWall1 = new THREE.BoxBufferGeometry(400,100,50);
    var matWall = new THREE.MeshLambertMaterial({color: 0xFFFFFF,
        map : textureLoader.load('../Resources/Textures/Dino/greenfluid2.jpg')});

    var game = new THREE.Mesh(geoWall1,matWall);
    game.position.y = -100;
    game.position.z = 200;

    var geoBall = new THREE.SphereBufferGeometry(30,20,20);
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
    ball8.position.x = -130;
    ball8.position.z = 60;

    var ball9 = ball.clone();
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

    //basic roof stucture of the stalls

    var geometry = new THREE.ConeGeometry(350,75,4);
    var material = new THREE.MeshBasicMaterial({ map : texture});

    return new THREE.Mesh(geometry,material);
}

function makeWall2(texture){

    //basic back wall structure of the stalls

    var geoWall = new THREE.CubeGeometry(400,300,10);
    var matWall = new THREE.MeshBasicMaterial({ map : texture});

    return new THREE.Mesh(geoWall,matWall);
}

function makeWall(texture){

    //basic side wall structure of the stalls

    var geoWall = new THREE.CubeGeometry(300,300,10);
    var matWall = new THREE.MeshBasicMaterial({ map : texture});

    return new THREE.Mesh(geoWall,matWall);
}



