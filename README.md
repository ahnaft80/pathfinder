# Pathfinding Visualizer

A React application that visualizes various pathfinding algorithms such as Dijkstra's, A*, BFS, DFS, and Bidirectional Search. This project allows users to create walls, set start and end points, and visualize the algorithms in action.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Algorithms](#algorithms)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ahnaft80/pathfinder/
   cd pathfinder
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Usage

1. **Select an Algorithm:**
   Use the dropdown menu to select the pathfinding algorithm you want to visualize.

2. **Toggle Wall Mode:**
   Click the "Wall Mode On" button to enable wall creation. Click on the grid to add or remove walls.

3. **Set Start and End Nodes:**
   Click on the grid to set the start and end nodes.

4. **Start Visualization:**
   Click the "Start Pathfinding" button to visualize the selected algorithm.

5. **Reset Grid:**
   Click the "Reset Grid" button to clear the grid and start over.

## Features

- **Interactive Grid:**
  - Click to set start and end nodes.
  - Toggle wall mode to add or remove walls.
  - Reset the grid to start over.

- **Algorithm Visualization:**
  - Visualize the pathfinding process of various algorithms.

## Algorithms

- **Dijkstra's Algorithm:**
  - Finds the shortest path in weighted and unweighted grids.

- **A* Search:**
  - Uses heuristics to improve performance over Dijkstra's.

- **Breadth-First Search (BFS):**
  - Finds the shortest path in unweighted grids.

- **Depth-First Search (DFS):**
  - Explores as far as possible along each branch before backtracking.

- **Bidirectional Search:**
  - Simultaneously searches from both start and end nodes to find the shortest path.

## Contributing

1. **Fork the repository.**
2. **Create a new branch:**
   ```bash
   git checkout -b feature-branch
   ```
3. **Make your changes and commit them:**
   ```bash
   git commit -m "Add new feature"
   ```
4. **Push to the branch:**
   ```bash
   git push origin feature-branch
   ```
5. **Create a pull request.**

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

You can copy and paste this content into your `README.md` file.
