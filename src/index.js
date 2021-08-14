import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import style from '/sass/style.sass'

import pick from '/image/pick.jpg'
import orch from '/image/orch.png'
import wallUrl from '/image/wall/BricksFlemishRed001_COL_VAR1_1K.jpg'


const size = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Texture
const textureLoader = new THREE.TextureLoader()
const pickTexture = textureLoader.load(pick)
const orchTexture = textureLoader.load(orch)
const wallTexture = textureLoader.load(wallUrl)

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff)


const camera = new THREE.PerspectiveCamera(75, size.width / size.height)
camera.position.z = 6
scene.add(camera)


const renderer = new THREE.WebGLRenderer()
document.body.appendChild( renderer.domElement );
renderer.setSize(size.width, size.height)
renderer.render(scene, camera)

const controls = new OrbitControls(camera, renderer.domElement)
controls.update();

function animation(){

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


const geometry = new THREE.BoxBufferGeometry(1,1,1)
const texture = new THREE.MeshBasicMaterial({    map: pickTexture})
const mesh = new THREE.Mesh(geometry, texture)
scene.add(mesh)

const plane = new THREE.PlaneBufferGeometry(1,1)
const pickTextureMesh = new THREE.MeshBasicMaterial({
    map: pickTexture,
    
})
const orchTextureMesh = new THREE.MeshBasicMaterial({
    map: orchTexture,
    transparent: true
})
const meshPick = new THREE.Mesh(plane, pickTextureMesh)
const orchPick = new THREE.Mesh(plane, orchTextureMesh)
meshPick.position.x = -1.5
meshPick.position.y = -1.5
orchPick.position.x = -4

const sphere = new  THREE.SphereBufferGeometry(1, 32, 32)
const sphereTexture = new THREE.MeshBasicMaterial({ color: new THREE.Color(0x000000), wireframe: true})
const sphereMesh = new THREE.Mesh(sphere, sphereTexture)
sphereMesh.position.x = 2


const wall = new THREE.BoxBufferGeometry(1,1,1)
const wallTextureMesh = new THREE.MeshBasicMaterial({
    map: wallTexture,
})
const wallMesh = new THREE.Mesh(wall, wallTextureMesh)
wallMesh.position.x = 2
wallMesh.position.y = -2

scene.add(meshPick, orchPick, sphereMesh, wallMesh)

animation()