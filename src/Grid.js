import React from 'react';
import './Grid.css';

const Grid = ({ grid, onNodeClick, onMouseDown, onMouseEnter, onMouseUp }) => {
    return (
        <div className="grid">
            {grid.map((row, rowIndex) => {
                return (
                    <div key={rowIndex} className="row">
                        {row.map((node, nodeIndex) => {
                            const { row, col, isStart, isEnd, isWall } = node;
                            let extraClassName = '';
                            if (isStart) {
                                extraClassName = 'node-start';
                            } else if (isEnd) {
                                extraClassName = 'node-end';
                            } else if (isWall) {
                                extraClassName = 'node-wall';
                            }

                            return (
                                <div 
                                    key={nodeIndex} 
                                    id={`node-${row}-${col}`} 
                                    className={`node ${extraClassName}`}
                                    onClick={() => onNodeClick(row, col)}
                                    onMouseDown={() => onMouseDown(row, col)}
                                    onMouseEnter={() => onMouseEnter(row, col)}
                                    onMouseUp={() => onMouseUp()} // onMouseUp does not need row and col
                                ></div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default Grid;
