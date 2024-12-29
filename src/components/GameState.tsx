// src/components/GameState.tsx
import { create } from 'zustand';
import * as THREE from 'three';

interface GameState {
    activeElf: { position: THREE.Vector3 };
    presents: { position: THREE.Vector3 }[];
    santaPosition: { position: THREE.Vector3 };
    selectedPresentId: number | null;
    presentsInSleigh: number[];
    setActiveElf: (elf: THREE.Group | null) => void;
    setSelectedPresent: (id: number | null) => void;
    addPresentToSleigh: (id: number) => void;
    dropPresentAtElf: () => void;
    pickUpPresent: (id: number) => void;

}

export const useGameState = create<GameState>((set) => ({
    activeElf: { position: new THREE.Vector3(0, 0, 0) },
    pickUpPresent: (id) => set((state) => {
        if (state.selectedPresentId === null) {
            return { selectedPresentId: id };
        }
        return state;
    }),
    presents: [{ position: new THREE.Vector3(1, 1, 1) }],
    santaPosition: { position: new THREE.Vector3(2, 2, 2) },
    selectedPresentId: null,
    presentsInSleigh: [],
    isNearSleigh: false,
    setActiveElf: (elf) => set({ activeElf: { position: elf?.position || new THREE.Vector3(0, 0, 0) } }),
    setSelectedPresent: (id) => set({ selectedPresentId: id }),
    addPresentToSleigh: (id) => set((state) => {
        if (!state.presentsInSleigh.includes(id)) {
            return {
                presentsInSleigh: [...state.presentsInSleigh, id],
                selectedPresentId: null
            };
        }
        return state;
    }),
    dropPresentAtElf: () => set((state) => {
        if (state.selectedPresentId !== null) {
            return { selectedPresentId: null };
        }
        return state;
    })
}));