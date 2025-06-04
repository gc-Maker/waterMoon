import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const text = '测试文本';
function App() {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) {
            return;
        }
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000,
        );
        camera.position.set(15, 15, 15);
        camera.lookAt(0, 0, 0);

        const axesHelper = new THREE.AxesHelper(10);
        axesHelper.renderOrder = 1;
        scene.add(axesHelper);
        const gridHelper = new THREE.GridHelper(100, 100, 0x444444, 0x222222);
        gridHelper.renderOrder = 0;
        scene.add(gridHelper);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        const controls = new OrbitControls(camera, renderer.domElement);
        (ref.current as HTMLElement).appendChild(renderer.domElement);

        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }
        animate();
    }, []);

    return (
        <div
            ref={ref}
            style={{
                height: window.innerHeight,
                width: window.innerWidth,
                background: 'black',
            }}
        >
            123
        </div>
    );
}
export { App };
