import * as THREE from 'three';
import { createMatrixEffect, defaultColor } from '../main/matrix.js';

export function createCeil() {
    //Scale & Pos
        const scale = {
            width: 5,
            height: 0.1,
            depth: 5
        }

        const pos = {
            x: 0,
            y: 6,
            z: 0
        }
    //

    const ceil = new THREE.Group();
    const geometry = new THREE.BoxGeometry(scale.width, scale.height, scale.depth);
    const material = new THREE.MeshPhongMaterial({ color: defaultColor, shininess: 30, emissive: defaultColor });
    const baseCeil = new THREE.Mesh(geometry, material);

    const matrixEffect = createMatrixEffect('../../assets/fonts/VP Pixel Simplified_Regular.json', {
        rangeX: [-scale.width / 2, scale.width / 2.2],
        rangeZ: [-scale.depth * 1.2, scale.depth],
        startY: 2,
        endY: -2,
        cols: 15,
        size: 0.3,
    });

    matrixEffect.rotation.x = Math.PI / 2;
    baseCeil.position.x = pos.x;
    baseCeil.position.y = pos.y;
    baseCeil.position.z = pos.z;

    ceil.add(baseCeil);
    ceil.add(matrixEffect);

    return ceil;
}