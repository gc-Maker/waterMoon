import * as THREE from 'three';
import { BaseThreejsComponent } from '@/components/BaseThreejsComponent';
import { GUI } from 'lil-gui';
import { IntervalY } from './utils';
import _ from 'lodash';

export default class ScrollThreejsComponent extends BaseThreejsComponent {
    private params = { color: 0xcccccc };
    private meshs: THREE.Mesh[] = [];
    private gui = new GUI();

    componentDidMount = () => {
        super.componentDidMount();
        this.addDirectionalLight();
        this.addCone();
        this.addTorusKnot();
        this.addCone1();
        this.addColorListener();
        this.toRender();
        this.addAnimationCallback(this.rotate);
        this.addScrollListener();
    };

    componentWillUnmount = () => {
        super.componentWillUnmount();
        this.deleteScrollListener();
    };

    addCone = () => {
        const geometry = new THREE.ConeGeometry(10, 15, 20);
        const material = new THREE.MeshToonMaterial(this.params);
        const cone = new THREE.Mesh(geometry, material);
        this.scene.add(cone);
        this.meshs.push(cone);
    };

    addTorusKnot = () => {
        const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 10);
        const material = new THREE.MeshToonMaterial(this.params);
        const torusKnot = new THREE.Mesh(geometry, material);
        torusKnot.position.y = -IntervalY;
        this.scene.add(torusKnot);
        this.meshs.push(torusKnot);
    };

    addCone1 = () => {
        const geometry = new THREE.ConeGeometry(10, 15, 20);
        const material = new THREE.MeshToonMaterial(this.params);
        const cone = new THREE.Mesh(geometry, material);
        cone.position.y = -IntervalY * 2;
        this.scene.add(cone);
        this.meshs.push(cone);
    };

    addDirectionalLight = () => {
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // 方向光
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);
    };

    addColorListener = () => {
        this.gui.addColor(this.params, 'color').onChange((newColor: number) => {
            this.meshs.forEach((mesh) => {
                const { material } = mesh;
                if (Array.isArray(material)) {
                    material.forEach((m) => {
                        (m as THREE.MeshBasicMaterial).color.copy(
                            new THREE.Color(newColor),
                        );
                    });
                } else {
                    (material as THREE.MeshBasicMaterial).color.copy(
                        new THREE.Color(newColor),
                    );
                }
            });
            this.toRender();
        });
    };

    rotate = () => {
        this.meshs.forEach((mesh) => {
            mesh.rotateX(0.01);
            mesh.rotateY(0.005);
        });
        this.toRender();
        return false;
    };

    addScrollListener = () => {
        window.addEventListener('scroll', this.onScroll);
    };

    deleteScrollListener = () => {
        window.removeEventListener('scroll', this.onScroll);
    };

    onScroll = _.throttle(() => {
        const scrollY = window.scrollY;
        const cameraY = -(scrollY / window.innerHeight) * IntervalY;
        this.camera.position.y = cameraY;
        this.toRender();
    }, 16);
}
