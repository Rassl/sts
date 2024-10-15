export const nodes = [
  {
    id: "knowledge-graph",
    title: "Knowledge Graphs",
    subtitle: "Workflows create the graph. Unleash the power of graphRAG.",
    position: [0, 0, 0],
  },
  {
    id: "agent-assisted",
    title: "Agents",
    subtitle: "Breaking complex tasks into simple steps",
    position: [10, -5, 10],
  },
  { id: "corporate-graph", title: "Corporate Graphs", subtitle: "Companies need a Digital Twin", position: [5, 5, 5] },
  {
    id: "human-curation",
    title: "Human Curation",
    subtitle: "Humans can always stay in the loop with Stak workflows.",
    position: [10, 8, 10],
  },
  {
    id: "multiple-people",
    title: "Multiple People",
    subtitle: "Multi-player sensemaking is the way.",
    position: [5, -15, 5],
  },
  {
    id: "people-comp",
    title: "Bounties",
    subtitle: "Thousands of humans available 24/7",
    position: [-5, -5, 5],
  },
  { id: "personal-graph", title: "Personal Graphs", subtitle: "Your personal graph", position: [-10, -8, -5] },
  { id: "public-graph", title: "Public Graphs", subtitle: "Open Source Knowledge", position: [-5, 5, -5] },
  {
    id: "self-generated",
    title: "Self generating Agents",
    subtitle: "State your goal and let the workflow find a way",
    position: [5, 5, -5],
  },
];
// Links between nodes using their ids
export const links2 = [
  { source: "agent-assisted", target: "corporate-graph" },
  { source: "corporate-graph", target: "human-curation" },
  { source: "agent-assisted", target: "knowledge-graph" },
  { source: "agent-assisted", target: "multiple-people" },
  { source: "agent-assisted", target: "people-comp" },
  { source: "agent-assisted", target: "personal-graph" },
  { source: "agent-assisted", target: "self-generated" },
  { source: "public-graph", target: "self-generated" },
  { source: "public-graph", target: "personal-graph" },
  { source: "self-generated", target: "people-comp" },
  { source: "multiple-people", target: "people-comp" },
  { source: "multiple-people", target: "knowledge-graph" },
];

export const links = [
  { source: "knowledge-graph", target: "agent-assisted" },
  { source: "knowledge-graph", target: "self-generated" },
  { source: "knowledge-graph", target: "multiple-people" },
  { source: "knowledge-graph", target: "human-curation" },
  { source: "knowledge-graph", target: "people-comp" },
  { source: "knowledge-graph", target: "public-graph" },
  { source: "knowledge-graph", target: "personal-graph" },
  { source: "knowledge-graph", target: "corporate-graph" },
  { source: "self-generated", target: "agent-assisted" },
  { source: "multiple-people", target: "human-curation" },
  { source: "human-curation", target: "people-comp" },
  { source: "human-curation", target: "public-graph" },
  { source: "people-comp", target: "public-graph" },
  { source: "corporate-graph", target: "public-graph" },
  { source: "corporate-graph", target: "personal-graph" },
  { source: "personal-graph", target: "public-graph" },
];
