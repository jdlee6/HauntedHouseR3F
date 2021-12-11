import { useRef, useLayoutEffect } from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useLoader } from '@react-three/fiber';
import { BufferAttribute } from 'three';

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

export default House;