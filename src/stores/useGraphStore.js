import { create } from 'zustand';

export const useGraphStore = create((set) => ({
    nodePositions: {},
    setNodePosition: (id, position) =>
        set((state) => ({
            nodePositions: {
                ...state.nodePositions,
                [id]: position,
            },
        })),
    setInitialNodePositions: (initialPositions) =>
        set(() => ({
            nodePositions: initialPositions,
        })),
    hoveredNodeId: null, // Track the hovered node
    setHoveredNodeId: (id) => set({ hoveredNodeId: id }),
}));

