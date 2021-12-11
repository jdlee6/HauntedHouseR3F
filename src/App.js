import React, { useRef, useLayoutEffect } from 'react';
import { extend, useFrame, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { BufferAttribute } from 'three';
import * as THREE from 'three';

extend({ OrbitControls });

function Walls() {
  const wallsRef = useRef();
  useLayoutEffect(() => {
    if (wallsRef.current) {
      wallsRef.current.geometry.setAttribute(
        'uv2',
        new BufferAttribute(wallsRef.current.geometry.attributes.uv.array, 2)
      )
    }
  })

  const wallsColorTexture = useLoader(TextureLoader, './static/textures/bricks/color.jpg');
  const wallsAmbientOcclusionTexture = useLoader(TextureLoader, './static/textures/bricks/ambientOcclusion.jpg');
  const wallsNormalTexture = useLoader(TextureLoader, './static/textures/bricks/normal.jpg');
  const wallsRoughnessTexture = useLoader(TextureLoader, './static/textures/bricks/roughness.jpg');

  return (
    <mesh ref={wallsRef} position={[0, 2.5 / 2, 0]} castShadow>
      <boxBufferGeometry attach="geometry" args={[4, 2.5, 4]} />
      <meshStandardMaterial
        attach="material"
        map={wallsColorTexture}
        normalMap={wallsNormalTexture}
        aoMap={wallsAmbientOcclusionTexture}
        aoMapIntensity={1}
        roughnessMap={wallsRoughnessTexture}
      />
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
  useLayoutEffect(() => {
    if (doorRef.current) {
      doorRef.current.geometry.setAttribute(
        'uv2',
        new BufferAttribute(doorRef.current.geometry.attributes.uv.array, 2)
      )
    }
  })

  const doorColorTexture = useLoader(TextureLoader, './static/textures/door/color.jpg');
  const doorAlphaTexture = useLoader(TextureLoader, './static/textures/door/alpha.jpg');
  const doorAmbientOcclusionTexture = useLoader(TextureLoader, './static/textures/door/ambientOcclusion.jpg');
  const doorHeightTexture = useLoader(TextureLoader, './static/textures/door/height.jpg');
  const doorNormalTexture = useLoader(TextureLoader, './static/textures/door/normal.jpg');
  const doorMetalnessTexture = useLoader(TextureLoader, './static/textures/door/metalness.jpg');
  const doorRoughnessTexture = useLoader(TextureLoader, './static/textures/door/roughness.jpg');

  return (
    <mesh ref={doorRef} position={[0, 2 / 2, 2 + 0.01]}>
      <planeBufferGeometry attach="geometry" args={[2.2, 2.2, 100, 100]} />
      <meshStandardMaterial
        attach="material"
        map={doorColorTexture}
        alphaMap={doorAlphaTexture}
        // displacement requires alot of subdivisions
        displacementMap={doorHeightTexture}
        displacementScale={0.1}
        normalMap={doorNormalTexture}
        metalnessMap={doorMetalnessTexture}
        roughnessMap={doorRoughnessTexture}
        transparent={true}
        aoMap={doorAmbientOcclusionTexture}
        aoMapIntensity={1}
      />
    </mesh>
  )
}

function Bush(props) {
  return (
    <>
      <mesh position={props.position} scale={props.scale} castShadow>
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
          <mesh key={i} position={[x, 0.3, z]} rotation={[0, radiansY, radiansZ]} castShadow>
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

  useLayoutEffect(() => {
    if (floorRef.current) {
      floorRef.current.geometry.setAttribute(
        'uv2',
        new BufferAttribute(floorRef.current.geometry.attributes.uv.array, 2)
      )
    }
  })

  const grassColorTexture = useLoader(TextureLoader, './static/textures/grass/color.jpg');
  const grassAmbientOcclusionTexture = useLoader(TextureLoader, './static/textures/grass/ambientOcclusion.jpg');
  const grassNormalTexture = useLoader(TextureLoader, './static/textures/grass/normal.jpg');
  const grassRoughnessTexture = useLoader(TextureLoader, './static/textures/grass/roughness.jpg');

  if (grassColorTexture && grassAmbientOcclusionTexture && grassNormalTexture && grassRoughnessTexture) {
    grassColorTexture.repeat.set(8, 8);
    grassColorTexture.wrapS = grassColorTexture.wrapT = THREE.RepeatWrapping;
    grassAmbientOcclusionTexture.repeat.set(8, 8);
    grassAmbientOcclusionTexture.wrapS = grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
    grassNormalTexture.repeat.set(8, 8);
    grassNormalTexture.wrapS = grassNormalTexture.wrapT = THREE.RepeatWrapping;
    grassRoughnessTexture.repeat.set(8, 8);
    grassRoughnessTexture.wrapS = grassRoughnessTexture.wrapT = THREE.RepeatWrapping;
  }

  return (
    <mesh ref={floorRef} rotation={[radiansX, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry attach="geometry" args={[20, 20]} />
      <meshStandardMaterial
        attach="material"
        map={grassColorTexture}
        aoMap={grassAmbientOcclusionTexture}
        normalMap={grassNormalTexture}
        roughnessMap={grassRoughnessTexture}
        aoMapIntensity={1}
      />
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

function Ghost(props) {
  const ghostRef = useRef();

  useFrame((t) => {
    const angle = t.clock.elapsedTime * 0.5;
    ghostRef.current.position.x = Math.cos(angle) * 5;
    ghostRef.current.position.z = Math.sin(angle) * 5;
    ghostRef.current.position.y = Math.cos(t.clock.elapsedTime * 3);
  })

  return (
    <mesh ref={ghostRef}>
      <pointLight
        color={props.color}
        intensity={props.intensity}
        distance={props.distance}
        position={props.position}
        castShadow
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
