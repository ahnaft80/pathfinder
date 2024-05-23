/*
dfs(grid, startNode, endNode): Executes Depth-First Search on a grid, returning visited nodes in order as an array for path visualization.
getUnvisitedNeighbors(node, grid): Fetches unvisited adjacent nodes of a given node, ensuring exploration within grid boundaries without backtracking.
*/

function dfs(grid, startNode, endNode) {
    const visitedNodesInOrder = [];
    dfsVisit(startNode, endNode, visitedNodesInOrder, grid);
    return visitedNodesInOrder;
}

function dfsVisit(node, endNode, visitedNodesInOrder, grid) {
    if (!node || node.isVisited || node.isWall) {
        return false;
    }

    node.isVisited = true;
    visitedNodesInOrder.push(node);

    if (node === endNode) {
        return true;
    }

    const neighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of neighbors) {
        if (dfsVisit(neighbor, endNode, visitedNodesInOrder, grid)) {
            neighbor.previousNode = node; // Correctly set previousNode for path reconstruction
            return true;
        }
    }

    return false;
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;

    if (row > 0) neighbors.push(grid[row - 1][col]); // Up
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // Down
    if (col > 0) neighbors.push(grid[row][col - 1]); // Left
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // Right

    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getNodesInShortestPathOrder(endNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = endNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}

export { dfs, getNodesInShortestPathOrder };
