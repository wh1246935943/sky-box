import * as THREE from 'three';
import { Base } from "./base.js";
export class Game extends Base {
    constructor() {
        super();
        this.car = null;
        this.keys = [];
    }
    ;
    initObject() {
        /**
         * 创建几何体
         */
        const map = new THREE.TextureLoader().load('./../img/di.jpg');
        // map.wrapS = THREE.RepeatWrapping;
        // map.wrapT = THREE.RepeatWrapping;
        // map.repeat.set(8, 8)
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(150, 5, 200), new THREE.MeshLambertMaterial({ map }));
        this.scene.add(mesh);
        this.initCar();
        this.initWasd();
    }
    ;
    initCar() {
        const car = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 30), new THREE.MeshLambertMaterial({ color: '#ffffff' }));
        car.name = 'myCar';
        car.position.y = 7.5;
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
        const { car, keys, scene, controls } = this;
        if (!keys)
            return;
        const speed = 0.5;
        const { length } = keys;
        if (car) {
            const p = car.position;
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
