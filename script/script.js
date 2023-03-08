import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

const renderer = new THREE.WebGLRenderer( { alpha: true } );
renderer.setSize( window.innerWidth * 0.9, window.innerHeight * 0.9 );
const threeCanvas = document.getElementById('three');
threeCanvas.appendChild( renderer.domElement );


const scene = new THREE.Scene();

const light = new THREE.PointLight();
light.position.set(0.8, 1.4, 1.0);
scene.add(light);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = false;
controls.enablePan = false;

controls.autoRotate = true;
controls.autoRotateSpeed = 1;

const fbxLoader = new FBXLoader()
fbxLoader.load(
    'assets/plateau_tris.fbx',
    (object) => {
        object.traverse(function (child) {
            if (child.isMesh) {
                // (child as THREE.Mesh).material = material
                if (child.material) {
                    child.material.transparent = false
                }
            }
        })
        object.scale.set(.00025, .00025, .00025)
        object.position.set(0, -1, 0)
        scene.add(object)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

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
