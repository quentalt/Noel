import * as THREE from 'three';

export interface MovementPattern {
    position: THREE.Vector3;
    duration: number;
    type: 'walk' | 'graze' | 'look';
}

export function generateMovementPattern(
    currentPosition: THREE.Vector3,
    bounds: { min: number; max: number } = { min: -10, max: 10 }
): MovementPattern {
    const types: ('walk' | 'graze' | 'look')[] = ['walk', 'graze', 'look'];
    const type = types[Math.floor(Math.random() * types.length)];

    // Générer une nouvelle position dans les limites
    const x = THREE.MathUtils.clamp(
        currentPosition.x + (Math.random() - 0.5) * 8,
        bounds.min,
        bounds.max
    );
    const z = THREE.MathUtils.clamp(
        currentPosition.z + (Math.random() - 0.5) * 8,
        bounds.min,
        bounds.max
    );

    // Durée basée sur le type de mouvement
    const duration = type === 'walk' ? 5000 + Math.random() * 3000 :
        type === 'graze' ? 3000 + Math.random() * 2000 :
            2000 + Math.random() * 1000;

    return {
        position: new THREE.Vector3(x, currentPosition.y, z),
        duration,
        type
    };
}