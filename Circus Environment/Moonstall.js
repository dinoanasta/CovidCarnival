
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
    var side1 = new THREE.Mesh(geoWall2,matWall);
    side1.position.x = -190;
    side1.position.y = -50;
    side1.position.z = 150;
    side1.rotation.y = Math.PI/2;
    var side2 = side1.clone();
    side2.position.x = 190;
    game.add(side1);
    game.add(side2);
    game.position.y = -50;

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


