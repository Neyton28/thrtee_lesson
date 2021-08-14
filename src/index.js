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
const wallAmbientOcclusionTexture = textureLoader.load('/image/wall/BricksFlemishRed001_AO_1K.jpg')
const wallHeightTexture = textureLoader.load('/image/wall/BricksFlemishRed001_BUMP_1K.jpg')
const wallNormalTexture = textureLoader.load('/image/wall/BricksFlemishRed001_NRM_1K.png')
// const doorMetalnessTexture = textureLoader.load('/image/wall/metalness.jpg')
const wallRoughnessTexture = textureLoader.load('/image/wall/BricksFlemishRed001_REFL_1K.jpg')
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


const material = new THREE.MeshStandardMaterial()
material.metalness = 0.45
material.roughness = 0.65
material.map = wallColorTexture

material.aoMap = wallAmbientOcclusionTexture
material.aoMapIntensity = 1

material.displacementMap = wallHeightTexture
// material.roughnessMap = wallRoughnessTexture
material.displacementScale = 0.03

material.metalness = 0
// material.roughness = 1
material.normalMap = wallNormalTexture

gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)

const planeGeometry = new THREE.PlaneBufferGeometry(1, 1, 250, 250)

planeGeometry.parameters.width = 2

const plane = new THREE.Mesh(planeGeometry, material)


const sphereGeometry = new  THREE.SphereBufferGeometry(0.5, 300, 300)
const sphere = new THREE.Mesh(sphereGeometry, material)
sphere.position.x = 2

const torusGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 64, 128)
const torus = new THREE.Mesh(torusGeometry, material)
torus.position.set(-2, 0, 0)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
const pointLight = new THREE.PointLight(0xffffff, 0.5)

pointLight.position.set(2, 3, 3)

sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))
torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))

scene.add(plane, sphere, torus, ambientLight, pointLight)

animation()