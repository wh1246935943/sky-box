import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
/**
 * 初始化渲染
 */
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement);
/**
 * 创建场景
 * 设置场景背景
 */
const scene = new THREE.Scene();
const urls = [6,3,2,1,5,4].map((url) => {
  return `./img/${url}.png`
});
scene.background = new THREE.CubeTextureLoader().load(urls);
/**
 * 初始化环境光
 */
const light = new THREE.AmbientLight(0xff8800, 0.3);
scene.add(light);
/**
 * 初始化太阳光
 */
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight.position.set(-300, 150, 250)
scene.add( directionalLight );
/**
 * 初始化相机
 */
const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.set(0, 150, 400); //设置相机位置
camera.lookAt(scene.position);
/**
 * 初始化相机插件
 */
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;// 使动画循环使用时阻尼或自转 意思是否有惯性 
controls.enableZoom = true;//是否可以缩放 
// controls.autoRotate = true;//是否自动旋转 
controls.minDistance = 200;//设置相机距离原点的最远距离 
controls.maxDistance = 600;//设置相机距离原点的最远距离 
controls.enablePan = true;//是否开启右键拖拽
/**
 * 创建几何体
 */
const geometry = new THREE.BoxGeometry(100, 5, 150);
const material = new THREE.MeshLambertMaterial({
    color: 0x00ffb4,
})
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const animate = () => {
  controls.update();
  renderer.render( scene, camera );
  requestAnimationFrame(animate)
};
animate()
/**
 * 窗口变化后调整内容
 */
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    // 修改相机的参数，宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    // 更新投影的变换矩阵
    camera.updateProjectionMatrix();
    // 重新设置渲染器尺寸
    renderer.setSize(window.innerWidth, window.innerHeight);
}