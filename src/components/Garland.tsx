import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Tube } from '@react-three/drei';
import * as THREE from 'three';

interface GarlandProps {
    path: THREE.Curve<THREE.Vector3>;
    color: string;
}

export function Garland({ path, color }: GarlandProps) {
    const garlandRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (garlandRef.current) {
            garlandRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <Tube ref={garlandRef} args={[path, 64, 0.05, 8, false]}>
            <meshStandardMaterial color={color} />
        </Tube>
    );
}