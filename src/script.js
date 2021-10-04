import './style.css'
import * as THREE from 'three'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Global Variables
let scene, camera, renderer, clock, gui, stats, controls, raycaster
let canvas, sizes, elapsedTime
let points, loader
let pointLight, ambientLight

canvas = document.querySelector('.canvas')
raycaster = new THREE.Raycaster()
clock = new THREE.Clock()
loader = new GLTFLoader()
// gui = new GUI({ width: 400, closed: false })

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
                    scrub: 0.2,
                    start: 'top top',
                    end: '+=1000'
                }
            })
            tl.to(gltf.scene.rotation, { x: 2, y: -3, duration: 3, ease: 'none' })
            tl.to(gltf.scene.rotation, { x: 4, y: -6, duration: 3, ease: 'none' })
            gltf.scene.position.y = 1
            scene.add(gltf.scene)
        }
    )
}

function createLights() {
    // lights for display of objects 
    pointLight = new THREE.DirectionalLight(0xffffff, 1)
    pointLight.position.set(0, 3, 5)
    ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(pointLight, ambientLight)
}

function animate() {
    elapsedTime = clock.getElapsedTime()

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