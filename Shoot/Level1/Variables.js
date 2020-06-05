
//HUD
let HUD, arrowSource;
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
let level = "1";
let nextLevel;
let ammoCount; //Num of balls
let score = 0;
let goal; //How many targets they have to hit to win
let gameLength; //How long the game lasts

let cubemapURLs;
let primaryStallMaterial;
let secondaryBarrierMaterial;
let ballMaterial;

//Scene and setup
let playing = false;
let cubeMap;
let renderer, scene, camera, box;
let pos = new THREE.Vector3();
let shootSound;
let hitSound;
let themeSound;
let textureLoader = new THREE.TextureLoader();
let loader = new THREE.GLTFLoader();
let camType = "third";
let countdown;
let timeLeft;
let totalScore = 0;

//PointerLockControls
let crosshair;
let controls;
var objects = [];
var FPSraycaster;
var havePointerLock;
var controlsEnabled = false;
var prevTime = performance.now();
var velocity = new THREE.Vector3();

//Mouse Coordinates and raycaster
let mouseCoords = new THREE.Vector2();
let raycaster = new THREE.Raycaster();

//Gravity variables
let xGrav, xDir, xStrength, maxGrav, minGrav, sign;
let yGrav;
let signs = [1, -1];

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

// Duck
var duckBox;
var realDuckModel;
var duckCoordinates;
var realDuckModelArray = [];
var duckBoxArray = [];

//minimap
var mapCamera;
let mapWidth = window.innerWidth/5, mapHeight = window.innerHeight/5;

//Prizes
let prizesString = "0";