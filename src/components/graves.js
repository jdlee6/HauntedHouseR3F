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

export default Graves;