// Function to perform BFS
function bfs(grid, startNode, endNode) {
    const visitedNodesInOrder = [];
    const queue = [];
    startNode.isVisited = true;
    queue.push(startNode);

    while (queue.length > 0) {
        const currentNode = queue.shift();
        visitedNodesInOrder.push(currentNode);

        if (currentNode === endNode) {
            return visitedNodesInOrder;
        }

        const neighbors = getUnvisitedNeighbors(currentNode, grid);
        for (const neighbor of neighbors) {
            neighbor.isVisited = true;
            neighbor.previousNode = currentNode;
            queue.push(neighbor);
        }
    }

    return visitedNodesInOrder; // No shortest path found
}

// Function to get unvisited neighbors
function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall);
}

// Function to get the shortest path from the endNode to the startNode
function getNodesInShortestPathOrder(endNode) {
    const shortestPath = [];
    let currentNode = endNode;
    while (currentNode !== null) {
        shortestPath.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return shortestPath;
}

export { bfs, getNodesInShortestPathOrder};
