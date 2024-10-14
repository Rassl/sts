export const nodes = [
  {
    id: "knowledge-graph",
    title: "Knowledge Graphs",
    subtitle: "Workflows create the graph. Unleash the power of graphRAG.",
    position: [0, 0, 0],
  },
  { id: "agent-assisted", title: "Agents", subtitle: "Breaking complex tasks into simple steps", position: [5, -5, 5] },
  { id: "corporate-graph", title: "Corporate Graphs", subtitle: "Companies need a Digital Twin", position: [5, 5, 5] },
  {
    id: "human-curation",
    title: "Human Curation",
    subtitle: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accu santium dolor emque.",
    position: [10, 8, 10],
  },
  {
    id: "multiple-people",
    title: "Multiple People",
    subtitle: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accu santium dolor emque.",
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
export const links = [
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
