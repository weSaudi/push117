import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
//*************************************************************************************/
// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);
//*************************************************************************************/
// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 0,130);
//*************************************************************************************/
// Add a 3D model
const loader = new GLTFLoader();
loader.load('models/map1/map1.gltf', function (gltf) {
    scene.add(gltf.scene);
});
//*************************************************************************************/
// Add lights
let objToRender 
const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
topLight.position.set(100, 100, 100) //top-left-ish
topLight.castShadow = true;
scene.add(topLight);
const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "map1" ? 5 : 4);
scene.add(ambientLight);
//*************************************************************************************/
// Add 3D buttons (spheres with opacity)
const button0 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0Xff0000, opacity: 0.5, transparent: true })
);
button0.position.set(18, 15, -5); // Position of the button in 3D space
scene.add(button0);

const button1 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0Xff0000, opacity: 0.5, transparent: true })
);
button1.position.set(50, 15, -45); // Position of the button in 3D space
scene.add(button1);

const button2 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0Xff0000, opacity: 0.5, transparent: true })
);
button2.position.set(65, 15, -22);
scene.add(button2);

const button3 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0Xff0000, opacity: 0.5, transparent: true })
);
button3.position.set(65, 15, 10);
scene.add(button3);

const button4 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0Xff0000, opacity: 0.5, transparent: true })
);
button4.position.set(50, 15,38);
scene.add(button4);

const button5 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0Xff0000, opacity: 0.5, transparent: true })
);
button5.position.set(20, 15, 48);
scene.add(button5);

const button6 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0Xff0000, opacity: 0.5, transparent: true })
);
button6.position.set(-50, 15,38);
scene.add(button6);

const button7 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0Xff0000, opacity: 0.5, transparent: true })
);
button7.position.set(-65, 15, 10);
scene.add(button7);

const button8 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0Xff0000, opacity: 0.5, transparent: true })
);
button8.position.set(-65, 15, -22);
scene.add(button8);

const button9 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0Xff0000, opacity: 0.5, transparent: true })
);
button9.position.set(-50, 15, -45);
scene.add(button9);

const button10 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0Xff0000, opacity: 0.5, transparent: true })
);
button10.position.set(12, 15, -55);
scene.add(button10);
//*************************************************************************************/
// Function to create text texture with word wrapping
let fontn = 30 ;
function createTextTexture(text, color = "white", fontSize = fontn, maxWidth = 240) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = maxWidth;  // Adjust canvas width for text wrapping
    canvas.height = 128;      // Adjust canvas height for text

    context.fillStyle = "transparent"; // Transparent background
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = color;
    context.font = `${fontSize}px Arial`;
    context.textAlign = "center";
    context.textBaseline = "middle";

    // Word wrapping function
    const words = text.split(" ");
    let line = "";
    const lines = [];
    const lineHeight = fontSize * 1.2; // Line height for wrapped text

    for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + " ";
        const testWidth = context.measureText(testLine).width;
        if (testWidth > maxWidth && i > 0) {
            lines.push(line);
            line = words[i] + " "; // Start a new line
        } else {
            line = testLine;
        }
    }

    lines.push(line); // Add last line
    const textHeight = lines.length * lineHeight;

    // Draw the wrapped text on the canvas
    for (let i = 0; i < lines.length; i++) {
        context.fillText(lines[i], canvas.width / 2, (canvas.height / 2) - (textHeight / 2) + (i * lineHeight));
    }

    // Create texture from canvas
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
}
//************************************text*************************************************/
// Add text to Button 0

const text0Material = new THREE.MeshBasicMaterial({
    map: createTextTexture("أنشاء أجتماعات ", "white", fontn),
    transparent: true,
});
const text0Plane = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 30),
    text0Material
);
text0Plane.position.set(18, 17, -5); // Position above Button 1
scene.add(text0Plane);

// Add text to Button 1
const text1Material = new THREE.MeshBasicMaterial({
    map: createTextTexture("تبويب الأجتماع ", "white", fontn),
    transparent: true,
});
const text1Plane = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 30),
    text1Material
);
text1Plane.position.set(50, 17, -45); // Position above Button 1
scene.add(text1Plane);

// Add text to Button 2
const text2Material = new THREE.MeshBasicMaterial({
    map: createTextTexture("أعدادت  الأجتماع ", "white", fontn),
    transparent: true,
});
const text2Plane = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 30),
    text2Material
);
text2Plane.position.set(65, 17, -22); // Position above Button 2
scene.add(text2Plane);

