
//Degrees
var degrees=0;

//HUD
let arrowSource;
let windElement;

//FrameRate
let frameNumber = 0;

//Animation Mixer
let mixers = [];
let mixer;
let avatarAnimation;
let animationAction;

//Clock For Avatar Animation
let clock = new THREE.Clock();

//Levels
let level = "3";
let nextLevel;
let ammoCount; //Num of balls
let score = 0;
let goal; //How many targets they have to hit to win
let gameLength; //How long the game lasts
let numLevel1 = 0;
let numLevel2 = 0;
let numLevel3 = 0;
let cubemapURLs;
let primaryStallMaterial;
let secondaryBarrierMaterial;
let ballMaterial;

//Gravity variables
let xGrav, xDir, xStrength, maxGrav, minGrav, sign;
let yGrav;
let signs = [1, -1];

//Scene and setup
let playing = false;
let cubeMap;
let renderer, scene, camera, box;
let pos = new THREE.Vector3();
let camType = "third";
let countdown;
let timeLeft;
let totalScore = 0;

//Loaders
let textureLoader = new THREE.TextureLoader();
let loader = new THREE.GLTFLoader();
var fontLoader = new THREE.FontLoader();


//Sound clips
let shootSound;
let hitSound;
let themeSound;

//Mouse Coordinates and raycaster
let mouseCoords = new THREE.Vector2();
let raycaster = new THREE.Raycaster();
let crosshair1, crosshair2;


//Avatar
let avatar;
let avatarPosition = new THREE.Vector3();
let AvatarMoveDirection = { x: 0, z: 0 };
let movementBoundaries = { leftX: -38, rightX: 38, frontZ: -10, backZ: 10 };
let avatarLocalPos = { x: 0, z: 0 };

//Shooting
let beenHit = false;
let ballsArray = [];
let shotBalls = [];
let thisBall
let ball;
let numBallsShot = 0;
let avatarHead = new THREE.Vector3();
let rayx, rayy;
let rayDirection = new THREE.Vector3();
let laser;

// Targets
var duckBox;
var realDuckModel;
var duckCoordinates;
var realDuckModelArray = [];
var duckBoxArray = [];

//Minimap
var mapCamera;
let mapWidth = window.innerWidth/5, mapHeight = window.innerHeight/5;

//Prizes
let prizesString = "0";

//Pill
let pill = new THREE.Object3D();
let pillplay = false;
let pillFrame = 0;
var g=new THREE.SphereGeometry(0.1,1,1);
var m = new THREE.MeshBasicMaterial();
var sp = new Physijs.SphereMesh(g,m);
pill.add(sp);
loader.load("../Models/capsule/scene.gltf", function (object) {
    let pillNode = object.scene.children[0];
    pillNode.scale.set(2,2,2);
    pill.add(pillNode);
    //scene.add(pill);
    console.log("Pill added")
});;