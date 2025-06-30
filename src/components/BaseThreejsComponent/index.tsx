import React, { PureComponent, ReactNode } from 'react';
import * as THREE from 'three';
import _ from 'lodash';
import style from './index.less';
import { AnimationCallback } from './utils';

interface Props {
    children?: ReactNode;
}

export class BaseThreejsComponent extends PureComponent<Props> {
    private ref = React.createRef<HTMLDivElement | null>();

    private needRender = false;

    protected animationCallbacks: AnimationCallback[] = [];

    /* 相机 */
    protected camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        1000,
    );

    /* 渲染器 */
    protected renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
    });

    /* 画布 */
    protected scene = new THREE.Scene();

    componentDidMount() {
        if (!this.ref) {
            return;
        }
        this.init();
        this.mountEvent();
        this.animation();
    }

    componentWillUnmount() {
        this.unmountEvent();
    }

    private init = () => {
        this.camera.position.setZ(50);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        (this.ref.current as HTMLElement).appendChild(this.renderer.domElement);
        this.renderer.render(this.scene, this.camera);
    };

    private onResize = _.throttle(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        this.needRender = true;
    }, 150);

    private animation = () => {
        this.executeCallbacks();
        if (this.needRender) {
            this.renderer.render(this.scene, this.camera);
            this.needRender = false;
        }
        requestAnimationFrame(this.animation);
    };

    private executeCallbacks = () => {
        this.animationCallbacks = this.animationCallbacks.reduce((pre, cur) => {
            const needRemove = cur();
            if (needRemove) {
                return pre;
            } else {
                return pre.concat(cur);
            }
        }, [] as AnimationCallback[]);
    };

    private mountEvent = () => {
        window.addEventListener('resize', this.onResize);
    };

    private unmountEvent = () => {
        window.removeEventListener('resize', this.onResize);
    };

    protected toRender = () => {
        this.needRender = true;
    };

    protected addAnimationCallback = (callback: AnimationCallback) => {
        if (this.animationCallbacks.includes(callback)) {
            throw new Error('add same callback');
        } else {
            this.animationCallbacks.push(callback);
        }
    };

    render() {
        const { children } = this.props;
        return (
            <>
                <div className={style.container} ref={this.ref}></div>
                {children}
            </>
        );
    }
}
