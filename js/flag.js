const section = document.querySelector("section.flag")

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, section.clientWidth / section.clientHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});
renderer.setSize( section.clientWidth, section.clientHeight );
section.appendChild( renderer.domElement );

const loader = new THREE.TextureLoader()
const geometry = new THREE.PlaneGeometry(5, 3, 15, 9);
const material = new THREE.MeshBasicMaterial( { 
  /*color: 0x000000,*/
  map: loader.load("images/atari3.png")
} );
const flag = new THREE.Mesh( geometry, material );
scene.add( flag );

flag.rotation.set(-0.1, 0, 0);

camera.position.z = 5;

const clock = new THREE.Clock()

function animate() {
  const t = clock.getElapsedTime()
  
  
  flag.geometry.vertices.map(v => {
    const waveX1 = 0.4 * Math.sin(v.x * 1.5 + t)
    const waveX2 = .2 * Math.sin(v.x * 2 + t * 2)
    const waveY1 = .1 * Math.sin(v.y * 1 + t * .1)
    const multi = (v.x + 2.5) / 5
    
    v.z = (waveX1 + waveX2 + waveY1) * multi
  })
  flag.geometry.verticesNeedUpdate = true;
  
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();  

window.addEventListener("resize", function () {
  camera.aspect = section.clientWidth / section.clientHeight
  camera.updateProjectionMatrix()
  
  renderer.setSize( section.clientWidth, section.clientHeight );
})