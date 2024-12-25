import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface StarProps {
    position: [number, number, number];
    color?: string;
    size?: number;
}

export function Star({ position, color = 'rgba(255,215,0,0.82)', size = 0.3 }: StarProps) {
    const starRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (starRef.current) {
            starRef.current.rotation.y = state.clock.elapsedTime;
        }
    });

    // Create a 5-pointed star shape
    const starShape = new THREE.Shape();
    const outerRadius = size;
    const innerRadius = size / 2.5;
    const angle = Math.PI / 5;

    for (let i = 0; i < 10; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const x = Math.cos(i * angle) * radius;
        const y = Math.sin(i * angle) * radius;
        if (i === 0) {
            starShape.moveTo(x, y);
        } else {
            starShape.lineTo(x, y);
        }
    }
    starShape.closePath();

    // Extrude the star shape to give it some depth
    const extrudeSettings = {
        depth: 0.1,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelSegments: 1,
    };
    const geometry = new THREE.ExtrudeGeometry(starShape, extrudeSettings);

    return (
        <mesh ref={starRef} geometry={geometry} position={position} rotation={[0, Math.PI / 10, 0]}>
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.8}
                metalness={0.9}
                roughness={0.1}
            />
            <pointLight color={color} intensity={1} distance={2} />
        </mesh>
    );
}