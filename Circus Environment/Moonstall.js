var light = new THREE.AmbientLight(0xffffff,0.5);
scene.add(light);

var light1 = new THREE.PointLight(0xffffff,0.5);
scene.add(light1);

var textureLoader = new THREE.TextureLoader();

var stall = makeStall();
stall.position.z = -300;
makeMoon();

//added by Razeen
stall.scale.set(0.2,0.2,0.2);
stall.position.x = 0;
stall.position.y = 30;
stall.position.z = -20;
var stallHolder = new THREE.Object3D();
stallHolder.add(stall);
scene.add(stallHolder);


function makeMoon(){

    var moonGeo = new THREE.SphereGeometry(75,200,200);
    var moonMat = new THREE.MeshBasicMaterial({ map : textureLoader.load('../Resources/Textures/Mikayla/moon7.jfif')});

    var moon = new THREE.Mesh(moonGeo,moonMat);
    moon.position.y = 300;
    moon.position.z = 100;

    stall.add(moon);

    requestAnimationFrame(render);

    function render(){

        moon.rotation.y += 0.01;
        renderer.render(scene,camera);
        requestAnimationFrame(render);
    }
    renderer.render(scene,camera);

}


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
