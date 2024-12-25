import { Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface AntlerProps {
    position: [number, number, number];
    rotation?: [number, number, number];
    scale?: number;
}

export function Antler({ position, rotation = [0, 0, 0], scale = 1 }: AntlerProps) {
    const brownMaterial = <meshStandardMaterial color="#8B4513" />;

    return (
        <group position={position} rotation={new THREE.Euler(...rotation)} scale={scale}>
            {/* Base du bois */}
            <Cylinder args={[0.04, 0.05, 0.4, 8]} position={[0, 0.2, 0]} rotation={[0, 0, 0.3]}>
                {brownMaterial}
            </Cylinder>

            {/* Première branche */}
            <Cylinder args={[0.03, 0.04, 0.3, 8]} position={[0.1, 0.3, 0]} rotation={[0, 0, 0.8]}>
                {brownMaterial}
            </Cylinder>

            {/* Deuxième branche */}
            <Cylinder args={[0.03, 0.04, 0.25, 8]} position={[0.15, 0.4, 0]} rotation={[0, 0, -0.4]}>
                {brownMaterial}
            </Cylinder>

            {/* Troisième branche */}
            <Cylinder args={[0.02, 0.03, 0.2, 8]} position={[0.2, 0.5, 0]} rotation={[0, 0, 0.6]}>
                {brownMaterial}
            </Cylinder>


        </group>
    );
}