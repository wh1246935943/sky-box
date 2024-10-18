import * as THREE from 'three';
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
export class Base {
    constructor() {
        this.renderer = new WebGLRenderer;
        this.scene = new Scene;
        this.camera = new PerspectiveCamera;
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        /**
         * 初始化渲染器
         * 设置渲染器大小
         * 并插入dom中
         */
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        /**
         * 创建场景
         * 设置场景背景
         */
        const scene = new THREE.Scene();
        const urls = [1, 3, 5, 6, 4, 2].map((url) => {
            return `./img/${url}.jpg`;
        });
        scene.background = new THREE.CubeTextureLoader().load(urls);
        /**
         * 初始化相机
         */
        const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 800);
        camera.position.set(-400, 700, 700); //设置相机位置
        camera.lookAt(scene.position);
        /**
         * 初始化相机插件
         */
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.maxDistance = 600;
        controls.minDistance = 40;
        controls.enableDamping = true; // 使动画循环使用时阻尼或自转 意思是否有惯性 
        controls.enableZoom = true; //是否可以缩放 
        controls.autoRotate = false; //是否自动旋转 
        controls.enablePan = true; //是否开启右键拖拽
        this.renderer = renderer;
        this.controls = controls;
        this.scene = scene;
        this.camera = camera;
        this.initLight();
        this.animate();
        this.realTimeUpdateWindowSize();
        // this.initObject()
        setTimeout(() => {
        }, 0);
    }
    ;
    initLight() {
        /**
         * 初始化环境光
         */
        const light = new THREE.AmbientLight(0xff8800, 0.3);
        this.scene.add(light);
        /**
         * 初始化太阳光
         */
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(-300, 150, 250);
        this.scene.add(directionalLight);
    }
    initObject() { }
    render() { }
    animate() {
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        this.render();
        requestAnimationFrame(this.animate.bind(this));
    }
    realTimeUpdateWindowSize() {
        window.addEventListener('resize', onWindowResize.bind(this), false);
        function onWindowResize() {
            // 修改相机的参数，宽高比
            this.camera.aspect = window.innerWidth / window.innerHeight;
            // 更新投影的变换矩阵
            this.camera.updateProjectionMatrix();
            // 重新设置渲染器尺寸
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }
}
