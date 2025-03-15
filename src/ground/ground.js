import * as THREE from 'three';
import { createMatrixEffect, defaultColor } from '../main/matrix.js';

export function createGround() {
    //Scale & Pos
        const scale = {
            width: 6,
            height: 0.1,
            depth: 5
        }

        const pos = {
            x: 0,
            y: -3.5,
            z: 1.5,
        }
    //

    const ground = new THREE.Group();
    const geometry = new THREE.BoxGeometry(scale.width, scale.height, scale.depth);
    const material = new THREE.MeshPhongMaterial({ color: defaultColor, shininess: 30, emissive: 'rgb(0, 14, 2)' });
    const baseGround = new THREE.Mesh(geometry, material);

    const matrixEffect = createMatrixEffect('../../assets/fonts/VP Pixel Simplified_Regular.json', {
        rangeX: [-scale.width / 2.5, scale.width / 2.5],
        rangeZ: [-scale.depth / 1.44, scale.depth / 2],
        startY: 0.5,
        endY: -4,
        cols: 15,
        size: 0.3,
    });

    matrixEffect.rotation.x = -Math.PI / 2;
    baseGround.position.x = pos.x;
    baseGround.position.y = pos.y;
    baseGround.position.z = pos.z;

    ground.add(baseGround);
    ground.add(matrixEffect);

    return ground;
}