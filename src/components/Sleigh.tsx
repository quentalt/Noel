import { useRef } from 'react';
import { Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

export function Sleigh({ position }: { position: [number, number, number] }) {
    const sleighRef = useRef<THREE.Group>(null);

    return (
        <group ref={sleighRef} position={position}>
            {/* Base du traîneau */}
            <Box args={[2, 0.1, 4]} position={[0, 0.2, 0]}>
                <meshStandardMaterial color="#8B4513" />
            </Box>

            {/* Côtés du traîneau */}
            <Box args={[0.1, 0.8, 4]} position={[-1, 0.6, 0]}>
                <meshStandardMaterial color="#8B4513" />
            </Box>
            <Box args={[0.1, 0.8, 4]} position={[1, 0.6, 0]}>
                <meshStandardMaterial color="#8B4513" />
            </Box>

            {/* Avant courbé */}
            <Box args={[2, 0.8, 0.1]} position={[0, 0.6, 2]} rotation={[0.3, 0, 0]}>
                <meshStandardMaterial color="#8B4513" />
            </Box>

            {/* Patins */}
            {[-0.8, 0.8].map((x, i) => (
                <group key={i} position={[x, 0, 0]}>
                    <Cylinder
                        args={[0.1, 0.1, 4.5, 8]}
                        position={[0, -0.1, 0]}
                        rotation={[Math.PI / 2, 0, 0]}
                    >
                        <meshStandardMaterial color="#4A3219" />
                    </Cylinder>
                    <Box
                        args={[0.2, 0.4, 0.8]}
                        position={[0, 0.1, 1.8]}
                        rotation={[0.5, 0, 0]}
                    >
                        <meshStandardMaterial color="#4A3219" />
                    </Box>
                </group>
            ))}

            {/* Décorations */}
            {Array.from({ length: 8 }).map((_, i) => (
                <Box
                    key={i}
                    args={[2.2, 0.1, 0.05]}
                    position={[0, 0.3, -1.5 + i * 0.5]}
                >
                    <meshStandardMaterial color="#A52A2A" />
                </Box>
            ))}
        </group>
    );
}