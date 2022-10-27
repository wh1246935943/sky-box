import * as THREE from 'three';
import { Base } from "./base.js";
export class Game extends Base {
    constructor() {
        super();
        this.car = null;
        this.keys = [];
        this.ray = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 1, 0), 0, 10);
        this.initObject();
    }
    ;
    initObject() {
        /**
         * 创建几何体
         */
        const map = new THREE.TextureLoader().load('./../img/dimian.png');
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(150, 5, 200), new THREE.MeshLambertMaterial({ map }));
        this.scene.add(mesh);
        /**
         * 创建长道
         */
        const langRold = new THREE.Mesh(new THREE.BoxGeometry(10, 5, 1000), new THREE.MeshLambertMaterial({ map }));
        langRold.position.y = -50;
        langRold.translateZ(-600);
        this.scene.add(langRold);
        this.initCar();
        this.initWasd();
    }
    ;
    initCar() {
        const car = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 30), new THREE.MeshLambertMaterial({ color: 'red' }));
        car.name = 'myCar';
        car.position.y = 40;
        this.scene.add(car);
        this.car = car;
    }
    ;
    initWasd() {
        document.onkeydown = (e) => {
            if (e.key.match(/^(w|a|s|d)$/i)) {
                if (this.keys.includes(e.key))
                    return;
                console.log(e);
                this.keys.push(e.key);
            }
        };
        document.onkeyup = (e) => {
            // console.log(e)
            if (e.key.match(/^(w|a|s|d)$/i)) {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        };
    }
    ;
    render() {
        const { car, keys, scene, controls, ray } = this;
        if (!keys)
            return;
        const speed = 0.5;
        const { length } = keys;
        if (car) {
            const p = car.position;
            ray.ray.origin.set(p.x, p.y - 10.5, p.z);
            const ins = ray.intersectObjects(scene.children.filter(({ name }) => name !== 'myCar'), false);
            if (ins.length === 0) {
                car.position.y -= speed * 2;
            }
            ;
            if (length && keys.includes('w')) {
                car.translateZ(-speed);
            }
            if (length && keys.includes('s')) {
                car.translateZ(speed);
            }
            if (length && keys.includes('a')) {
                car.rotateY(THREE.MathUtils.degToRad(1));
            }
            if (length && keys.includes('d')) {
                car.rotateY(THREE.MathUtils.degToRad(-1));
            }
            ;
            controls.target.copy(p);
        }
    }
}
