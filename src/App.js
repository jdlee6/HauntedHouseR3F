import React, { useRef, useState } from 'react';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });

function Walls() {
  const wallsRef = useRef();
  return (
    <mesh ref={wallsRef} position={[0, 2.5 / 2, 0]}>
      <boxBufferGeometry attach="geometry" args={[4, 2.5, 4]} />
      <meshStandardMaterial attach="material" color={"#ac8e82"} />
    </mesh>
  )
}

function Roof() {
  const roofRef = useRef();
  const radiansY = Math.PI * 0.25;
  return (
    <mesh ref={roofRef} position={[0, 2.5 + 0.5, 0]} rotation={[0, radiansY, 0]}>
      <coneBufferGeometry attach="geometry" args={[3.5, 1, 4]} />
      <meshStandardMaterial attach="material" color={"#b45f45"} />
    </mesh>
  )
}

function Door() {
  const doorRef = useRef();
  return (
    <mesh ref={doorRef} position={[0, 2 / 2, 2 + 0.01]}>
      <planeBufferGeometry attach="geometry" args={[2, 2]} />
      <meshStandardMaterial attach="material" color="#aa7b7b" />
    </mesh>
  )
}

function Bush(props) {
  return (
    <>
      <mesh position={props.position} scale={props.scale}>
        <sphereBufferGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#89c854" />
      </mesh>
    </>
  )
}

function House() {
  return (
    <group>
      <Walls />
      <Roof />
      <Door />
      <Bush position={[0.8, 0.2, 2.2]} scale={[0.5, 0.5, 0.5]} />
      <Bush position={[1.4, 0.1, 2.1]} scale={[0.25, 0.25, 0.25]} />
      <Bush position={[-0.8, 0.1, 2.2]} scale={[0.4, 0.4, 0.4]} />
      <Bush position={[-1, 0.05, 2.6]} scale={[0.15, 0.15, 0.15]} />
    </group>
  )
}

function Graves() {
  const NUM = 50;
  const graves = new Array(NUM).fill();
  return (
    <group>
      {graves.map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const radius = 3 + Math.random() * 6;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        const radiansY = (Math.random() - 0.5) * 0.4;
        const radiansZ = (Math.random() - 0.5) * 0.4;

        return (
          <mesh key={i} position={[x, 0.3, z]} rotation={[0, radiansY, radiansZ]}>
            <boxBufferGeometry attach="geometry" args={[0.6, 0.8, 0.2]} />
            <meshStandardMaterial attach="material" color={"#b2b6b1"} />
          </mesh>
        )
      })}
    </group>
  )
}

function Floor() {
  const floorRef = useRef();
  const radiansX = -Math.PI * 0.5;
  return (
    <mesh ref={floorRef} rotation={[radiansX, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry attach="geometry" args={[20, 20]} />
      <meshStandardMaterial attach="material" color={'#a9c388'} />
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
    <mesh>
      <orbitControls
        ref={controls}
        args={[camera, domElement]}
        enableDamping={true}
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
      <pointLight color="#ff7d46" intensity={1} distance={7} position={[0, 2.2, 2.7]} />
      <House />
      <Graves />
      <Floor />
    </>
  )
}

export default Scene;
