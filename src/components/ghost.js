import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

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

export default Ghost;