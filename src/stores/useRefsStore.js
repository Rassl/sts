import { create } from 'zustand';

export const useRefsStore = create((set) => ({
    orbitControlsRef: null,
    setOrbitControlsRef: (ref) => set({ orbitControlsRef: ref }),
}));

