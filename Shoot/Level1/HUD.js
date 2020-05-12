function createWindMeter(){
    windMeter = new THREE.Object3D();

    //Outer ring
    let circleGeo = new THREE.TorusGeometry(5, 0.5, 100,100);
    let circleMat = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load('resources/red.jpg'),
        roughness: 0.6,
        metalness: 1
    });
    let circle = new THREE.Mesh(circleGeo, circleMat);
    windMeter.add(circle);

    //Arrow
    let arrow = new THREE.Object3D();

    let arrowMat = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load('resources/red.jpg'),
        roughness: 0.6,
        metalness: 1
    });

    let arrowCylGeo = new THREE.CylinderGeometry(0.5, 0.5, 4, 100, 100) ;

    let arrowHeadGeo = new THREE.ConeGeometry(1, 2, 100, 100);

    let arrowCyl = new THREE.Mesh(arrowCylGeo, arrowMat);

    let arrowHead =new THREE.Mesh(arrowHeadGeo, arrowMat);

    arrowCyl.translateY(-1);
    arrow.add(arrowCyl);

    arrowHead.translateY(2);
    arrow.add(arrowHead);

    if(xDir === "right"){
        //Rotate right
        arrow.rotateZ(3*Math.PI / 2);
    }else if(xDir === "left"){
        //Rotate left
        arrow.rotateZ(Math.PI / 2);
    }

    windMeter.add(arrow);

    //Text

    let loader = new THREE.FontLoader();

    loader.load( 'js/helvetiker_bold.typeface.json', function ( font ) {
        let textGeo = new THREE.TextBufferGeometry( xStrength , {
            font: font,
            size: 2,
            height: 1,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.1,
            bevelSize: 0.1,
            bevelOffset: 0,
            bevelSegments: 1
        } );

        let textMat = new THREE.MeshStandardMaterial({
            map: new THREE.TextureLoader().load('resources/icecream.jpg'),
            roughness: 0.6,
            metalness: 1
        });

        let text = new THREE.Mesh(textGeo, textMat);
        text.translateX(-4);
        text.translateY(6);
        windMeter.add(text);
    } );

    return windMeter;
}

function setupHUD(){
    //create the scene
    let HUD = new THREE.Scene();
    HUD.background = new THREE.Color( 0x000000 );


    //create camera
    let HUDcamera = new THREE.OrthographicCamera(100, 100, 100, 100, 0.2, 5000);
    HUDcamera.position.set( 0, 30, 70 );
    HUDcamera.lookAt(new THREE.Vector3(0, 0, 0));

    //Add directional light
    let HUDlight = new THREE.DirectionalLight( 0xffffff , 1);
    HUDlight.color.setHSL( 0.1, 1, 0.95 );
    HUDlight.position.set( -1, 1.75, 1 );
    HUDlight.position.multiplyScalar( 100 );


    HUDlight.castShadow = true;

    HUDlight.shadow.mapSize.width = 2048;
    HUDlight.shadow.mapSize.height = 2048;

    let d = 50;

    HUDlight.shadow.camera.left = -d;
    HUDlight.shadow.camera.right = d;
    HUDlight.shadow.camera.top = d;
    HUDlight.shadow.camera.bottom = -d;

    HUDlight.shadow.camera.far = 13500;

    HUDcamera.add( HUDlight );
    HUD.add(HUDcamera);

    var renderer = new THREE.WebGLRenderer( { alpha: true } );
    renderer.setClearColor( 0x000000, 0 ); // the default

    let HUDrenderer = new THREE.WebGLRenderer({ antialias: true, alpha:true});
    HUDrenderer.setClearColor( 0x000000, 0 );
    HUDrenderer.setPixelRatio( window.devicePixelRatio );
    HUDrenderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( HUDrenderer.domElement );

    HUDrenderer.gammaInput = true;
    HUDrenderer.gammaOutput = true;

    HUDrenderer.shadowMap.enabled = true;

    //Add wind meter
    let windMeter = createWindMeter();
    HUD.add(windMeter);

    HUDrenderer.render(HUD, HUDcamera);


}