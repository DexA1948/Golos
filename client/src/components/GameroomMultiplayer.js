import React, { useEffect, useState } from "react";
import { handleMouseUp } from "../golos_library/HandleMouseUpMultiplayer";
import { Link, useNavigate } from "react-router-dom";
import './Gameroom.css';

export function GameroomMultiplayer({ myLobby, setMyLobby, lobbyId, setErrorCode, setError, socket, playerId, playerColor, playerName, setPlayerName, lines, setLines, squares, setSquares }) {

    const navigate = useNavigate();
    //######################GAME CONSTANTS###########################
    const [row, setRow] = useState(parseInt(myLobby.rows));
    const [col, setCol] = useState(parseInt(myLobby.cols));
    const [startIndex, setStartIndex] = useState(null);
    const [circles, setCircles] = useState([]);

    useEffect(() => {

        if (!lobbyId) {
            navigate("/");
        }

        socket.emit("startGame", lobbyId);

        let tempCircles = [];
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                tempCircles.push({ cx: j * 50 + 25, cy: i * 50 + 25 });
            }
        }
        setCircles(tempCircles);
        console.log(tempCircles);

        if(!playerName){
            setPlayerName(myLobby.players.find(obj => obj.playerId === playerId).playerName);
        }
    }, [row, col]);

    useEffect(() => {
        if(lines.length === ((row* (col-1)) + (col * (row-1)))){
            navigate("/end");
        }
    }, [lines]);
    //######################END OF GAME CONSTANTS###########################

    return (
        <div className="main-content-gameroom">
            <div className="gamestats">
                {myLobby &&
                    <div className="players-list">
                        <h3>Players:</h3>
                        <ol type='a' className="players-list">
                            {myLobby.players.map((player) => {
                                if (playerId === player.playerId) {
                                    return (
                                        <li key={player.playerId} style={{ color: player.playerColor }}><div className="this-player" style={{ backgroundColor: "#CBDCCB" }}>{player.playerName}:{player.playerScore}</div></li>
                                    )
                                }
                                return (
                                    <li key={player.playerId} style={{ color: player.playerColor }}>{player.playerName}:{player.playerScore}</li>
                                )
                            })}
                        </ol>
                        <p>Player Turn: {myLobby.players.find(obj => obj.playerId === myLobby.playerTurn[0]).playerName}</p>
                    </div>
                }

                <div className="invite-link">
                    <Link to="/end" className="end">End!</Link>
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
                            onMouseUp={(e) => handleMouseUp(index, row, col, lines, setLines, startIndex, setStartIndex, squares, setSquares, myLobby, setMyLobby, lobbyId, socket, playerId, playerColor, playerName)}
                            key={index}
                        />
                    ))}
                    {lines.map((line, index) => (
                        <line
                            x1={circles[line.start].cx}
                            y1={circles[line.start].cy}
                            x2={circles[line.end].cx}
                            y2={circles[line.end].cy}
                            stroke={line.color}
                            key={index}
                        />
                    ))}
                    {squares.map((square, index) => (
                        <text
                            key={index}
                            x={circles[square.start].cx + 25}
                            y={circles[square.start].cy + 25}
                            fontSize="20"
                            fill={square.color}
                            textAnchor="middle"
                            dominantBaseline="central"
                        >
                            {square.playerInitials}
                        </text>

                    ))}
                </svg>
            </div>
        </div>
    );
}