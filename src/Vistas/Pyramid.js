import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Pyramid = () => {
  const containerRef = useRef();
  const rendererRef = useRef(null); // Mantener una referencia al renderer
  const [modo3D, setModo3D] = useState(true);
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  const scene = new THREE.Scene();
  var camera = useRef(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));
  var animater = useRef(true)
  // Piramide
  const geometry = new THREE.ConeGeometry(1, 2, 4);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const pyramid = new THREE.Mesh(geometry, material);
  pyramid.position.set(0, 1, 0);
  scene.add(pyramid);
  const animateId = useRef(null);

  var animate = () => {
    
    if(animater.current){
    animateId.current = requestAnimationFrame(animate);
    pyramid.rotation.y += 0.01;
    console.log("Anime1 ")
    }
    else{
      animateId.current = requestAnimationFrame(animate);
      pyramid.rotation.y = 0.00;
      console.log("Anime2 ")
    }
    renderer.render(scene, camera.current);
  };

  useEffect(() => {
    
    camera.current.position.set(0, 1.3, 3);

    const onWindowResize = () => {
      camera.current.aspect = window.innerWidth / window.innerHeight;
      camera.current.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    window.addEventListener('resize', onWindowResize);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // LUZ
    scene.add(new THREE.AmbientLight(0xcccccc));

    const spotLight = new THREE.SpotLight(0xffffff, 60);
    spotLight.angle = Math.PI / 5;
    spotLight.penumbra = 0.2;
    spotLight.position.set(2, 3, 3);
    spotLight.castShadow = true;
    spotLight.shadow.camera.near = 3;
    spotLight.shadow.camera.far = 10;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    scene.add(spotLight);

    const dirLight = new THREE.DirectionalLight(0x55505a, 3);
    dirLight.position.set(0, 3, 0);
    dirLight.castShadow = true;
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 10;
    dirLight.shadow.camera.right = 1;
    dirLight.shadow.camera.left = -1;
    dirLight.shadow.camera.top = 1;
    dirLight.shadow.camera.bottom = -1;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    

    animate()
    
 

    // Piso
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(9, 9, 1, 1),
      new THREE.MeshPhongMaterial({ color: 0xa0adaf, shininess: 150 })
    );
    ground.rotation.x = -Math.PI / 2; // rotates X/Y to X/Z
    ground.receiveShadow = true;
    scene.add(ground);

    // Clipping setup (renderer)
    const localPlane = new THREE.Plane(new THREE.Vector3(0, -5, 0), 0.8);
    const globalPlane = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0.1);
    const globalPlanes = [globalPlane];
    const Empty = Object.freeze([]);
    renderer.clippingPlanes = Empty; // GUI sets it to globalPlanes
    renderer.localClippingEnabled = true;

    // Controls
    const controls = new OrbitControls(camera.current, renderer.domElement);
    controls.target.set(0, 1, 0);
    controls.update();

    return () => {
      if (rendererRef.current !== null) {
        rendererRef.current.domElement.remove();
      }
    };
  }, []);

  const cambiarModo = () => {
    setModo3D(!modo3D);
    console.log(animater.current)
    console.log(modo3D)
      if (modo3D) {
          console.log("Set 2D")
          console.log(camera.current.position)
          camera.current.position.set(0, 0, 4); // Cambiar la posición de la cámara para la vista 2D
          console.log(camera.current.position)
          animater.current = false

        
      } else {
          console.log("Set 3D")
          console.log(camera.current.position)
          camera.current.position.set(0, 1.3, 3); // Restablecer la posición de la cámara para la vista 3D
          console.log(camera.current.position)
          animater.current = true

        
      }
      console.log(animater.current)
  };

 
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <button onClick ={cambiarModo}>Cambiar a modo {modo3D ? '2D' : '3D'}</button>
      <div ref={containerRef} />
      
    </>
  );
};

export default Pyramid;
