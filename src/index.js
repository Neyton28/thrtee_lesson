import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import style from '/sass/style.sass'
import * as dat from 'dat.gui'

const size = {
    width: window.innerWidth,
    height: window.innerHeight
}
const gui = new dat.GUI()

// Texture
const textureLoader = new THREE.TextureLoader()

const wallColorTexture = textureLoader.load('/image/wall/BricksFlemishRed001_COL_VAR1_1K.jpg')
const wallAlphaTexture = textureLoader.load('/image/wall/BricksFlemishRed001_AO_1K.jpg')
// const doorAmbientOcclusionTexture = textureLoader.load('/image/wall/ambientOcclusion.jpg')
// const doorHeightTexture = textureLoader.load('/image/wall/height.jpg')
// const doorNormalTexture = textureLoader.load('/image/wall/normal.jpg')
// const doorMetalnessTexture = textureLoader.load('/image/wall/metalness.jpg')
// const doorRoughnessTexture = textureLoader.load('/image/wall/roughness.jpg')
const matcapTexture = textureLoader.load('/image/mapcap.png')
// const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000)

const camera = new THREE.PerspectiveCamera(75, size.width / size.height)
camera.position.z = 6
scene.add(camera)


const renderer = new THREE.WebGLRenderer()
document.body.appendChild( renderer.domElement );
renderer.setSize(size.width, size.height)
renderer.render(scene, camera)

const controls = new OrbitControls(camera, renderer.domElement)
controls.update();

const clock = new THREE.Clock()

function animation(){

    const elapsedTime = clock.getElapsedTime()

    // sphere.rotation.y = 0.1 * elapsedTime
    // plane.rotation.y = 0.1 * elapsedTime
    // torus.rotation.y = 0.1 * elapsedTime

    // sphere.rotation.x = 0.15 * elapsedTime
    // plane.rotation.x = 0.15 * elapsedTime
    // torus.rotation.x = 0.15 * elapsedTime

    renderer.render(scene, camera)
    controls.update();
    window.requestAnimationFrame(animation)
}

window.addEventListener('resize', ()=>{
    size.width = window.innerWidth
    size.height = window.innerHeight

    camera.aspect = size.width / size.height
    camera.updateProjectionMatrix()

    renderer.setSize(size.width, size.height)
 
})

// const material = new THREE.MeshBasicMaterial()
// material.map = wallColorTexture
// material.transparent = true
// material.alphaMap = wallAlphaTexture
// material.side = THREE.DoubleSide

// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// const material = new THREE.MeshLambertMaterial()

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff)

// const material = new THREE.MeshToonMaterial()

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.45
material.roughness = 0.65

gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)

const planeGeometry = new THREE.PlaneBufferGeometry(1,1)
const planeTextureMesh = new THREE.MeshBasicMaterial({color: new THREE.Color(0xFF0000 )})
const plane = new THREE.Mesh(planeGeometry, material)


const sphereGeometry = new  THREE.SphereBufferGeometry(1, 32, 32)
const sphereTexture = new THREE.MeshBasicMaterial({ color: new THREE.Color(0xff0000), wireframe: true})
const sphere = new THREE.Mesh(sphereGeometry, material)
sphere.position.x = 2

const torusGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 16, 32)
const torus = new THREE.Mesh(torusGeometry, material)
torus.position.set(-2, 0, 0)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
const pointLight = new THREE.PointLight(0xffffff, 0.5)

pointLight.position.set(2, 3, 3)

scene.add(plane, sphere, torus, ambientLight, pointLight)

animation()