import React, { useRef } from 'react';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import Ghost from './components/ghost';
import House from './components/house';
import Graves from './components/graves';
import Floor from './components/floor';

extend({ OrbitControls });

function CameraControls() {
  const {
    camera,
    gl: { domElement }
  } = useThree();
  // Ref to the controls so that we can update them on every frame using useFrame
  const controls = useRef();

  useFrame(() => controls.current.update());

  return (
    <mesh>
      <orbitControls
        ref={controls}
        args={[camera, domElement]}
        enableDamping={true}
        rotateSpeed={.05}
        zoomSpeed={.1}
      />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <CameraControls />
      <ambientLight color="#b9d5ff" intensity={.12} />
      <directionalLight color="#b9d5ff" intensity={.12} position={[4, 5, -2]} />
      <pointLight castShadow color="#ff7d46" intensity={1} distance={7} position={[0, 2.2, 2.7]} />
      <Ghost color={'#ff00ff'} intensity={2} distance={3} />
      <House />
      <Graves />
      <Floor />
    </>
  )
}

export default Scene;
