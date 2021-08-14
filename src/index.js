import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import style from '/sass/style.sass'

const size = {
    width: window.innerWidth,
    height: window.innerHeight
}

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, size.width / size.height)
camera.position.z = 5
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
const texture = new THREE.MeshBasicMaterial({color:'red'})
const mesh = new THREE.Mesh(geometry, texture)
scene.add(mesh)




animation()