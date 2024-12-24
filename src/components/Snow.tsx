import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

function Snowflake({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.position.y -= 0.02;
      if (ref.current.position.y < -5) {
        ref.current.position.y = 10;
      }
    }
  });

  return (
    <Sphere ref={ref} args={[0.02, 8, 8]} position={position}>
      <meshStandardMaterial color="white" />
    </Sphere>
  );
}

export function Snow() {
  const snowflakes = Array.from({ length: 200 }, (_, i) => {
    const x = (Math.random() - 0.5) * 20;
    const y = Math.random() * 20 - 10;
    const z = (Math.random() - 0.5) * 20;
    return <Snowflake key={i} position={[x, y, z]} />;
  });

  return <>{snowflakes}</>;
}