// Add text to Button 3
const text3Material = new THREE.MeshBasicMaterial({
    map: createTextTexture("مواعيد الأجتماع ", "white", fontn),
    transparent: true,
});
const text3Plane = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 30),
    text3Material
);
text3Plane.position.set(65, 17, 10); // Position above Button 2
scene.add(text3Plane);

// Add text to Button 4
const text4Material = new THREE.MeshBasicMaterial({
    map: createTextTexture("بدء الأجتماع  ", "white", fontn),
    transparent: true,
});
const text4Plane = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 30),
    text4Material
);
text4Plane.position.set(50, 17,38); // Position above Button 2
scene.add(text4Plane);

// Add text to Button 5
const text5Material = new THREE.MeshBasicMaterial({
    map: createTextTexture("تطبيق سطح المكتب ", "white", fontn),
    transparent: true,
});
const text5Plane = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 30),
    text5Material
);
text5Plane.position.set(20, 17, 48); // Position above Button 2
scene.add(text5Plane);

// Add text to Button 6
const text6Material = new THREE.MeshBasicMaterial({
    map: createTextTexture("أعدادات الميديا ", "white", fontn),
    transparent: true,
});
const text6Plane = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 30),
    text6Material
);
text6Plane.position.set(-50, 17,38); // Position above Button 2
scene.add(text6Plane);

// Add text to Button 7
const text7Material = new THREE.MeshBasicMaterial({
    map: createTextTexture("أعدادات العرض", "white", fontn),
    transparent: true,
});
const text7Plane = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 30),
    text7Material
);
text7Plane.position.set(-65, 17, 10); // Position above Button 2
scene.add(text7Plane);

// Add text to Button 8
const text8Material = new THREE.MeshBasicMaterial({
    map: createTextTexture(" الألتحاق بالاجتماع ", "white", fontn),
    transparent: true,
});
const text8Plane = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 30),
    text8Material
);
text8Plane.position.set(-65, 17, -22); // Position above Button 2
scene.add(text8Plane);

// Add text to Button 9
const text9Material = new THREE.MeshBasicMaterial({
    map: createTextTexture(" أدارة الأذونات ", "white", fontn),
    transparent: true,
});
const text9Plane = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 30),
    text9Material
);
text9Plane.position.set(-50, 17, -45); // Position above Button 2
scene.add(text9Plane);

// Add text to Button 10
const text10Material = new THREE.MeshBasicMaterial({
    map: createTextTexture(" التسجيلات ", "white", fontn),
    transparent: true,
});
const text10Plane = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 30),
    text10Material
);
text10Plane.position.set(12, 17, -55); // Position above Button 2
scene.add(text10Plane);

//*************************************************************************************/

// Raycaster for detecting clicks
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
//*****************************************modal10********************************************/
// Handle mouse click
window.addEventListener("click", (event) => {
    // Convert mouse position to normalized device coordinates (-1 to +1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Raycast
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([button0,button1, button2,button3,button4,button5,button6,button7,button8,button9,button10]);

    if (intersects.length > 0) {
        const clickedObject = intersects[0].object;

        // Perform actions based on the button clicked
        if (clickedObject === button0) 
            {
            openModal('goalsModal'); // Call the function to open the modal
            } 
        else if (clickedObject === button1) 
            {
            openModal('videoModal1'); // Call the function to open the modal
            } 
        else if (clickedObject === button2) 
            {
            openModal('videoModal2'); // Call the function to open the modal
            }
        else if (clickedObject === button3) 
            {
            openModal('videoModal3'); // Call the function to open the modal
            }
        else if (clickedObject === button4) 
            {
            openModal('videoModal4'); // Call the function to open the modal
            }
        else if (clickedObject === button5) 
            {
            openModal('videoModal5'); // Call the function to open the modal
            }
        else if (clickedObject === button6) 
            {
            openModal('videoModal6'); // Call the function to open the modal
            }
        else if (clickedObject === button7) 
            {
            openModal('videoModal7'); // Call the function to open the modal
            }
        else if (clickedObject === button8) 
            {
            openModal('videoModal8'); // Call the function to open the modal
            }
        else if (clickedObject === button9) 
            {
            openModal('videoModal9'); // Call the function to open the modal
            }
        else if (clickedObject === button10) 
            {
            openModal('videoModal10'); // Call the function to open the modal
            }
    }
});

// Function to open a Bootstrap modal
function openModal(modalId) {
    const modalElement = document.getElementById(modalId);
    const modal = new bootstrap.Modal(modalElement); // Create a Bootstrap modal instance
    modal.show(); // Open the modal
}

// Render the scene
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
