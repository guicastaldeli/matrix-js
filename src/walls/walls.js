import * as THREE from 'three';
import { createMatrixEffect } from '../main/matrix.js';
import { defaultColor } from '../main/matrix.js';

//Left Wall
    export function createLeftWall() {
        //Scale & Pos
            const scale = {
                width: 0.01,
                height: 12,
                depth: 8
            };

            const pos = {
                x: -2.5,
                y: 0,
                z: 2,
            }
        //

        const wall = new THREE.Group();
        const geometry = new THREE.BoxGeometry(scale.width, scale.height, scale.depth);
        const material = new THREE.MeshPhongMaterial({ color: defaultColor, shininess: 30, emissive: defaultColor });
        const leftWall = new THREE.Mesh(geometry, material);

        const matrixEffect = createMatrixEffect('../../assets/fonts/VP Pixel Simplified_Regular.json', {
            rangeX: [-pos.x / 2, pos.x * 2.8],
            rangeZ: [-pos.z / 0.8, pos.z],
            startY: scale.height / 2,
            endY: -scale.height / 2,
            cols: 15,
            size: 0.3,
        });
        
        matrixEffect.rotation.y = Math.PI / 2;
        leftWall.position.x = pos.x;
        leftWall.position.y = pos.y;
        leftWall.position.z = pos.z;

        wall.add(leftWall);
        wall.add(matrixEffect);

        return wall;
    }
//

//Right Wall
    export function createRightWall() {
        //Scale & Pos
            const scale = {
                width: 0.01,
                height: 12,
                depth: 8
            }

            const pos = {
                x: 2.5,
                y: 0,
                z: 2,
            }
        //

        const wall = new THREE.Group();
        const geometry = new THREE.BoxGeometry(scale.width, scale.height, scale.depth);
        const material = new THREE.MeshPhongMaterial({ color: defaultColor, shininess: 30, emissive: defaultColor });
        const rightWall = new THREE.Mesh(geometry, material);

        const matrixEffect = createMatrixEffect('../../assets/fonts/VP Pixel Simplified_Regular.json', {
            rangeX: [-pos.x / 2, pos.x * 2.8],
            rangeZ: [-pos.z / 0.8, pos.z],
            startY: scale.height / 2,
            endY: -scale.height / 2,
            cols: 15,
            size: 0.3,
        });

        matrixEffect.rotation.y = -Math.PI / 2;
        rightWall.position.x = pos.x;
        rightWall.position.y = pos.y;
        rightWall.position.z = pos.z;

        wall.add(rightWall);
        wall.add(matrixEffect);

        return wall;
    }
//

//Center Wall
    export function createCenterWall() {
        //Scale & Pos
            const scale = {
                width: 6,
                height: 12,
                depth: 0
            }

            const pos = {
                x: 0,
                y: 0,
                z: -1,
            }
        //

        
        const wall = new THREE.Group();
        const geometry = new THREE.BoxGeometry(scale.width, scale.height, scale.depth);
        const material = new THREE.MeshPhongMaterial({ color: 'rgb(0, 28, 6)', shininess: 30 });
        const centerWall = new THREE.Mesh(geometry, material);

        const matrixEffect = createMatrixEffect('../../assets/fonts/VP Pixel Simplified_Regular.json', {
            rangeX: [-scale.width / 2, scale.width / 2],
            rangeZ: [-pos.z - 1.9, pos.z],
            startY: scale.height / 2,
            endY: -scale.height / 2,
            cols: 15,
            size: 0.3,
        });

        centerWall.position.x = pos.x;
        centerWall.position.y = pos.y;
        centerWall.position.z = pos.z;

        wall.add(centerWall);
        wall.add(matrixEffect);

        return wall;
    }
//