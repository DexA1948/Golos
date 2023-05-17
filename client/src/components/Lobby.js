import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Lobby.css';

export function Lobby({ inviteLink, myLobby, lobbyId, setLobbyId, socket, rows, cols, playerName, setPlayerName }) {

    // Define arrays of first and last names
    const firstNames = ['Hero', 'Handsome', 'Kanxo', 'Mailo', 'Dangerous', 'Rider', 'Seucy', 'Moh', 'Kto', 'Kooool'];

    // Generate random name
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomName = randomFirstName + ' ' + randomLastName;

    const handleCopy = (event) => {
        navigator.clipboard.writeText(inviteLink);
        event.target.innerText = 'Copied!';
        setTimeout(() => {
            event.target.innerText = 'Invite';
        }, 1000);
    };

    useEffect(() => {
        if (!lobbyId) {
            socket.emit("createLobby", rows, cols);
        }
        console.log("Lobby rendered");
        console.log(myLobby);
    }, []);

    socket.on("lobbyCreated", (id) => {
        setLobbyId(id);
    });

    useEffect(() => {
        if (lobbyId) {
            socket.emit("joinLobby", lobbyId, playerName ? playerName : randomName);
        }
    }, [lobbyId]);

    return (
        <div className="main-content-lobby">
            <h3>Players:</h3>
            <ol type='a' className="players-list">
                {myLobby && myLobby.players.map((player) => {
                    return (
                        <li key={player.playerId} style={{ color: player.playerColor }}>{player.playerName}:{player.playerScore}</li>
                    )
                })}
            </ol>
            <div className="invite-link">
                <span>{inviteLink}</span>
                <button onClick={handleCopy} className="invite">Invite</button>
            </div>
            <div className="input-container">
                {myLobby && myLobby.availableColors.length<3 && <Link to="/gameroom/multiplayer" className='enter-gameroom'>Play!</Link>}
            </div>
        </div>
    );
}