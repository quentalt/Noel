import { MutableRefObject } from 'react';
import * as THREE from 'three';

export function useReindeerAnimation(
    bodyRef: MutableRefObject<THREE.Group | null>,
    headRef: MutableRefObject<THREE.Group | null>,
    legsRef: MutableRefObject<THREE.Group[]>
) {
    const updateAnimations = (time: number) => {
        if (!bodyRef.current || !headRef.current) return;

        // Animation du corps
        bodyRef.current.rotation.z = Math.cos(time * 2) * 0.03;

        // Animation de la tête
        headRef.current.rotation.x = Math.sin(time * 2) * 0.05;

        // Animation des jambes
        legsRef.current.forEach((leg, index) => {
            if (leg) {
                const offset = index * (Math.PI / 2);
                const diagonalOffset = index % 2 === 0 ? 0 : Math.PI;
                leg.rotation.x = Math.sin(time * 3 + offset + diagonalOffset) * 0.2;
            }
        });
    };

    return { updateAnimations };
}