
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

    var geo = new THREE.PlaneGeometry(1000,1000);
    var mat = new THREE.MeshBasicMaterial({
        color : 'gray'
    });
    var plane = new THREE.Mesh(geo,mat);
    plane.position.y = -150;
    //plane.position.x = -50;
    plane.position.z = 200;
    plane.rotation.x = -Math.PI/2;

    stall.add(wall);
    stall.add(wall2);
    stall.add(roof);
    //stall.add(plane);

    return stall;
}

function rotateStall(stall){

    stall.position.y = 50;
    stall.position.z = -300;
    stall.rotation.y = -Math.PI/8;
    stall.rotation.x = Math.PI/8;
}

function makeRoof(){

    var geometry = new THREE.ConeGeometry(350,75,4);
    var material = new THREE.MeshBasicMaterial({ map : textureLoader.load('../Resources/Textures/Mikayla/moon7.jfif')});

    return new THREE.Mesh(geometry,material);
}

function makeWall2(){

    var geoWall = new THREE.CubeGeometry(400,300,10);
    var matWall = new THREE.MeshBasicMaterial({ map : textureLoader.load('../Resources/Textures/Mikayla/download2.png')});

    return new THREE.Mesh(geoWall,matWall);
}

function makeWall(){

    var geoWall = new THREE.CubeGeometry(300,300,10);
    var matWall = new THREE.MeshBasicMaterial({ map : textureLoader.load('../Resources/Textures/Mikayla/download2.png')});

    return new THREE.Mesh(geoWall,matWall);
}
