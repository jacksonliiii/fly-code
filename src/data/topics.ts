import type { Topic } from '../types';

export const TOPICS: Topic[] = [
  // Patterns
  { id: 'two-pointers', title: 'Two Pointers & Sliding Window', category: 'Patterns', icon: '🎯', description: 'Contiguous subarrays, substrings, and converging pointers.' },
  { id: 'fast-slow', title: 'Fast & Slow Pointers', category: 'Patterns', icon: '🐢', description: 'Cycle detection and middle-finding on linked structures.' },
  { id: 'binary-search', title: 'Binary Search Variants', category: 'Patterns', icon: '🔍', description: 'Searching on sorted data and on answer spaces.' },
  { id: 'backtracking', title: 'Backtracking', category: 'Patterns', icon: '🌲', description: 'Permutations, combinations, and constraint pruning.' },
  { id: 'monotonic-stack', title: 'Monotonic Stack & Queue', category: 'Patterns', icon: '📚', description: 'Next-greater-element style problems.' },
  { id: 'heaps-topk', title: 'Heaps & Top-K', category: 'Patterns', icon: '⛰️', description: 'Priority queues, k-way merges, running medians.' },

  // Data Structures
  { id: 'hashing', title: 'Hashing Deep Dive', category: 'Data Structures', icon: '🔑', description: 'Collision handling, amortized cost, design questions.' },
  { id: 'trees-bst', title: 'Trees & BSTs', category: 'Data Structures', icon: '🌳', description: 'Traversals, balancing, LCA, serialization.' },
  { id: 'tries', title: 'Tries', category: 'Data Structures', icon: '🔤', description: 'Prefix trees for autocomplete and word search.' },
  { id: 'union-find', title: 'Union-Find (Disjoint Set)', category: 'Data Structures', icon: '🔗', description: 'Connectivity, cycle detection, Kruskal’s MST.' },

  // Graphs
  { id: 'graph-traversal', title: 'Graph Traversal & Topo Sort', category: 'Graphs', icon: '🕸️', description: 'BFS, DFS, cycle detection, dependency ordering.' },
  { id: 'shortest-paths', title: 'Shortest Paths', category: 'Graphs', icon: '🛣️', description: 'Dijkstra, Bellman-Ford, and when to use each.' },

  // Dynamic Programming
  { id: 'dp-foundations', title: 'DP Foundations', category: 'Dynamic Programming', icon: '🧩', description: '1D DP, memoization vs. tabulation, state design.' },
  { id: 'dp-advanced', title: 'DP on Grids, Intervals & Trees', category: 'Dynamic Programming', icon: '🧮', description: '2D DP, interval DP, and knapsack variants.' },

  // Complexity Analysis
  { id: 'big-o', title: 'Big-O & Amortized Analysis', category: 'Complexity Analysis', icon: '⏱️', description: 'Reasoning about runtime and space tradeoffs.' },

  // System Design
  { id: 'scalability', title: 'Scalability Fundamentals', category: 'System Design', icon: '📈', description: 'Horizontal vs vertical scaling, load balancing.' },
  { id: 'caching', title: 'Caching & CDNs', category: 'System Design', icon: '⚡', description: 'Cache eviction, invalidation, and edge delivery.' },
  { id: 'databases', title: 'Databases & Indexing', category: 'System Design', icon: '🗄️', description: 'Indexing, sharding, replication, SQL vs NoSQL.' },
  { id: 'distributed-systems', title: 'Distributed Systems', category: 'System Design', icon: '🌐', description: 'CAP theorem, consensus, consistent hashing.' },
  { id: 'api-design', title: 'API Design & Rate Limiting', category: 'System Design', icon: '🚦', description: 'REST tradeoffs, idempotency, throttling algorithms.' },

  // Behavioral
  { id: 'star-method', title: 'STAR Method & Leadership Principles', category: 'Behavioral', icon: '⭐', description: 'Structuring answers the way Amazon/Microsoft expect.' },
  { id: 'behavioral-scenarios', title: 'Common Behavioral Scenarios', category: 'Behavioral', icon: '💬', description: 'Conflict, failure, ambiguity, and ownership stories.' },
];

export const CATEGORY_ORDER = [
  'Patterns',
  'Data Structures',
  'Graphs',
  'Dynamic Programming',
  'System Design',
  'Complexity Analysis',
  'Behavioral',
] as const;
