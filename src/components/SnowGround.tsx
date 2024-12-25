import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {generateSnowTexture} from "../utils/textureGenerator.ts";

export function SnowGround() {
    const meshRef = useRef<THREE.Mesh>(null);

    const snowTexture = new THREE.DataTexture(
        generateSnowTexture(),
        128,
        128,
        THREE.RGBAFormat,
        THREE.FloatType
    );
    snowTexture.wrapS = THREE.RepeatWrapping;
    snowTexture.wrapT = THREE.RepeatWrapping;
    snowTexture.repeat.set(4, 4);
    snowTexture.needsUpdate = true;

    useFrame((state) => {
        if (meshRef.current) {
            const material = meshRef.current.material as THREE.MeshStandardMaterial;
            material.emissiveIntensity = 0.15 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
        }
    });

    return (
        <mesh
            ref={meshRef}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -0.2, 0]}
            receiveShadow
        >
            <planeGeometry args={[50, 50, 256, 256]} />
            <meshStandardMaterial
                color="#ffffff"
                metalness={0.1}
                roughness={0.9}
                emissive="#ffffff"
                emissiveIntensity={0.15}
                map={snowTexture}
                displacementMap={snowTexture}
                displacementScale={0.3}
                bumpMap={snowTexture}
                bumpScale={0.2}
            />
        </mesh>
    );
}