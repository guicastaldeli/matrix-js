import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

export function createText(call) {
    const fontLoader = new FontLoader();
    const content = 'MATRIX';

    const pos = {
        x: -2.32,
        y: 0.8,
        z: 1.2,
    }

    const pointLight = new THREE.SpotLight('rgb(118, 255, 141)', 150, 8);
    pointLight.position.set(pos.x + 6, pos.y + 2, pos.z + 3);

    fontLoader.load(
        '../../assets/fonts/VP Pixel Simplified_Regular.json',
        (font) => {
            const geometry = new TextGeometry(content, {
                font: font,
                size: 1,
                depth: 0.2,
                curveSegments: 4,
                bevelEnabled: false,
            });

            geometry.computeBoundingBox();
            const centerOffset = 0 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
    
            const textMesh = new THREE.Mesh(geometry, [
                new THREE.MeshPhongMaterial({ color: 'rgb(41, 41, 41)', shininess: 30, emissive: 'rgb(30, 30, 30)' }),
                new THREE.MeshPhongMaterial({ color: 'rgb(26, 26, 26)', shininess: 30, emissive: 'rgb(20, 20, 20)' }),
            ]);
            
            textMesh.position.x = pos.x - centerOffset;
            textMesh.position.y = pos.y;
            textMesh.position.z = pos.z;

            //Cursor Hover
                //Outline
                    const outlineGeometry = new TextGeometry(content, {
                        font: font,
                        size: 1,
                        depth: 0.2,
                        curveSegments: 4,
                        bevelEnabled: true,
                        bevelThickness: 0.03,
                        bevelSize: 0.02,
                        bevelOffset: 0,
                        bevelSegments: 1,
                    });

                    const outlineMaterial = new THREE.MeshBasicMaterial({
                        color: 0xffffff,
                        transparent: true,
                        opacity: 0,
                        side: THREE.BackSide,
                    });

                    const outlineMesh = new THREE.Mesh(outlineGeometry, outlineMaterial);

                    outlineMesh.position.copy(textMesh.position);
                    outlineMesh.scale.copy(textMesh.scale);
                //

                textMesh.userData.isInteractive = true;
                
                textMesh.userData.onHover = () => {
                    document.body.style.cursor = 'pointer';
                    outlineMaterial.opacity = 1;
                }
                textMesh.userData.onHoverExit = () => {
                    document.body.style.cursor = 'default';
                    outlineMaterial.opacity = 0;
                }
                textMesh.userData.onClick = () => {
                    window.open('https://www.google.com/search?q=matrix+filme&rlz=1C1FKPE_pt-PTBR1121BR1121&oq=matrix+filme&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQIRiPAtIBCDE1MjNqMGoxqAIAsAIA&sourceid=chrome&ie=UTF-8&sei=9njTZ4KYHuyD5OUPob7j8A8', '_blank');
                }

            //

            const group = new THREE.Group();
            group.add(pointLight);
            group.add(outlineMesh);
            group.add(textMesh);

            if(call) call(group);
        }, undefined,
        (error) => {
            console.error('Error', error);
        }
    );
}