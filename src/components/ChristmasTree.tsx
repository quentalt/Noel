import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cone, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import { ChristmasOrnament } from './ChristmasOrnament';
import { Garland } from './Garland';
import { Star } from './Star';

interface ChristmasTreeProps {
    position: [number, number, number];
}

const ORNAMENT_COLORS = [
    '#ff0000',    // Rouge classique
    '#ffd700',    // Or
    '#4169e1',    // Bleu royal
    '#ff69b4',    // Rose
    '#9400d3',    // Violet
    '#00ff00',    // Vert vif
    '#ff4500',    // Orange-rouge
    '#4682b4',    // Bleu acier
];

const GARLAND_COLOR = '#FFD700'; // Or

export function ChristmasTree({ position }: ChristmasTreeProps) {
    const treeRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (treeRef.current) {
            treeRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    // Create a path for the garland using CatmullRomCurve3
    const garlandPoints = [];
    for (let i = 0; i < 30; i++) {
        const angle = (i / 30) * Math.PI * 2 * 3; // 3 full rotations
        const radius = 1.5 - (i * 0.05);
        const height = 1.5 + (i * 0.1);
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        garlandPoints.push(new THREE.Vector3(x, height, z));
    }
    const garlandPath = new THREE.CatmullRomCurve3(garlandPoints);

    return (
        <group ref={treeRef} position={position}>
            {/* Tronc */}
            <Cylinder args={[0.3, 0.4, 1, 8]} position={[0, 0.5, 0]}>
                <meshStandardMaterial color="#4a2105" />
            </Cylinder>

            {/* Étages du sapin */}
            <Cone args={[2, 2, 8]} position={[0, 2, 0]}>
                <meshStandardMaterial color="#0f5132" />
            </Cone>
            <Cone args={[1.5, 2, 8]} position={[0, 3, 0]}>
                <meshStandardMaterial color="#0f5132" />
            </Cone>
            <Cone args={[1, 2, 8]} position={[0, 4, 0]}>
                <meshStandardMaterial color="#0f5132" />
            </Cone>

            {/* Boules de Noël */}
            {[...Array(30)].map((_, i) => {
                const layer = Math.floor(i / 10); // Répartition en couches
                const angleOffset = layer * (Math.PI / 5); // Décalage pour chaque couche
                const angle = (i % 10) * (Math.PI * 2 / 10) + angleOffset;
                const radius = 1.5 - (layer * 0.5); // Rayon ajusté pour chaque couche
                const height = 1.5 + (layer * 1.2); // Hauteur ajustée pour chaque couche
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                const color = ORNAMENT_COLORS[Math.floor(Math.random() * ORNAMENT_COLORS.length)];
                const size = layer === 2 ? 0.08 + Math.random() * 0.04 : 0.12 + Math.random() * 0.08; // Tailles variées, plus petites en haut

                // Réduire le nombre de boules en haut
                if (layer === 2 && i % 2 !== 0) return null;

                return (
                    <ChristmasOrnament
                        key={i}
                        position={[x, height, z]}
                        color={color}
                        size={size}
                    />
                );
            })}

            {/* Guirlandes */}
            <Garland path={garlandPath} color={GARLAND_COLOR} />

            {/* Étoile */}
            <Star position={[0, 5, 0]} />
        </group>
    );
}