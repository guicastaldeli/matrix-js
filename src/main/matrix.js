import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

export const defaultColor = 'rgb(0, 8, 1)';

export function createMatrixEffect(fontUrl, options = {}) {
    const group = new THREE.Group();
    const cols = [];
    const fontLoader = new FontLoader();
    let loadedFont = null;

    const defaultOptions = {
        size: 0.3,
        depth: 5,
        height: 1,
        cols: 5,
        rows: 10,
        fallSpeed: 0.001,
        spacing: 0.35,
        startY: 1,
        endY: -10,
        rangeX: [-3, 5],
        rangeZ: [-5, 5],
        color: 0x0aff33,
        fadeSpeed: 0.97,
        chars: null,
        lightIntensity: 0.5,
        lightDistance: 2,
    }

    const opts = { ...defaultOptions, ...options };

    fontLoader.load(fontUrl, (font) => {
        loadedFont = font;

        for(let i = 0; i < opts.cols; i++) {
            const col = [];
            const x = THREE.MathUtils.lerp(opts.rangeX[0], opts.rangeX[1], i / (opts.cols - 1));
            
            for(let j = 0; j < opts.rows; j++) {
                const char = String.fromCharCode(Math.floor(Math.random() * 128));
                const geometry = new TextGeometry(char, {
                    font: font,
                    size: opts.size,
                    depth: 0.08,
                    bevelEnabled: false
                });
                const material = new THREE.MeshPhongMaterial({
                    color: opts.color,
                    transparent: true,
                    opacity: 0.8,
                    side: THREE.FrontSide,
                    shininess: 130,
                    emissive: opts.color,
                    emissiveIntensity: 0.5,
                });
                
                geometry.computeBoundingBox();
                geometry.center();

                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(x, opts.startY - (j * opts.spacing), opts.rangeZ[0]);
                mesh.userData.speed = 0.1 + Math.random() * 0.1;
                mesh.userData.opacity = 0;
                mesh.scale.x = 0.8;

                mesh.castShadow = true;
                mesh.receiveShadow = true;

                group.add(mesh);
                col.push(mesh);
            }
            cols.push(col);
        }
    });

    group.userData.update = () => {
        if(!loadedFont) return;

        cols.forEach(col => {
            col.forEach((mesh, i) => {
                mesh.position.y -= mesh.userData.speed * 0.6;

                if(mesh.userData.light) {
                    mesh.userData.light.position.copy(mesh.position);
                    mesh.userData.light.intensity = mesh.material.opacity * opts.lightIntensity;
                }

                mesh.material.opacity *= opts.fadeSpeed;
                mesh.material.emissiveIntensity = mesh.material.opacity * 0.5;

                if(mesh.position.y < opts.endY) {
                    mesh.position.y = opts.startY;
                    mesh.material.opacity = 1;
                    
                    const char = String.fromCharCode(Math.floor(Math.random() * 128));
                    const newGeometry = new TextGeometry(char, {
                        font: loadedFont,
                        size: opts.size,
                        depth: 0.08,
                        height: 0.08,
                    });
                    mesh.geometry.dispose();
                    mesh.geometry = newGeometry;
                }
            })
        })
    }

    return group;
}