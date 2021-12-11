import React, { useRef, useState } from 'react';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });

function Floor() {
  const floorRef = useRef();
  const radiansX = -Math.PI * 0.5;

  return (
    <mesh ref={floorRef} rotation={[radiansX, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color={'green'} />
    </mesh>
  )
}

function CameraControls() {
  const {
    camera,
    gl: { domElement }
  } = useThree();

  // Ref to the controls so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      enableDamping={true}
    />
  )
}


function Scene() {
  return (
    <>
      <CameraControls />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {/* <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} /> */}
      <Floor />
    </>
  )
}

export default Scene;
