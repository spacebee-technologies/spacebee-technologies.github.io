
let scene, camera, renderer;
let mixer;


var clock = new THREE.Clock();

init();
animate();

function init() {
  
  
  window.addEventListener('resize', onResize, false);

  var container = document.getElementById('canvas');

  //console.log(document.getElementById('canvas').style.height);

  var width =container.clientWidth;
  var height= getHeigth(container);

  //document.body.appendChild( container );
  //document.body.appendChild( container );


  scene = new THREE.Scene();
  // scene.background = new THREE.Color(0x1c1d26);

const loaderbg = new THREE.TextureLoader();
loaderbg.load('images/The_Moon_pillars.jpg', function(texture)
            {
             scene.background = texture;  
            });

  //0x1c1d26
  camera = new THREE.PerspectiveCamera(1,width/height,1,5000);

 camera.position.set(210, 200, 210);




camera.updateProjectionMatrix();
  //controls = new THREE.OrbitControls(camera);
  //controls.addEventListener('change', renderer);

  hlight = new THREE.AmbientLight (0x404040,2);
  scene.add(hlight);

  directionalLight = new THREE.DirectionalLight( 0xffffff, 4 );
  scene.add( directionalLight );




  const pointLight =  new THREE.PointLight( 0xffffff, 2, 1000 );
  pointLight.position.set( 0, 1, 6 );
  scene.add( pointLight );


  // const pointLight2 =  new THREE.PointLight( 0xffffff, 2, 1000 );
  // pointLight2.position.set( 1, 6, 0 );
  // scene.add( pointLight2 );


  const pointLight3 =  new THREE.PointLight( 0xffffff, 2, 1000 );
  pointLight3.position.set(-5,0,0 );
  scene.add( pointLight3 );


  const pointLight4 =  new THREE.PointLight( 0xffffff,2, 1000 ,2);
  pointLight4.position.set( 0, -5, 0);
  scene.add( pointLight4 );

  // const pointLight5 =  new THREE.PointLight( 0xffffff,2, 1000 );
  // pointLight5.position.set( 20, -20, 20 );
  // scene.add( pointLight5 );

  
  //var drawingSurface = document.getElementById( 'canvas' );
//	var renderer = new THREE.WebGLRenderer( { antialias: true, canvas: drawingSurface } );

  renderer = new THREE.WebGLRenderer({ antialias: true});


  renderer.setSize(width,height);
//   renderer.setPixelRatio( window.devicePixelRatio );
//   renderer.setSize(320, 180);
//   document.body.appendChild(renderer.domElement);
  
  //document.getElementById("c").appendChild(renderer.domElement);
  //document.body.appendChild(renderer.domElement);

  container.append(renderer.domElement);
  //container.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, container);

  

  let loader = new THREE.GLTFLoader();
  loader.load('model/Moonrovernew.glb', function(gltf){
    
   // console.log(gltf.scene.children[0]);
    
    rover = gltf.scene;
    rover.scale.set(2,2,2);
    scene.add(gltf.scene);

    
    rover.position.set(69,6,102);
 


    mixer = new THREE.AnimationMixer( gltf.scene);
  


    //const clip = gltf.animations[0];

    mixer.clipAction(gltf.animations[0]).play();
    //const action = mixer.clipAction(clip);
    //action.play();
    // var action = mixer.clipAction( gltf.animations[0]);
    // action.reset().play();
    // scene.add(gltf.scene);
    //if ( mixer ) mixer.update( clock.getDelta());

    // clock = new THREE.Clock();
    // var delta = clock.getDelta();
    // mixer.update( delta );
    //console.log(action);

    animate();
   

  });
}
function animate() {

  
  requestAnimationFrame(animate);
  // controls.update();
  if (mixer) mixer.update (clock.getDelta ());  
  renderer.render(scene,camera);
 
}





  function onResize() {

    var container = document.getElementById('canvas');

    var height =getHeigth(container);
    var width =container.clientWidth;
    //console.log(container.style.maxHeight);
    camera.position.set(150, 150, 170);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function getHeigth(container){
    //Para que cuando cambie a estar un arriba del otro, tenga una altura bien (cambia a ese modo en heigth=736)
    var ancho =document.body.clientWidth;

    if (ancho > 736) {
      
      height= document.getElementById('two').clientHeight;
    }
    if (ancho<=736){
      var height =container.clientHeight;
    }
    return height;
  }

