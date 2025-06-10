import React, { useRef, useEffect, useState, memo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import _ from 'lodash';

import {
    gridSize,
    isPositionValid,
    createCube,
    calculateMousePosition,
    getCubeIntersectionPosition,
    getPlaneIntersectionPosition,
} from './utils';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
);
const renderer = new THREE.WebGLRenderer({
    antialias: true,
});
const raycaster = new THREE.Raycaster();

const AddCube = memo(() => {
    const container = useRef(null);
    const mouse = new THREE.Vector2();
    const [cubes, setCubes] = useState<THREE.Mesh[]>([]);

    const init = () => {
        if (!container.current) {
            return;
        }
        // 设置背景色
        scene.background = new THREE.Color(0x000000);
        // 设置相机位置
        camera.position.set(10, 10, 10);
        // 设置渲染器尺寸并添加到 DOM
        renderer.setSize(window.innerWidth, window.innerHeight);
        (container.current as HTMLElement).appendChild(renderer.domElement);

        raycaster.setFromCamera(mouse, camera);

        addAxesHelper();
        addGridHelper();
        initOrbitControls();
    };

    const initOrbitControls = () => {
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.addEventListener(
            'change',
            _.throttle(() => {
                requestAnimationFrame(render);
            }, 50),
        );
    };

    const render = () => {
        renderer.render(scene, camera);
    };

    const addAxesHelper = () => {
        const axesHelper = new THREE.AxesHelper(5);
        axesHelper.renderOrder = 1;
        scene.add(axesHelper);
    };

    const addGridHelper = () => {
        const gridHelper = new THREE.GridHelper(gridSize, gridSize);
        gridHelper.renderOrder = 0;
        scene.add(gridHelper);
    };

    useEffect(() => {
        init();
        render();

        // 清理函数：组件卸载时释放资源
        return () => {
            renderer.dispose();
        };
    }, []);

    const onClick = _.debounce((event: React.MouseEvent<HTMLDivElement>) => {
        mouse.copy(calculateMousePosition(event));
        raycaster.setFromCamera(mouse, camera);

        let newCubePosition = getCubeIntersectionPosition(raycaster, cubes);

        if (!newCubePosition) {
            newCubePosition = getPlaneIntersectionPosition(raycaster);
        }

        if (newCubePosition && isPositionValid(newCubePosition)) {
            const cube = createCube(newCubePosition);
            scene.add(cube);
            setCubes([...cubes, cube]);
            render();
        }
    }, 50);

    return (
        <div
            ref={container}
            style={{ width: '100%', height: '100vh' }}
            onClick={onClick}
        />
    );
});

export default AddCube;
