import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface OrnamentProps {
    position: [number, number, number];
    color: string;
    size?: number;
}

export function ChristmasOrnament({ position, color, size = 0.15 }: OrnamentProps) {
    const ornamentRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (ornamentRef.current) {
            // Légère rotation de la boule
            ornamentRef.current.rotation.y = Math.sin(state.clock.elapsedTime + Math.random()) * 0.1;
        }
    });

    return (
        <group ref={ornamentRef} position={position}>
            {/* Attache métallique */}
            <Cylinder
                args={[0.02, 0.02, 0.1, 8]}
                position={[0, size + 0.05, 0]}
                rotation={[0, 0, 0]}
            >
                <meshStandardMaterial
                    color="#silver"
                    metalness={1}
                    roughness={0.2}
                />
            </Cylinder>

            {/* Boule principale */}
            <Sphere args={[size, 32, 32]} position={[0, 0, 0]}>
                <meshPhysicalMaterial
                    color={color}
                    metalness={0.9}
                    roughness={0.1}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    reflectivity={1}
                    emissive={color}
                    emissiveIntensity={0.2}
                />
            </Sphere>

            {/* Reflet lumineux */}
            <Sphere args={[size * 0.2, 16, 16]} position={[size * 0.5, size * 0.5, size * 0.5]}>
                <meshBasicMaterial color="white" transparent opacity={0.6} />
            </Sphere>
        </group>
    );
}