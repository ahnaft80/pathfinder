import React, { useState, useEffect } from 'react';
import './App.css';
import Grid from './Grid';
import { dijkstra, getNodesInShortestPathOrder as getPathDijkstra } from './dijkstra';
import { bfs, getNodesInShortestPathOrder as getPathBfs } from './bfs';
import { dfs, getNodesInShortestPathOrder as getPathDfs } from './dfs';
import { astar, getNodesInShortestPathOrder as getPathAstar } from './astar';
import { bidirectionalSearch, getNodesInShortestPathOrder as getPathBidirectional } from './bidirectional';

function App() {
    const [grid, setGrid] = useState([]);
    const [startNodePos, setStartNodePos] = useState({ row: 10, col: 15 });
    const [endNodePos, setEndNodePos] = useState({ row: 10, col: 35 });
    const [isStartNodeSet, setIsStartNodeSet] = useState(true);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('dijkstra');
    const [isWallModeEnabled, setIsWallModeEnabled] = useState(false);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);

    useEffect(() => {
        initializeGrid();
    }, [startNodePos, endNodePos]);

    const initializeGrid = () => {
        const initialGrid = [];
        for (let row = 0; row < 20; row++) {
            const currentRow = [];
            for (let col = 0; col < 50; col++) {
                currentRow.push(createNode(col, row));
            }
            initialGrid.push(currentRow);
        }
        setGrid(initialGrid);
    };

    const createNode = (col, row) => {
        return {
            col,
            row,
            isStart: row === startNodePos.row && col === startNodePos.col,
            isEnd: row === endNodePos.row && col === endNodePos.col,
            isWall: false,
            distance: Infinity,
            isVisited: false,
            previousNode: null,
            nextNode: null,
        };
    };

    const handleAlgorithmChange = (event) => {
        setSelectedAlgorithm(event.target.value);
    };

    const toggleWallMode = () => {
        setIsWallModeEnabled(!isWallModeEnabled);
    };

    const clearTraversedPath = () => {
        const updatedGrid = grid.map(row => {
            return row.map(node => {
                if (!node.isStart && !node.isEnd && !node.isWall) {
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
                }
                return {
                    ...node,
                    isVisited: false,
                    distance: Infinity,
                    previousNode: null,
                };
            });
        });
        setGrid(updatedGrid);
    };

    const visualizeShortestPath = (nodesInShortestPathOrder) => {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                const element = document.getElementById(`node-${node.row}-${node.col}`);
                if (!node.isStart && !node.isEnd) {
                    element.className = 'node node-shortest-path';
                } else {
                    element.className = `node ${node.isStart ? 'node-start' : 'node-end'}`;
                }
            }, 50 * i);
        }
    };

    const handleNodeClick = (row, col) => {
        let newGrid = grid.map(row => row.map(node => ({ ...node })));

        if (!isWallModeEnabled) {
            if (isStartNodeSet) {
                if (startNodePos) {
                    newGrid[startNodePos.row][startNodePos.col].isStart = false;
                }
                newGrid[row][col].isStart = true;
                setStartNodePos({ row, col });
            } else {
                if (endNodePos) {
                    newGrid[endNodePos.row][endNodePos.col].isEnd = false;
                }
                newGrid[row][col].isEnd = true;
                setEndNodePos({ row, col });
            }
            setIsStartNodeSet(!isStartNodeSet);
        } else {
            const node = newGrid[row][col];
            if (!node.isStart && !node.isEnd) {
                node.isWall = !node.isWall;
                const nodeElement = document.getElementById(`node-${node.row}-${node.col}`);
                if (node.isWall) {
                    nodeElement.classList.add('node-wall');
                } else {
                    nodeElement.classList.remove('node-wall');
                }
            }
        }

        setGrid(newGrid);
    };

    const handleMouseDown = (row, col) => {
        if (isWallModeEnabled) {
            setMouseIsPressed(true);
            toggleWall(row, col);
        }
    };

    const handleMouseEnter = (row, col) => {
        if (isWallModeEnabled && mouseIsPressed) {
            toggleWall(row, col);
        }
    };

    const handleMouseUp = () => {
        setMouseIsPressed(false);
    };

    const toggleWall = (row, col) => {
        let newGrid = grid.map(rowNodes => rowNodes.map(node => ({ ...node })));
        const node = newGrid[row][col];
        if (!node.isStart && !node.isEnd) {
            node.isWall = !node.isWall;
            const nodeElement = document.getElementById(`node-${node.row}-${node.col}`);
            if (node.isWall) {
                nodeElement.classList.add('node-wall');
            } else {
                nodeElement.classList.remove('node-wall');
            }
        }
        setGrid(newGrid);
    };

    const visualizeAlgorithm = () => {  
        clearTraversedPath();

        const startNode = grid[startNodePos.row][startNodePos.col];
        const endNode = grid[endNodePos.row][endNodePos.col];
        let visitedNodesInOrder = [];
        let nodesInShortestPathOrder = [];

        switch (selectedAlgorithm) {
            case 'dijkstra':
                visitedNodesInOrder = dijkstra(grid, startNode, endNode);
                nodesInShortestPathOrder = getPathDijkstra(endNode);
                break;
            case 'astar':
                visitedNodesInOrder = astar(grid, startNode, endNode);
                nodesInShortestPathOrder = getPathAstar(endNode);
                break;
            case 'bfs':
                visitedNodesInOrder = bfs(grid, startNode, endNode);
                nodesInShortestPathOrder = getPathBfs(endNode);
                break;
            case 'dfs':
                visitedNodesInOrder = dfs(grid, startNode, endNode);
                nodesInShortestPathOrder = getPathDfs(endNode);
                break;
            case 'bidirectional':
                const result = bidirectionalSearch(grid, startNode, endNode);
                visitedNodesInOrder = interleaveVisitedNodes(result.visitedNodesA, result.visitedNodesB);
                nodesInShortestPathOrder = getPathBidirectional(result.meetNode);
                break;
            default:
                break;
        }

        visualizeNodes(visitedNodesInOrder, nodesInShortestPathOrder);
    };

    const visualizeNodes = (visitedNodesInOrder, nodesInShortestPathOrder) => {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    visualizeShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                const element = document.getElementById(`node-${node.row}-${node.col}`);
                if (!node.isWall) {
                    if (!node.isStart && !node.isEnd) {
                        element.className = 'node node-visited';
                    } else {
                        element.className = `node ${node.isStart ? 'node-start' : 'node-end'}`;
                    }
                }
            }, 10 * i);        
        }
    };

    const resetGrid = () => {
        const initialGrid = [];
        for (let row = 0; row < 20; row++) {
            const currentRow = [];
            for (let col = 0; col < 50; col++) {
                currentRow.push(createNode(col, row));
                const nodeClassName = 'node';
                document.getElementById(`node-${row}-${col}`).className = nodeClassName;
            }
            initialGrid.push(currentRow);
        }
        setGrid(initialGrid);
    };

    const interleaveVisitedNodes = (visitedNodesA, visitedNodesB) => {
        const interleaved = [];
        const maxLength = Math.max(visitedNodesA.length, visitedNodesB.length);

        for (let i = 0; i < maxLength; i++) {
            if (i < visitedNodesA.length) {
                interleaved.push(visitedNodesA[i]);
            }
            if (i < visitedNodesB.length) {
                interleaved.push(visitedNodesB[i]);
            }
        }

        return interleaved;
    };

    return (
        <div className="App">
            <Grid 
                grid={grid} 
                onNodeClick={handleNodeClick}
                onMouseDown={(row, col) => handleMouseDown(row, col)}
                onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                onMouseUp={() => handleMouseUp()} />
            <select value={selectedAlgorithm} onChange={handleAlgorithmChange}>
                <option value="dijkstra">Dijkstra's Algorithm</option>
                <option value="astar">A* Search</option>
                <option value="bfs">Breadth-First Search</option>
                <option value="dfs">Depth-First Search</option>
                <option value="bidirectional">Bidirectional Search</option> 
            </select>
            <button onClick={visualizeAlgorithm}>Start Pathfinding</button>
            <button onClick={toggleWallMode}>
                {isWallModeEnabled ? 'Wall Mode Off' : 'Wall Mode On'}
            </button> 
            <button onClick={resetGrid}>Reset Grid</button>
        </div>
    );
}

export default App;
