import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface SantaProps {
  position: [number, number, number];
}

export function Santa({ position }: SantaProps) {
  const santaRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (santaRef.current) {
      santaRef.current.rotation.y += 0.01;
      // Animation verticale relative à la position Y fournie
      santaRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <group ref={santaRef} position={position}>
      {/* Corps principal */}
      <Box args={[1.2, 1.5, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="red" />
      </Box>

      {/* Ceinture */}
      <Box args={[1.3, 0.2, 1.1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="black" />
      </Box>
      <Box args={[0.3, 0.3, 1.2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="gold" />
      </Box>

      {/* Jambes */}
      <Cylinder args={[0.2, 0.2, 1]} position={[-0.3, -1.2, 0]} rotation={[0, 0, 0]}>
        <meshStandardMaterial color="red" />
      </Cylinder>
      <Cylinder args={[0.2, 0.2, 1]} position={[0.3, -1.2, 0]} rotation={[0, 0, 0]}>
        <meshStandardMaterial color="red" />
      </Cylinder>

      {/* Bottes */}
      <Box args={[0.3, 0.3, 0.5]} position={[-0.3, -1.8, 0.1]}>
        <meshStandardMaterial color="black" />
      </Box>
      <Box args={[0.3, 0.3, 0.5]} position={[0.3, -1.8, 0.1]}>
        <meshStandardMaterial color="black" />
      </Box>

      {/* Bras */}
      <Cylinder args={[0.15, 0.15, 0.8]} position={[-0.7, 0.3, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <meshStandardMaterial color="red" />
      </Cylinder>
      <Cylinder args={[0.15, 0.15, 0.8]} position={[0.7, 0.3, 0]} rotation={[0, 0, Math.PI / 4]}>
        <meshStandardMaterial color="red" />
      </Cylinder>

      {/* Mains */}
      <Sphere args={[0.15, 32, 32]} position={[-1, 0, 0]}>
        <meshStandardMaterial color="white" />
      </Sphere>
      <Sphere args={[0.15, 32, 32]} position={[1, 0, 0]}>
        <meshStandardMaterial color="white" />
      </Sphere>

      {/* Tête */}
      <Sphere args={[0.4, 32, 32]} position={[0, 1.2, 0]}>
        <meshStandardMaterial color="#ffdbac" />
      </Sphere>

      {/* Chapeau */}
      <Box args={[0.5, 0.4, 0.5]} position={[0, 1.6, 0]}>
        <meshStandardMaterial color="red" />
      </Box>
      <Sphere args={[0.15, 32, 32]} position={[0, 1.8, 0]}>
        <meshStandardMaterial color="white" />
      </Sphere>

      {/* Yeux */}
      <Sphere args={[0.05, 32, 32]} position={[-0.15, 1.3, 0.3]}>
        <meshStandardMaterial color="black" />
      </Sphere>
      <Sphere args={[0.05, 32, 32]} position={[0.15, 1.3, 0.3]}>
        <meshStandardMaterial color="black" />
      </Sphere>

      {/* Nez */}
      <Sphere args={[0.08, 32, 32]} position={[0, 1.2, 0.35]}>
        <meshStandardMaterial color="red" />
      </Sphere>

      {/* Barbe */}
      <Box args={[0.6, 0.3, 0.2]} position={[0, 1, 0.3]}>
        <meshStandardMaterial color="white" />
      </Box>
    </group>
  );
}