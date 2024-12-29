import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {generateSnowTexture} from "../utils/textureGenerator.ts";

export function SnowGround() {
    const meshRef = useRef<THREE.Mesh>(null);
    const footprintsRef = useRef<{ position: THREE.Vector3; strength: number; time: number }[]>([]);

    // Création d'une grille plus dense pour de meilleures déformations
    const geometry = useMemo(() => {
        const geo = new THREE.PlaneGeometry(50, 50, 200, 200);
        // Stockage des positions initiales
        const initialPositions = new Float32Array(geo.attributes.position.array);
        geo.userData = { initialPositions };
        return geo;
    }, []);

    const snowTexture = useMemo(() => {
        const texture = new THREE.DataTexture(
            generateSnowTexture(),
            128,
            128,
            THREE.RGBAFormat,
            THREE.FloatType
        );
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(4, 4);
        texture.needsUpdate = true;
        return texture;
    }, []);

    // Fonction pour ajouter une empreinte
    const addFootprint = (position: THREE.Vector3) => {
        footprintsRef.current.push({
            position: position.clone(),
            strength: 1,
            time: Date.now()
        });
    };

    useFrame(() => {
        if (!meshRef.current) return;

        const positions = meshRef.current.geometry.attributes.position;
        const initialPositions = meshRef.current.geometry.userData.initialPositions;
        const now = Date.now();

        // Réinitialiser les positions
        positions.array.set(initialPositions);

        // Appliquer toutes les empreintes
        footprintsRef.current = footprintsRef.current.filter(footprint => {
            const age = (now - footprint.time) / 1000; // âge en secondes
            if (age > 30) return false; // Supprime les empreintes après 10 secondes

            const fadeStrength = Math.max(0, 1 - age / 10);

            for (let i = 0; i < positions.count; i++) {
                const x = positions.getX(i);
                const z = positions.getZ(i);
                const dx = x - footprint.position.x;
                const dz = z - footprint.position.z;
                const distance = Math.sqrt(dx * dx + dz * dz);

                if (distance < 0.3) { // Rayon de l'empreinte
                    const impact = (1 - distance / 0.3) * fadeStrength;
                    const y = positions.getY(i);
                    positions.setY(i, y - impact * 0.3); // Profondeur de l'empreinte
                }
            }
            return true;
        });

        positions.needsUpdate = true;
    });

    // Exposer la fonction addFootprint
    (window as unknown as { addSnowFootprint: (position: THREE.Vector3) => void }).addSnowFootprint = addFootprint;

    return (
        <mesh
            ref={meshRef}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -0.2, 0]}
            receiveShadow
        >
            <primitive object={geometry} />
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