import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Gameroom.css';

export function Endroom({myLobby, lobbyId, socket, playerId}) {

    const navigate = useNavigate();

    const winner = myLobby.players.reduce((acc, cur) => {
        return cur.playerScore > acc.playerScore ? cur : acc;
      });
    
    useEffect(() => {

        if (!lobbyId) {
            navigate("/");
        }

        setTimeout(()=>{
            socket.disconnect();
        }, 10000)

    }, []);

    return (
        <div className="main-content-endroom">
            <div className="gamestats">
                {myLobby &&
                    <div className="players-list">
                        <h1>Winner is: {winner.playerName}</h1>
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
                    </div>
                }

                <div className="invite-link">
                    <Link to="/" reloadDocument className="end">Start Again!</Link>
                </div>
            </div>

        </div>
    );
}