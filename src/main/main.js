import * as THREE from 'three';

import { camera } from './camera.js';
import { initCameraControls } from './camera.js';
import { updateCamera } from './camera.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { createText } from '../logo/logo.js';
import { createGround } from '../ground/ground.js';
import { createCeil } from '../ceil/ceil.js';
import { createCenterWall } from '../walls/walls.js';
import { createLeftWall } from '../walls/walls.js';
import { createRightWall } from '../walls/walls.js';

const scene = new THREE.Scene();
export const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
    precision: 'highp'
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

document.body.appendChild(renderer.domElement);
//const controls = new OrbitControls(camera, renderer.domElement);

//Raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onMouseMove(e) {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(scene.children, true);

        let hoverInteractive = false;

        for(const intersect of intersects) {
            if(intersect.object.userData.isInteractive) {
                hoverInteractive = true;
                intersect.object.userData.onHover();
                break;
            }
        }

        if(!hoverInteractive) {
            scene.traverse((obj) => {
                if(obj.userData.isInteractive && obj.userData.onHoverExit) {
                    obj.userData.onHoverExit();
                }
            });
        }
    }

    function onClick(e) {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);

        for(const intersect of intersects) {
            if(intersect.object.userData.isInteractive && intersect.object.userData.onClick) {
                intersect.object.userData.onClick();
                break;
            }
        }
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);
//

//Lighting
    const ambientLight = new THREE.AmbientLight(0x002200, 0.5);
    scene.add(ambientLight);
//

//Render
    const renderGround = createGround();
    const renderCeil = createCeil();
    const renderCenterWall = createCenterWall();
    const renderLeftWall = createLeftWall();
    const renderRightWall = createRightWall();

    createText((renderText) => {
        scene.add(renderText);
    });
    scene.add(renderGround);
    scene.add(renderCeil);
    scene.add(renderCenterWall);
    scene.add(renderLeftWall);
    scene.add(renderRightWall);
//

function animate() {
    requestAnimationFrame(animate);
    updateCamera();

    const updObjs = [];
    scene.traverse((obj) => {
        if(obj.userData.update) {
            updObjs.push(obj);
        }
    });

    for(const obj of updObjs) {
        obj.userData.update();
    }

    renderer.render(scene, camera);
}

//Execs...
    initCameraControls();
    animate();
//