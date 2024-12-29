import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
const ribbonColors = ['#ffffff', '#ffd700', '#ff69b4', '#00ff00', '#4169e1'];

export function Present({ position }: { position: [number, number, number] }) {
    const presentRef = useRef<THREE.Group>(null);
    const color = colors[Math.floor(Math.random() * colors.length)];
    const ribbonColor = ribbonColors[Math.floor(Math.random() * ribbonColors.length)];

    useFrame(() => {
        if (presentRef.current) {
            presentRef.current.rotation.y += 0.01;
        }
    });

    return (
        <group ref={presentRef} position={position}>
            {/* Boîte principale */}
            <Box args={[0.4, 0.4, 0.4]} position={[0, 0, 0]}>
                <meshStandardMaterial color={color} />
            </Box>

            {/* Ruban vertical */}
            <Box args={[0.05, 0.42, 0.42]} position={[0, 0, 0]}>
                <meshStandardMaterial color={ribbonColor} />
            </Box>

            {/* Ruban horizontal */}
            <Box args={[0.42, 0.42, 0.05]} position={[0, 0, 0]}>
                <meshStandardMaterial color={ribbonColor} />
            </Box>

            {/* Nœud du ruban */}
            <group position={[0, 0.2, 0]}>
                {/* Boucles */}
                <Cylinder args={[0.1, 0.1, 0.05, 32]} position={[-0.1, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshStandardMaterial color={ribbonColor} />
                </Cylinder>
                <Cylinder args={[0.1, 0.1, 0.05, 32]} position={[0.1, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshStandardMaterial color={ribbonColor} />
                </Cylinder>

                {/* Centre du nœud */}
                <Box args={[0.1, 0.1, 0.05]} position={[0, 0, 0]}>
                    <meshStandardMaterial color={ribbonColor} />
                </Box>
            </group>
        </group>
    );
}