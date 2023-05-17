import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './Header.css';

export function Home({
    lobbyId,
    setLobbyId,
    playerName,
    setPlayerName,
    rows,
    setRows,
    cols,
    setCols,
    gameModeMultiplayer,
    setGameModeMultiplayer,
    gameLevel,
    setGameLevel,
    socket
}) {

    const { lobbyCode } = useParams();

    useEffect(() => {
        if (typeof lobbyCode !== "undefined") {
            setLobbyId(lobbyCode);
        }
    }, [])

    return (
        <div className="main-content">
            <div className="input-container">
                {
                    lobbyId &&
                    <div className="showWhenLobbyId">
                        <div id="enter-lobby-message"> You're entering lobby: {lobbyId}</div>
                    </div>
                }

                {
                    !lobbyCode &&
                    <div className="showWhenNoLobbyCode">
                        <label htmlFor="lobby-code">Lobby Code:</label>
                        <input type="text" className="lobby-code-input" id="lobby-code" placeholder='Lobby Code' value={lobbyId} onChange={(event) => {
                            setLobbyId(event.target.value);
                        }} /><br />
                    </div>
                }

                <label htmlFor="player-name">Player Name:</label>
                <input type="text" className="player-name-input" id="player-name" placeholder="Enter your name to play..." onChange={(event) => {
                    setPlayerName(event.target.value);
                }} /><br />

                {
                    !lobbyId &&
                    <div className="showWhenNoLobbyId">
                        <label htmlFor="rows">Rows:</label>
                        <select id="rows" value={rows} onChange={(event) => {
                            setRows(event.target.value);
                        }}>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                        <label htmlFor="cols">Columns:</label>
                        <select id="cols" value={cols} onChange={(event) => {
                            setCols(event.target.value);
                        }}>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                        </select><br />
                        <label htmlFor="game-mode">Game Mode:</label>
                        <select id="game-mode" value={gameModeMultiplayer} onChange={(event) => {
                            if (event.target.value === "true") {
                                setGameModeMultiplayer(true);
                            } else {
                                setGameModeMultiplayer(false);
                            }
                        }}>
                            <option value="false">Vs Computer</option>
                            <option value="true">Vs Friends</option>
                        </select><br />
                        {
                            !gameModeMultiplayer &&
                            <div className="showWhenGameModeSinglePlayer">
                                <label htmlFor="level">Level:</label>
                                <select id="level" value={gameLevel} onChange={(event) => {
                                    setGameLevel(event.target.value);
                                }}>
                                    <option value="easy">Easy</option>
                                    <option value="hard">Hard</option>
                                </select><br />
                            </div>
                        }
                    </div>
                }

                {
                    !lobbyId && gameModeMultiplayer &&
                    <div className="showWhenNoLobbyId">
                        <Link to="/lobby/create">Create Lobby!</Link><br />
                    </div>
                }

                {
                    lobbyId && gameModeMultiplayer &&
                    <div className="showWhenLobbyId">
                        <Link to="/lobby/enter">Enter Lobby!</Link><br />
                    </div>
                }

                {
                    !lobbyId && !gameModeMultiplayer &&
                    <div className="showWhenGameModeMultiplayer">
                        <Link to="/gameroom/singleplayer">Play!</Link><br />
                    </div>
                }

                <Link to="/" reloadDocument>Start a new Game!</Link><br />
            </div>
        </div >
    );
}

//for lobby creation on clicking play button
// onClick={() => {
//     if (!lobbyId) {
//         if (gameModeMultiplayer) {
//             socket.emit("createLobby", playerName, rows, cols);
//         }
//     } else {
//         console.log("Set")
//     }
// }}

// // Define arrays of first and last names
// const firstNames = ['Hero', 'Handsome', 'Kanxo', 'Mailo', 'Dangerous', 'Rider', 'Seucy', 'Moh', 'Kto', 'Kooool'];

// // Generate random name
// const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
// const randomLastName = firstNames[Math.floor(Math.random() * firstNames.length)];
// const randomName = randomFirstName + ' ' + randomLastName;