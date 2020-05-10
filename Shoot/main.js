//variable declaration section
let controls;

let astro
var astros
var astroObject
var meshes

let laser

let Loader

let physicsWorld, scene, camera, renderer, rigidBodies = [], tmpTrans = null

let ballObject = null, moveDirection = { left: 0, right: 0, forward: 0, back: 0 }

let windMeter

let avatarPosition
let avatarObject = null,
    AvatarMoveDirection = { left: 0, right: 0, forward: 0, back: 0 },
    tmpPos = new THREE.Vector3(), tmpQuat = new THREE.Quaternion();

let ammoTmpPos = null, ammoTmpQuat = null;
let mouseCoords = new THREE.Vector2(), raycaster = new THREE.Raycaster();

let xDir, xStrength;

const STATE = { DISABLE_DEACTIVATION : 4 }

const FLAGS = { CF_KINEMATIC_OBJECT: 2 }
//Ammojs Initialization

Ammo().then(start)
function start (){
    tmpTrans = new Ammo.btTransform();
    ammoTmpPos = new Ammo.btVector3();
    ammoTmpQuat = new Ammo.btQuaternion();

    setupPhysicsWorld();

    setupGraphics();

    createPlatform();
    createShooterBarrier();
    createBall();
    createAvatar();
    //createKinematicBox();

    setupEventHandlers();
    renderFrame();

}

function setupPhysicsWorld(){

    let collisionConfiguration  = new Ammo.btDefaultCollisionConfiguration(),
        dispatcher              = new Ammo.btCollisionDispatcher(collisionConfiguration),
        overlappingPairCache    = new Ammo.btDbvtBroadphase(),
        solver                  = new Ammo.btSequentialImpulseConstraintSolver();

    physicsWorld = new Ammo.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration);

    let xGrav = Math.random()*40 - 20;
    physicsWorld.setGravity(new Ammo.btVector3(xGrav, -10, 0));

    if(xGrav>0){
        xDir = "right";
    }else if(xGrav<0){
        xDir = "left";
    }

    if(Math.abs(xGrav) >= 14){
        xStrength = "strong";
    }else if(Math.abs(xGrav) <= 6){
        xStrength = "weak";
    }else if(Math.abs(xGrav) > 6 && Math.abs(xGrav) < 14){
        xStrength = "average";
    }
    console.log(xGrav, xDir, xStrength);
}

function setupGraphics(){

    //create clock for timing
    clock = new THREE.Clock();

    //create the scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xbfd1e5 );

    //create camera
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.2, 500 );
    camera.position.set( 0, 60, 150 );
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    //Add hemisphere light
    let hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.1 );
    hemiLight.color.setHSL( 0.6, 0.6, 0.6 );
    hemiLight.groundColor.setHSL( 0.1, 1, 0.4 );
    hemiLight.position.set( 0, 50, 0 );
    scene.add( hemiLight );

    //Add directional light
    let dirLight = new THREE.DirectionalLight( 0xffffff , 1);
    dirLight.color.setHSL( 0.1, 1, 0.95 );
    dirLight.position.set( -1, 1.75, 1 );
    dirLight.position.multiplyScalar( 100 );
    scene.add( dirLight );

    dirLight.castShadow = true;

    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;

    let d = 50;

    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;

    dirLight.shadow.camera.far = 13500;

    //Setup the renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setClearColor( 0xbfd1e5 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    renderer.shadowMap.enabled = true;

}

function renderFrame(){

    let deltaTime = clock.getDelta();

    moveBall();
    moveAvatar();
    updatePhysics( deltaTime );

    renderer.render( scene, camera );

    requestAnimationFrame( renderFrame );

}


function setupEventHandlers(){
    window.addEventListener( 'keydown', handleKeyDown, false);
    window.addEventListener( 'keyup', handleKeyUp, false);
    window.addEventListener('mousedown', onMouseDown, false);
    window.addEventListener('mousemove', onMouseMove, false);
}


function handleKeyDown(event){

    let keyCode = event.keyCode;

    switch(keyCode){
        //Ball
        case 87: //W: FORWARD
            moveDirection.forward = 1
            break;

        case 83: //S: BACK
            moveDirection.back = 1
            break;

        case 65: //A: LEFT
            moveDirection.left = 1
            break;

        case 68: //D: RIGHT
            moveDirection.right = 1
            break;

        //Avatar
        case 38: //↑: FORWARD
            AvatarMoveDirection.forward = 1
            break;

        case 40: //↓: BACK
            AvatarMoveDirection.back = 1
            break;

        case 37: //←: LEFT
            AvatarMoveDirection.left = 1
            break;

        case 39: //→: RIGHT
            AvatarMoveDirection.right = 1
            break;
    }
}


function handleKeyUp(event){
    let keyCode = event.keyCode;

    switch(keyCode){
        //Ball
        case 87: //FORWARD
            moveDirection.forward = 0
            break;

        case 83: //BACK
            moveDirection.back = 0
            break;

        case 65: //LEFT
            moveDirection.left = 0
            break;

        case 68: //RIGHT
            moveDirection.right = 0
            break;

        //Avatar
        case 38: //↑: FORWARD
            AvatarMoveDirection.forward = 0
            break;

        case 40: //↓: BACK
            AvatarMoveDirection.back = 0
            break;

        case 37: //←: LEFT
            AvatarMoveDirection.left = 0
            break;

        case 39: //→: RIGHT
            AvatarMoveDirection.right = 0
            break;


    }

}


function updatePhysics( deltaTime ){

    // Step world
    physicsWorld.stepSimulation( deltaTime, 10 );

    // Update rigid bodies
    for ( let i = 0; i < rigidBodies.length; i++ ) {
        let objThree = rigidBodies[ i ];
        let objAmmo = objThree.userData.physicsBody;
        let ms = objAmmo.getMotionState();
        if ( ms ) {

            ms.getWorldTransform( tmpTrans );
            let p = tmpTrans.getOrigin();
            let q = tmpTrans.getRotation();
            objThree.position.set( p.x(), p.y(), p.z() );
            objThree.quaternion.set( q.x(), q.y(), q.z(), q.w() );

        }
    }

}