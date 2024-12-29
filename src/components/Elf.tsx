import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import { useGameState } from './GameState';

interface ElfProps {
    position: [number, number, number];
}

export function Elf({ position }: ElfProps) {
    const elfRef = useRef<THREE.Group>(null);
    const { selectedPresentId, setSelectedPresent } = useGameState();
    const presentHeight = useRef(0);

    useFrame((state) => {
        if (elfRef.current) {
            elfRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2;
        }
    });

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!elfRef.current) return;

            const speed = 0.2;
            switch (event.key.toLowerCase()) {
                case 'z':
                case 'arrowup':
                    elfRef.current.position.z -= speed;
                    break;
                case 's':
                case 'arrowdown':
                    elfRef.current.position.z += speed;
                    break;
                case 'q':
                case 'arrowleft':
                    elfRef.current.position.x -= speed;
                    break;
                case 'd':
                case 'arrowright':
                    elfRef.current.position.x += speed;
                    break;
                case ' ':
                    if (selectedPresentId) {
                        presentHeight.current = 2; // Hauteur du traîneau
                        setSelectedPresent(null);
                    }
                    break;
            }

            // Rotation de l'elfe dans la direction du mouvement
            if (['z', 's', 'q', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(event.key.toLowerCase())) {
                const direction = new THREE.Vector3();
                if (event.key.toLowerCase() === 'z' || event.key === 'arrowup') direction.z = -1;
                if (event.key.toLowerCase() === 's' || event.key === 'arrowdown') direction.z = 1;
                if (event.key.toLowerCase() === 'q' || event.key === 'arrowleft') direction.x = -1;
                if (event.key.toLowerCase() === 'd' || event.key === 'arrowright') direction.x = 1;

                if (direction.length() > 0) {
                    const angle = Math.atan2(direction.x, direction.z);
                    elfRef.current.rotation.y = angle;
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedPresentId, setSelectedPresent]);

    useFrame((state) => {
        if (elfRef.current) {
            // Animation de base
            elfRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;

            // Animation du cadeau porté
            if (presentHeight.current > 0) {
                presentHeight.current = Math.max(0, presentHeight.current - 0.1);
            }
        }
    });

    return (
        <group ref={elfRef} position={position}>
            {/* Corps existant de l'Elf */}
            {/* Corps */}
            <Box args={[0.4, 0.6, 0.3]} position={[0, 0, 0]}>
                <meshStandardMaterial color="green"/>
            </Box>

            {/* Ceinture */}
            <Box args={[0.45, 0.1, 0.35]} position={[0, 0, 0]}>
                <meshStandardMaterial color="black"/>
            </Box>

            {/* Jambes */}
            <Cylinder args={[0.08, 0.08, 0.4]} position={[-0.1, -0.5, 0]}>
                <meshStandardMaterial color="green"/>
            </Cylinder>
            <Cylinder args={[0.08, 0.08, 0.4]} position={[0.1, -0.5, 0]}>
                <meshStandardMaterial color="green"/>
            </Cylinder>

            {/* Chaussures */}
            <Box args={[0.12, 0.1, 0.2]} position={[-0.1, -0.7, 0.05]}>
                <meshStandardMaterial color="#8B4513"/>
            </Box>
            <Box args={[0.12, 0.1, 0.2]} position={[0.1, -0.7, 0.05]}>
                <meshStandardMaterial color="#8B4513"/>
            </Box>

            {/* Bras */}
            <Cylinder args={[0.06, 0.06, 0.4]} position={[-0.25, 0.1, 0]} rotation={[0, 0, -Math.PI / 4]}>
                <meshStandardMaterial color="green"/>
            </Cylinder>
            <Cylinder args={[0.06, 0.06, 0.4]} position={[0.25, 0.1, 0]} rotation={[0, 0, Math.PI / 4]}>
                <meshStandardMaterial color="green"/>
            </Cylinder>

            {/* Mains */}
            <Sphere args={[0.06, 32, 32]} position={[-0.35, 0, 0]}>
                <meshStandardMaterial color="#ffdbac"/>
            </Sphere>
            <Sphere args={[0.06, 32, 32]} position={[0.35, 0, 0]}>
                <meshStandardMaterial color="#ffdbac"/>
            </Sphere>

            {/* Tête */}
            <Sphere args={[0.2, 32, 32]} position={[0, 0.5, 0]}>
                <meshStandardMaterial color="#ffdbac"/>
            </Sphere>

            {/* Chapeau */}
            <Box args={[0.25, 0.2, 0.25]} position={[0, 0.7, 0]}>
                <meshStandardMaterial color="green"/>
            </Box>
            <Sphere args={[0.08, 32, 32]} position={[0, 0.85, 0]}>
                <meshStandardMaterial color="red"/>
            </Sphere>

            {/* Oreilles pointues */}
            <Box args={[0.05, 0.15, 0.05]} position={[-0.2, 0.5, 0]} rotation={[0, 0, -Math.PI / 6]}>
                <meshStandardMaterial color="#ffdbac"/>
            </Box>
            <Box args={[0.05, 0.15, 0.05]} position={[0.2, 0.5, 0]} rotation={[0, 0, Math.PI / 6]}>
                <meshStandardMaterial color="#ffdbac"/>
            </Box>

            {/* Yeux */}
            <Sphere args={[0.03, 32, 32]} position={[-0.08, 0.55, 0.15]}>
                <meshStandardMaterial color="black"/>
            </Sphere>
            <Sphere args={[0.03, 32, 32]} position={[0.08, 0.55, 0.15]}>
                <meshStandardMaterial color="black"/>
            </Sphere>

            {/* Nez */}
            <Sphere args={[0.04, 32, 32]} position={[0, 0.5, 0.18]}>
                <meshStandardMaterial color="#ffb6c1"/>
            </Sphere>

            {/* Sourire */}
            <Box args={[0.15, 0.02, 0.02]} position={[0, 0.45, 0.18]} rotation={[0, 0, Math.PI / 8]}>
                <meshStandardMaterial color="#ff9999"/>
            </Box>
        </group>
    );
}