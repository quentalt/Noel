import { useEffect } from 'react';
import * as THREE from 'three';

export function useKeyboardControls(elfRef: React.RefObject<THREE.Group>) {
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
                    // Espace pour déposer le cadeau
                    const event = new CustomEvent('dropPresent');
                    window.dispatchEvent(event);
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [elfRef]);
}