import * as THREE from 'three';

export const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.y = 0.7;
camera.position.z = 6;

const cameraControls = {
    MOVE_SPEED: -0.1,
    keyPressed: {},
    targetPos: new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z),
}

export function initCameraControls() {
    const FORWARD_LIMIT = 5;
    const BACKWARD_LIMIT = 6.1;

    window.addEventListener('wheel', (e) => {
        let newZ = cameraControls.targetPos.z;

        if(e.deltaY < 0) {
            if(newZ > FORWARD_LIMIT) {
                newZ += cameraControls.MOVE_SPEED
            }
        } else if(e.deltaY > 0) {
            if(newZ < BACKWARD_LIMIT) {
                newZ -= cameraControls.MOVE_SPEED;
            }
        }

        cameraControls.targetPos.z = newZ;
    })
}

export function updateCamera() {
    const smoothFactor = 1;
    camera.position.lerp(cameraControls.targetPos, smoothFactor);
}