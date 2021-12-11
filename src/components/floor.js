import { useRef, useLayoutEffect } from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useLoader } from '@react-three/fiber';
import { BufferAttribute } from 'three';
import * as THREE from 'three';

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

export default Floor;