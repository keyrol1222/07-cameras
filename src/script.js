import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
/**
 * Base
 */
const cursor = {
    x:0,
    y:0
}
window.addEventListener('mousemove', (event) =>{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = -(event.clientY / sizes.height - 0.5)
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}
const aspectRadio = sizes.width / sizes.height

// Scene
const scene = new THREE.Scene()

// Object
const group = new THREE.Group()
scene.add(group)
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)
group.add(mesh)

const mesh2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 2, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)
scene.add(mesh2)
group.add(mesh2)
mesh2.position.y = 1.5

const mesh3 = new THREE.Mesh(
    new THREE.BoxGeometry(2, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
)
scene.add(mesh3)
group.add(mesh3)
mesh3.position.y = 3

const mesh4 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 2, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xffff00 })
)
scene.add(mesh4)
group.add(mesh4)
mesh4.position.y = -1


// Camera
const camera = new THREE.PerspectiveCamera(75,aspectRadio,0.1 ,100)
// const camera = new THREE.OrthographicCamera(-1 * aspectRadio,1 * aspectRadio,1,-1,0.1 ,100)
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

//controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true
// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()


    // // update camera
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 6
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 6
    // camera.position.y = cursor.y * 6
    camera.lookAt(mesh.position)

    // Update objects
    // mesh.rotation.y = elapsedTime;

    //control
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()