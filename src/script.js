import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Global Variables
let scene, camera, renderer, clock
let canvas, sizes
let loader
let directionalLight, directionalLightRed

canvas = document.querySelector('.canvas')
clock = new THREE.Clock()
loader = new GLTFLoader()

sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

function createScene() {
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5
    renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

function createObjects() {
    loader.load(
        'objects/eva/scene.gltf',
        (gltf) => {
            gsap.registerPlugin(ScrollTrigger)
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.canvas',
                    pin: true,
                    scrub: 0.1,
                    start: 'top top',
                    end: '+=1000'
                }
            })
            tl.to(gltf.scene.rotation, { x: 0.69, y: -1, duration: 4, ease: 'none' })
            tl.to(gltf.scene.rotation, { x:1.2, y: -3.5, duration: 4, ease: 'none' })
            tl.to(gltf.scene.rotation, { x: -0.8, y: -5.5, duration: 4, ease: 'none' })
            tl.to(gltf.scene.rotation, { x: 1, y: -7.5, duration: 4, ease: 'none' })
            tl.to(gltf.scene.rotation, { x: 0, y: 0, duration: 4, ease: 'none' })
            gltf.scene.position.y = 1
            scene.add(gltf.scene)
        }
    )
}

function createLights() {
    directionalLight = new THREE.DirectionalLight(0xffffff, 0.7)
    directionalLight.position.set(3, 3, 5)
    directionalLightRed = new THREE.DirectionalLight(0xff0000, 5)
    directionalLightRed.position.set(-3, 0, 3)
    scene.add(directionalLight, directionalLightRed)
}

function animate() {
    // Render
    renderer.render(scene, camera)
    // Call tick again on the next frame
    window.requestAnimationFrame(animate)
}

function init() {
    createScene()
    createObjects()
    createLights()
    animate()
}
init()

// resizing the window
window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})