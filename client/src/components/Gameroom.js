import React, { useEffect, useState } from "react";
import { minimax } from "../golos_library/Minimax";
import { handleMouseUp } from "../golos_library/HandleMouseUp";
import { Link } from "react-router-dom";
import './Gameroom.css';

export function Gameroom({ rows, cols, playerName, gameLevel }) {

    //######################GAME CONSTANTS###########################
    const [row, setRow] = useState(parseInt(rows));
    const [col, setCol] = useState(parseInt(cols));
    const [allLines, setAllLines] = useState([]);
    const [circles, setCircles] = useState([]);
    const [lines, setLines] = useState([]);
    const [startIndex, setStartIndex] = useState(null);
    const [player, setPlayer] = useState(1);
    const [scores, setScores] = useState({ 1: 0, 2: 0 });
    const [squares, setSquares] = useState([]);
    const [againstComputer, setAgainstComputer] = useState(true);

    useEffect(() => {
        //so that we only calculate this once, do this

        console.log(gameLevel);
        console.log(row);
        console.log(col);
        let tempLines = [];

        for (let i = 0; i < row * col - 1; i++) {

            let startRow = Math.floor(i / col);
            let startCol = i % col;
            let endRow = Math.floor((i + 1) / col);
            let endCol = (i + 1) % col;

            if (startRow < row && startCol < col && endRow < row && endCol < col && ((startRow === endRow && Math.abs(startCol - endCol) <= 1) || (startCol === endCol && Math.abs(startRow - endRow) <= 1))) {
                tempLines = [...tempLines, { start: i, end: i + 1 }]
            }

            endRow = Math.floor((i + col) / col);
            endCol = (i + col) % col;

            if (startRow < row && startCol < col && endRow < row && endCol < col && ((startRow === endRow && Math.abs(startCol - endCol) <= 1) || (startCol === endCol && Math.abs(startRow - endRow) <= 1))) {
                tempLines = [...tempLines, { start: i, end: i + col }]
            }
        }
        setAllLines(tempLines);
        console.log(tempLines);

        let tempCircles = [];
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                tempCircles.push({ cx: j * 50 + 25, cy: i * 50 + 25});
            }
        }
        setCircles(tempCircles);
        console.log(tempCircles);
    }, [row, col]);
    //######################END OF GAME CONSTANTS###########################


    //#########CALLING MINMAX##########
    useEffect(() => {
        if (player === 1 && againstComputer) {

            let remainingLines = allLines.filter(line => !lines.some(item2 => line.start === item2.start && line.end === item2.end));

            let alpha = { start: null, end: null, score: -999 };
            let beta = { start: null, end: null, score: 999 };
            let searchDepth = 4;

            if (remainingLines.length < 17) {
                searchDepth = 17;
            }

            let { start, end, returnscore } = minimax(remainingLines, lines, scores[2], scores[1], true, col, alpha, beta, searchDepth);
            setStartIndex(start);
            handleMouseUp(end, row, col, lines, setLines, startIndex, setStartIndex, player, setPlayer, scores, setScores, squares, setSquares);
        }

    }, [player, startIndex, allLines]);

    return (
        <div className="main-content-gameroom">
            <div className="gamestats">

                <div className="players-list">
                    <h3>Players:</h3>
                    <ol type='1'>
                        <li>Computer: {scores[1]}</li>
                        <li>{playerName ? playerName : "Human Player"}: {scores[2]}</li>
                        <div>Current Player: {player}</div>
                    </ol>
                </div>

                <div className="invite-link">
                    <Link to="/" className="end">End!</Link>
                </div>
            </div>

            <div className="gameboard">
                <svg width="800" height="400">
                    {circles.map((circle, index) => (
                        <circle
                            cx={circle.cx}
                            cy={circle.cy}
                            r={15}
                            fill="blue"
                            stroke="black"
                            onMouseDown={() => setStartIndex(index)}
                            onMouseUp={(e) => handleMouseUp(index, row, col, lines, setLines, startIndex, setStartIndex, player, setPlayer, scores, setScores, squares, setSquares)}
                            key={index}
                        />
                    ))}
                    {lines.map((line, index) => (
                        <line
                            x1={circles[line.start].cx}
                            y1={circles[line.start].cy}
                            x2={circles[line.end].cx}
                            y2={circles[line.end].cy}
                            stroke="black"
                            key={index}
                        />
                    ))}
                    {squares.map((square, index) => (
                        <text
                            key={index}
                            x={circles[square.start].cx + 25}
                            y={circles[square.start].cy + 25}
                            fontSize="20"
                            fill="red"
                            textAnchor="middle"
                            dominantBaseline="central"
                        >
                            {square.player}
                        </text>

                    ))}
                </svg>
            </div>
        </div>
    );
}