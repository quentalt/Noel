import * as THREE from 'three';

export function shouldCreateHoofprint(
    currentPosition: THREE.Vector3,
    lastPosition: THREE.Vector3,
    minDistance: number = 0.2 // Distance réduite pour plus d'empreintes
): boolean {
    return currentPosition.distanceTo(lastPosition) >= minDistance;
}

export function calculateHoofprintPositions(
    position: THREE.Vector3,
    rotation: number,
    stride: number = 0.2
): Array<{ position: THREE.Vector3; rotation: number }> {
    const footprints: { position: THREE.Vector3; rotation: number; }[] = [];
    const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), rotation);
    const right = new THREE.Vector3(1, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), rotation);

    // Positions des sabots avec décalage plus naturel
    const hoofPositions = [
        { offset: right.clone().multiplyScalar(-stride).add(forward.clone().multiplyScalar(stride)), rotOffset: -0.2 },
        { offset: right.clone().multiplyScalar(stride).add(forward.clone().multiplyScalar(stride)), rotOffset: 0.2 },
        { offset: right.clone().multiplyScalar(-stride).add(forward.clone().multiplyScalar(-stride)), rotOffset: 0.2 },
        { offset: right.clone().multiplyScalar(stride).add(forward.clone().multiplyScalar(-stride)), rotOffset: -0.2 }
    ];

    hoofPositions.forEach(({ offset, rotOffset }) => {
        const hoofPosition = position.clone().add(offset);
        footprints.push({
            position: hoofPosition,
            rotation: rotation + rotOffset + (Math.random() * 0.2 - 0.1) // Plus de variation aléatoire
        });
    });

    return footprints;
}