import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import { Antler } from './Antler';

interface ReindeerProps {
    position: [number, number, number];
}

export function Reindeer({ position }: ReindeerProps) {
    const reindeerRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (reindeerRef.current) {
            const headBob = Math.sin(state.clock.elapsedTime * 2) * 0.1;
            if (reindeerRef.current.children[0]) {
                reindeerRef.current.children[0].rotation.x = headBob;
            }
        }
    });

    return (
        <group ref={reindeerRef} position={[position[0], position[1] + 0.4, position[2]]}>
            {/* Corps */}
            <group>
                <Cylinder args={[0.4, 0.5, 1.2, 8]} position={[0, 0.8, 0]} rotation={[Math.PI / 2.8, 0, 0]}>
                    <meshStandardMaterial color="#8B4513" />
                </Cylinder>
            </group>

            {/* Queue */}
            <Sphere args={[0.1, 32, 32]} position={[0, 0.9, -0.6]}>
                <meshStandardMaterial color="#8B4513" />
            </Sphere>

            {/* Cou */}
            <Cylinder args={[0.2, 0.3, 0.8, 8]} position={[0, 1.2, 0.4]} rotation={[Math.PI / 4, 0, 0]}>
                <meshStandardMaterial color="#8B4513" />
            </Cylinder>

            {/* Tête */}
            <group position={[0, 1.6, 0.8]}>
                <Sphere args={[0.25, 32, 32]}>
                    <meshStandardMaterial color="#8B4513" />
                </Sphere>

                {/* Museau */}
                <Sphere args={[0.15, 32, 32]} position={[0, -0.1, 0.2]}>
                    <meshStandardMaterial color="#A0522D" />
                </Sphere>

                {/* Nez */}
                <Sphere args={[0.08, 32, 32]} position={[0, -0.1, 0.35]}>
                    <meshStandardMaterial
                        color="#8B0000"
                        emissive="#ff0000"
                        emissiveIntensity={0.5}
                    />
                </Sphere>

                {/* Yeux */}
                <group position={[0.15, 0.05, 0.2]}>
                    <Sphere args={[0.05, 32, 32]}>
                        <meshStandardMaterial color="white" />
                    </Sphere>
                    <Sphere args={[0.03, 32, 32]} position={[0, 0, 0.02]}>
                        <meshStandardMaterial color="black" />
                    </Sphere>
                    <Sphere args={[0.01, 32, 32]} position={[0.01, 0.01, 0.04]} >
                        <meshStandardMaterial color="white" />
                    </Sphere>
                </group>
                <group position={[-0.15, 0.05, 0.2]}>
                    <Sphere args={[0.05, 32, 32]}>
                        <meshStandardMaterial color="white" />
                    </Sphere>
                    <Sphere args={[0.03, 32, 32]} position={[0, 0, 0.02]}>
                        <meshStandardMaterial color="black" />
                    </Sphere>
                    <Sphere args={[0.01, 32, 32]} position={[0.01, 0.01, 0.04]}>
                        <meshStandardMaterial color="white" />
                    </Sphere>
                </group>

                {/* Bois */}
                <Antler position={[0.2, 0.2, -0.1]} scale={1} />
                <Antler position={[-0.2, 0.2, -0.1]} scale={1} rotation={[0, Math.PI, 0]} />
            </group>

            {/* Jambes avec pattes */}
            {[[-0.3, -0.3], [0.3, -0.3], [-0.3, 0.3], [0.3, 0.3]].map(([x, z], i) => (
                <group key={i} position={[x, 0.4, z]}>
                    {/* Jambe */}
                    <Cylinder args={[0.08, 0.08, 0.7]} position={[0, 0, 0]}>
                        <meshStandardMaterial color="#8B4513" />
                    </Cylinder>

                    {/* Articulation */}
                    <Sphere args={[0.09, 16, 16]} position={[0, -0.35, 0]}>
                        <meshStandardMaterial color="#8B4513" />
                    </Sphere>

                    {/* Patte */}
                    <group position={[0, -0.4, 0.05]}>
                        <Sphere args={[0.1, 16, 16]} position={[0, 0, 0]}>
                            <meshStandardMaterial color="#5C3317" />
                        </Sphere>
                        <Sphere args={[0.08, 16, 16]} position={[0, 0, 0.05]}>
                            <meshStandardMaterial color="#5C3317" />
                        </Sphere>
                    </group>
                </group>
            ))}
        </group>
    );
}