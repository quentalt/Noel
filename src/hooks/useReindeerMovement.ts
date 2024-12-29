import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { generateMovementPattern, MovementPattern } from '../utils/movementPatterns';

export function useReindeerMovement(reindeerRef: React.RefObject<THREE.Group>) {
    const movementState = useRef({
        currentPattern: null as MovementPattern | null,
        startTime: 0,
        startPosition: new THREE.Vector3(),
        speed: 0.02,
        isMoving: false
    });

    useEffect(() => {
        if (reindeerRef.current) {
            movementState.current.currentPattern = generateMovementPattern(reindeerRef.current.position);
            movementState.current.startTime = performance.now();
            movementState.current.startPosition.copy(reindeerRef.current.position);
        }
    }, []);

    const updateMovement = () => {
        if (!reindeerRef.current) return;

        const currentTime = performance.now();
        const { currentPattern, startTime } = movementState.current;

        if (currentPattern) {
            const progress = Math.min((currentTime - startTime) / currentPattern.duration, 1);

            if (progress < 1) {
                const currentPos = reindeerRef.current.position;
                const targetPos = currentPattern.position;

                if (currentPattern.type === 'walk') {
                    currentPos.lerp(targetPos, movementState.current.speed);
                    movementState.current.isMoving = true;

                    const direction = targetPos.clone().sub(currentPos);
                    if (direction.length() > 0.01) {
                        const targetRotation = Math.atan2(direction.x, direction.z);
                        reindeerRef.current.rotation.y = THREE.MathUtils.lerp(
                            reindeerRef.current.rotation.y,
                            targetRotation,
                            0.1
                        );
                    }
                } else {
                    movementState.current.isMoving = false;
                }
            } else {
                movementState.current.currentPattern = generateMovementPattern(reindeerRef.current.position);
                movementState.current.startTime = currentTime;
                movementState.current.startPosition.copy(reindeerRef.current.position);
            }
        }
    };

    return { updateMovement };
}