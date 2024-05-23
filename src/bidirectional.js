function bidirectionalSearch(grid, startNode, endNode) {
    const queueA = [startNode];
    const queueB = [endNode];
    const visitedA = new Set([startNode]);
    const visitedB = new Set([endNode]);

    const visitedNodesA = [startNode];
    const visitedNodesB = [endNode];

    startNode.distance = 0;
    endNode.distance = 0;

    while (queueA.length > 0 && queueB.length > 0) {
        if (searchHelper(queueA, visitedA, visitedB, grid, 'forward', visitedNodesA)) {
            const meetNode = queueA.find(node => visitedB.has(node));
            return { visitedNodesA, visitedNodesB, meetNode };
        }
        if (searchHelper(queueB, visitedB, visitedA, grid, 'backward', visitedNodesB)) {
            const meetNode = queueB.find(node => visitedA.has(node));
            return { visitedNodesA, visitedNodesB, meetNode };
        }
    }

    return { visitedNodesA: [], visitedNodesB: [], meetNode: null };
}

function searchHelper(queue, visitedFromThisSide, visitedFromOtherSide, grid, direction, visitedNodesInOrder) {
    if (queue.length > 0) {
        const current = queue.shift();

        if (visitedFromOtherSide.has(current)) {
            return true;
        }

        const neighbors = getUnvisitedNeighbors(current, grid);
        for (const neighbor of neighbors) {
            if (!visitedFromThisSide.has(neighbor)) {
                if (direction === 'forward') {
                    neighbor.previousNode = current;
                } else {
                    neighbor.nextNode = current;
                }
                visitedFromThisSide.add(neighbor);
                visitedNodesInOrder.push(neighbor);
                queue.push(neighbor);
            }
        }
    }
    return false;
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0 && !grid[row - 1][col].isWall) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1 && !grid[row + 1][col].isWall) neighbors.push(grid[row + 1][col]);
    if (col > 0 && !grid[row][col - 1].isWall) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1 && !grid[row][col + 1].isWall) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getNodesInShortestPathOrder(meetNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = meetNode;

    // Traverse backward from the meeting node to the start node
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }

    // Traverse forward from the meeting node to the end node
    currentNode = meetNode.nextNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.push(currentNode);
        currentNode = currentNode.nextNode;
    }

    return nodesInShortestPathOrder;
}

export { bidirectionalSearch, getNodesInShortestPathOrder };
