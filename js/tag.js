/**
 *
 * WebGL With Three.js - Lesson 6 - loading models
 * http://www.script-tutorials.com/webgl-with-three-js-lesson-6/
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Script Tutorials
 * http://www.script-tutorials.com/
 */

var lesson6 = {
  scene: null,
  camera: null,
  renderer: null,
  container: null,
  controls: null,
  clock: null,
  stats: null,

  init: function() { // Initialization

    // create main scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0xffffff, 0.0003);

    var SCREEN_WIDTH = window.innerWidth ,
        SCREEN_HEIGHT = window.innerHeight ;

    // prepare camera
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 1, FAR = 2000;
    this.camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
    this.scene.add(this.camera);
    this.camera.position.set(0, 100, 300);
    this.camera.lookAt(new THREE.Vector3(0,0,0));

    // prepare renderer
    this.renderer = new THREE.WebGLRenderer({ antialias:true });
    this.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    this.renderer.setClearColor(this.scene.fog.color);
    this.renderer.shadowMapEnabled = true;
    this.renderer.shadowMapSoft = true;

    // prepare container
    this.container = document.getElementById( 'canvas' );
    document.body.appendChild(this.container);
    this.container.appendChild(this.renderer.domElement);

    // events
    THREEx.WindowResize(this.renderer, this.camera);

    // prepare controls (OrbitControls)
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target = new THREE.Vector3(0, 0, 0);
    this.controls.maxDistance = 2000;

    // prepare clock
    this.clock = new THREE.Clock();

    // prepare stats
    this.stats = new Stats();
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.left = '50px';
    this.stats.domElement.style.bottom = '50px';
    this.stats.domElement.style.zIndex = 1;
    this.container.appendChild( this.stats.domElement );

    // add directional light
    var dLight = new THREE.DirectionalLight(0xffffff, 0);
    dLight.castShadow = true;
    dLight.position.set(0, 200, 0);
    this.scene.add(dLight);

    var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(0, 200, 0);
        spotLight.castShadow = true;
        this.scene.add(spotLight);

    // load a model
    this.loadModel();
  },
  loadModel: function() {

    // // prepare loader and load the model
    // var oLoader = new THREE.OBJMTLLoader();
    // oLoader.load('js/tag12.obj', 'js/tag12.mtl', function(object) {

    //   var SCREEN_WIDTH = window.innerWidth ,
    //     SCREEN_HEIGHT = window.innerHeight ;

    //   object.position.x = -45;
    //   object.position.y = 0;
    //   object.position.z = 0;
    //   object.scale.set(SCREEN_WIDTH/500, SCREEN_WIDTH/500, SCREEN_WIDTH/500);
    //   lesson6.scene.add(object);
    // });

    // prepare loader and load the model
      var oLoader = new THREE.OBJLoader();
      oLoader.load('js/tag12.obj', function(object, materials) {

        var colorCus = new THREE.Color("rgb(27, 26, 26)");

        // var material = new THREE.MeshFaceMaterial(materials);
        var material2 = new THREE.MeshLambertMaterial({ colorCus});

        var SCREEN_WIDTH = window.innerWidth ,
            SCREEN_HEIGHT = window.innerHeight ;

        object.traverse( function(child) {
          if (child instanceof THREE.Mesh) {

            // apply custom material
            child.material = material2;

            // enable casting shadows
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        
        object.position.x = -45;
        object.position.y = 0;
        object.position.z = 0;
        object.scale.set(SCREEN_WIDTH/500, SCREEN_WIDTH/500, SCREEN_WIDTH/500);
        lesson6.scene.add(object);
      });



  }
};

// Animate the scene
function animate() {
  requestAnimationFrame(animate);
  render();
  update();
}

// Update controls and stats
function update() {
  lesson6.controls.update(lesson6.clock.getDelta());
  lesson6.stats.update();
}

// Render the scene
function render() {
  if (lesson6.renderer) {
    lesson6.renderer.render(lesson6.scene, lesson6.camera);
  }
}

// Initialize lesson on page load
function initializeLesson() {
  lesson6.init();
  animate();
}

if (window.addEventListener)
  window.addEventListener('load', initializeLesson, false);
else if (window.attachEvent)
  window.attachEvent('onload', initializeLesson);
else window.onload = initializeLesson;


