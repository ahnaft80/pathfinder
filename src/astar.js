/*
Explanation:
The astar function is the main A* algorithm implementation. It uses a set (openSet) to keep track of nodes to be explored.
Nodes are sorted in the openSet based on their total distance, which is the sum of the actual distance from the start node and the estimated distance to the end node (heuristic).
The heuristic function calculates the Manhattan distance, suitable for a grid where you can only move up, down, left, or right.
The getUnvisitedNeighbors function returns neighboring nodes that haven't been visited yet.
The reconstructPath function builds the path from the end node to the start node by following the previousNode pointers.
*/


function astar(grid, startNode, endNode) {
    const openSet = [];
    startNode.distance = 0;
    startNode.totalDistance = heuristic(startNode, endNode);
    openSet.push(startNode);

    const visitedNodesInOrder = [];

    while (!!openSet.length) {
        // Sort nodes by total distance (distance + heuristic)
        openSet.sort((a, b) => a.totalDistance - b.totalDistance);
        const currentNode = openSet.shift();

        // When we reach the end node, we're done
        if (currentNode === endNode) {
            return visitedNodesInOrder;
        }

        currentNode.isVisited = true;
        visitedNodesInOrder.push(currentNode);

        const neighbors = getUnvisitedNeighbors(currentNode, grid);
        for (const neighbor of neighbors) {
            let tempDistance = currentNode.distance + 1; // Assuming a distance of 1 for grid neighbors

            // If new path to neighbor is shorter
            if (tempDistance < neighbor.distance) {
                neighbor.distance = tempDistance;
                neighbor.totalDistance = neighbor.distance + heuristic(neighbor, endNode);
                neighbor.previousNode = currentNode;

                if (!openSet.includes(neighbor)) {
                    openSet.push(neighbor);
                }
            }
        }
    }

    // If path not found
    return visitedNodesInOrder;
}

function heuristic(nodeA, nodeB) {
    const dRow = Math.abs(nodeA.row - nodeB.row);
    const dCol = Math.abs(nodeA.col - nodeB.col);
    return dRow + dCol; // Manhattan distance
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;

    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

    return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall);
}

function reconstructPath(endNode) {
    const path = [];
    let currentNode = endNode;
    while (currentNode !== null) {
        path.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return path;
}

function getNodesInShortestPathOrder(endNode) {
    return reconstructPath(endNode);
}

export { astar, getNodesInShortestPathOrder };

