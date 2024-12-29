import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Sphere, Plane } from '@react-three/drei';
import { Antler } from './Antler';
import {useReindeerMovement} from "../hooks/useReindeerMovement.ts";
import {useReindeerAnimation} from "../hooks/useReindeerAnimation.ts";


interface ReindeerProps {
    position: [number, number, number];
}


export function Reindeer({ position }: ReindeerProps) {
    const reindeerRef = useRef<THREE.Group>(null);
    const bodyRef = useRef<THREE.Group>(null);
    const headRef = useRef<THREE.Group>(null);
    const legsRef = useRef<THREE.Group[]>([]);
    const lastPosition = useRef(new THREE.Vector3(...position));

    const { updateMovement } = useReindeerMovement(reindeerRef);
    const { updateAnimations } = useReindeerAnimation(bodyRef, headRef, legsRef);


    useFrame((state) => {
        if (!reindeerRef.current) return;

        updateMovement();
        updateAnimations(state.clock.getElapsedTime());

        // Gestion des empreintes
        const currentPosition = new THREE.Vector3();
        reindeerRef.current.getWorldPosition(currentPosition);

        if (currentPosition.distanceTo(lastPosition.current) > 0.5) {
            // Ajouter des empreintes pour chaque patte
            const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(reindeerRef.current.quaternion);
            const right = new THREE.Vector3(1, 0, 0).applyQuaternion(reindeerRef.current.quaternion);

            const footOffsets = [
                right.clone().multiplyScalar(-0.3).add(forward.clone().multiplyScalar(0.3)),
                right.clone().multiplyScalar(0.3).add(forward.clone().multiplyScalar(0.3)),
                right.clone().multiplyScalar(-0.3).add(forward.clone().multiplyScalar(-0.3)),
                right.clone().multiplyScalar(0.3).add(forward.clone().multiplyScalar(-0.3))
            ];

            footOffsets.forEach(offset => {
                const footPosition = currentPosition.clone().add(offset);
                (window as unknown as { addSnowFootprint?: (position: THREE.Vector3) => void }).addSnowFootprint?.(footPosition);
            });

            lastPosition.current.copy(currentPosition);
        }
    });

    return (
        <group ref={reindeerRef} position={[position[0], position[1] + 0.4, position[2]]}>
            <group ref={bodyRef}>
                {/* Corps principal */}
                <Cylinder
                    args={[0.35, 0.45, 1.4, 12]}
                    position={[0, 0.8, 0]}
                    rotation={[Math.PI / 2.8, 0, 0]}
                >
                    <meshStandardMaterial color="#8B4513" roughness={0.7} metalness={0.1}/>
                </Cylinder>

                {/* Queue */}
                <group position={[0, 0.9, -0.7]}>
                    <Sphere args={[0.12, 32, 32]}>
                        <meshStandardMaterial color="#8B4513" roughness={0.9}/>
                    </Sphere>
                </group>

                <Cylinder args={[0.15, 0.2, 0.8, 8]} position={[0, 1.2, 0.4]} rotation={[Math.PI / 4, 0, 0]}>
                    <meshStandardMaterial color="#8B4513"/>
                </Cylinder>

                {/* Tête et bois */}
                <group ref={headRef} position={[0, 1.5, 0.9]}>
                    <Sphere args={[0.25, 32, 32]}>
                        <meshStandardMaterial color="#8B4513"/>
                    </Sphere>

                    <Sphere args={[0.15, 32, 32]} position={[0, -0.1, 0.2]}>
                        <meshStandardMaterial color="#A0522D"/>
                    </Sphere>

                    <Sphere args={[0.08, 32, 32]} position={[0, -0.1, 0.35]}>
                        <meshStandardMaterial
                            color="#8B0000"
                            emissive="#ff0000"
                            emissiveIntensity={0.5}
                        />
                    </Sphere>

                    {/* Ajout des yeux */}
                    <Sphere args={[0.05, 32, 32]} position={[-0.1, 0.05, 0.2]}>
                        <meshStandardMaterial color="#000000"/>
                    </Sphere>
                    <Sphere args={[0.05, 32, 32]} position={[0.1, 0.05, 0.2]}>
                        <meshStandardMaterial color="#000000"/>
                    </Sphere>

                    <Antler position={[0.2, 0.25, -0.05]} scale={1}/>
                    <Antler position={[-0.2, 0.25, -0.05]} scale={1} rotation={[0, Math.PI, 0]}/>

                    {/* Ajout des oreilles */}
                    <group position={[-0.2, 0.2, 0]}>
                        <Plane args={[0.1, 0.2]} rotation={[0, 0, Math.PI / 4]}>
                            <meshStandardMaterial color="#8B4513"/>
                        </Plane>
                    </group>
                    <group position={[0.2, 0.2, 0]}>
                        <Plane args={[0.1, 0.2]} rotation={[0, 0, -Math.PI / 4]}>
                            <meshStandardMaterial color="#8B4513"/>
                        </Plane>
                    </group>
                </group>

                {/* Jambes */}
                {[[-0.3, -0.3], [0.3, -0.3], [-0.3, 0.3], [0.3, 0.3]].map(([x, z], i) => (
                    <group
                        key={i}
                        position={[x, 0.4, z]}
                        ref={el => {
                            if (el) legsRef.current[i] = el
                        }}
                    >
                        <Cylinder args={[0.08, 0.08, 0.7]}>
                            <meshStandardMaterial color="#8B4513"/>
                        </Cylinder>

                        <Sphere args={[0.09, 16, 16]} position={[0, -0.35, 0]}>
                            <meshStandardMaterial color="#8B4513"/>
                        </Sphere>

                        <group position={[0, -0.4, 0.05]}>
                            <Sphere args={[0.1, 16, 16]}>
                                <meshStandardMaterial color="#5C3317"/>
                            </Sphere>
                        </group>

                        {/* Ajout des sabots */}
                        <group position={[0, -0.4, 0]}>
                            <Cylinder args={[0.1, 0.1, 0.2]}>
                                <meshStandardMaterial color="#3B2F2F"/>
                            </Cylinder>
                        </group>
                    </group>
                ))}
            </group>
        </group>
    );
}