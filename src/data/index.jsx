export const nodes = [
  { id: 10, position: [0, 0, 0] },
  { id: 0, position: [5, 5, 5] },
  { id: 1, position: [10, 8, 10] },
  { id: 2, position: [5, -5, 5] },
  { id: 3, position: [5, -15, 5] },
  { id: 4, position: [-5, -5, 5] },
  { id: 5, position: [-10, -8, -5] },
  { id: 6, position: [-5, 5, -5] },
  { id: 7, position: [5, 5, -5] },
];

// Links between nodes using their ids
export const links = [
  { source: 10, target: 0 },
  { source: 0, target: 1 },
  { source: 10, target: 2 },
  { source: 10, target: 3 },
  { source: 10, target: 4 },
  { source: 10, target: 5 },
  { source: 10, target: 7 },
  { source: 6, target: 7 },
  { source: 6, target: 5 },
  { source: 7, target: 4 },
  { source: 3, target: 4 },
  { source: 3, target: 2 },
];
