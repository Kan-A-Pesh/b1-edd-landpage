import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer( { alpha: true } );
renderer.setSize( window.innerWidth * 0.9, window.innerHeight * 0.9 );
const threeCanvas = document.getElementById('three');
threeCanvas.appendChild( renderer.domElement );


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = false;
controls.enablePan = false;

controls.autoRotate = true;
controls.autoRotateSpeed = 5;

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 2;
controls.update();

const animate = () => {
    requestAnimationFrame( animate );

    controls.update();

    renderer.render( scene, camera );
}

animate();

const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth * 0.9, window.innerHeight * 0.9 );
}

window.addEventListener('resize', onWindowResize, false);
