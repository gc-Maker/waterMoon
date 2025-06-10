import * as THREE from 'three';

const gridSize = 50;

function isPositionValid(position: THREE.Vector3) {
    const { x, z } = position;
    const halfSize = gridSize / 2;
    return x > -halfSize && x < halfSize && z > -halfSize && z < halfSize;
}

function calculateMousePosition(event: React.MouseEvent<HTMLDivElement>) {
    return {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
    };
}

function getCubeIntersectionPosition(
    raycaster: THREE.Raycaster,
    cubes: THREE.Mesh[],
) {
    const result = raycaster.intersectObjects(cubes);
    if (result.length) {
        const intersectObject = result[0];
        const { face, object } = intersectObject;
        if (face) {
            const { normal } = face;
            const { position } = object;
            return position.clone().add(normal);
        }
    }
    return undefined;
}

function getPlaneIntersectionPosition(raycaster: THREE.Raycaster) {
    const intersectPoint = raycaster.ray.intersectPlane(
        new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
        new THREE.Vector3(),
    );
    if (intersectPoint) {
        const { x, z } = intersectPoint;
        return new THREE.Vector3(Math.floor(x) + 0.5, 0.5, Math.floor(z) + 0.5);
    }
    return undefined;
}

function createCube(position: THREE.Vector3) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = position.x;
    cube.position.y = position.y;
    cube.position.z = position.z;
    return cube;
}

export {
    gridSize,
    isPositionValid,
    createCube,
    getCubeIntersectionPosition,
    getPlaneIntersectionPosition,
    calculateMousePosition,
};
