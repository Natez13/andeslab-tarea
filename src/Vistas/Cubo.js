import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const Cubo = () => {
  const containerRef = useRef();
  const rendererRef = useRef(null); // Mantener una referencia al renderer
  
  useEffect(() => {


    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const renderer = new THREE.WebGLRenderer();
    const onWindowResize = () => {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

    }
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer; // Asignar el renderer a la referencia

    /*
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    // document.body.appendChild( renderer.domElement ); / containerRef.current.appendChild(renderer.domElement);
    */ 

    const spotLight = new THREE.SpotLight( 0xffffff, 60 );
    spotLight.angle = Math.PI / 5;
    spotLight.penumbra = 0.2;
    spotLight.position.set( 2, 3, 3 );
    spotLight.castShadow = true;
    spotLight.shadow.camera.near = 3;
    spotLight.shadow.camera.far = 10;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    scene.add( spotLight );

    const dirLight = new THREE.DirectionalLight( 0x55505a, 3 );
    dirLight.position.set( 0, 3, 0 );
    dirLight.castShadow = true;
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 10;

    dirLight.shadow.camera.right = 1;
    dirLight.shadow.camera.left = - 1;
    dirLight.shadow.camera.top	= 1;
    dirLight.shadow.camera.bottom = - 1;

    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add( dirLight );

    // ***** Clipping planes: *****

    const localPlane = new THREE.Plane( new THREE.Vector3( 0, - 5, 0 ), 0.8 );
    const globalPlane = new THREE.Plane( new THREE.Vector3( - 1, 0, 0 ), 0.1 );

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry( 9, 9, 1, 1 ),
      new THREE.MeshPhongMaterial( { color: 0xa0adaf, shininess: 150 } )
    );

    const material = new THREE.MeshBasicMaterial( {
      color: 0x80ee10,
      shininess: 100,
      side: THREE.DoubleSide,

      // ***** Clipping setup (material): *****
      clippingPlanes: [ localPlane ],
      clipShadows: true,

      alphaToCoverage: true,

    } );
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );

    const cube = new THREE.Mesh( geometry, material );
    cube.position.set( 0, 1, 0 );
    scene.add( cube );

    ground.rotation.x = - Math.PI / 2; // rotates X/Y to X/Z
    ground.receiveShadow = true;
    scene.add( ground );





    const stats = new Stats();
    // document.body.appendChild( renderer.domElement ); / containerRef.current.appendChild(renderer.domElement); rendererRef.current = stats;
    //containerRef.current.appendChild(stats.domElement);
    //rendererRef.current = stats;
    // Renderer

    const renderer2 = new THREE.WebGLRenderer( { antialias: true } );
    renderer2.shadowMap.enabled = true;
    renderer2.setPixelRatio( window.devicePixelRatio );
    renderer2.setSize( window.innerWidth, window.innerHeight );
    window.addEventListener( 'resize', onWindowResize );

    // document.body.appendChild( renderer.domElement ); / containerRef.current.appendChild(renderer.domElement); rendererRef.current = stats;
    //document.body.appendChild( renderer.domElement );
    containerRef.current.appendChild(renderer2.domElement); 
    rendererRef.current = renderer2;

    // ***** Clipping setup (renderer): *****
    const globalPlanes = [ globalPlane ],
      Empty = Object.freeze( [] );
    renderer.clippingPlanes = Empty; // GUI sets it to globalPlanes
    renderer.localClippingEnabled = true;

    // Controls

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.target.set( 0, 1, 0 );
    controls.update();

    // Start

    const startTime = Date.now();


    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.y += 0.01;
      cube.rotation.x += 0.01;

      renderer.render(scene, camera);
    };

    animate();
    
    return () => {
      if (rendererRef.current !== null) {
        rendererRef.current.domElement.remove(); // Verificar si el renderer existe antes de eliminarlo
      }
    };
  }, []);

  return <>    <Routes>
  <Route path="/" element={<Home />} />
</Routes><div ref={containerRef} /></>;
};

export default Cubo;
