import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, Route, Routes } from 'react-router-dom';
import { io } from "socket.io-client";
import './App.css';

import { Home } from './components/Home';
import { Lobby } from './components/Lobby';
import { Gameroom } from './components/Gameroom';
import { GameroomMultiplayer } from './components/GameroomMultiplayer';
import { PageNotFound } from './components/PageNotFound';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Endroom } from './components/Endroom';

const socket = io.connect("http://localhost:3001");

function App() {

  const navigate = useNavigate();

  const [lobbyId, setLobbyId] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [playerColor, setPlayerColor] = useState("");
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(4);
  const [gameModeMultiplayer, setGameModeMultiplayer] = useState(true);
  const [gameLevel, setGameLevel] = useState("hard");
  const [myLobby, setMyLobby] = useState(null);
  const [error, setError] = useState("");
  const [errorCode, setErrorCode] = useState(0);
  const [lines, setLines] = useState([]);
  const [squares, setSquares] = useState([]);

  socket.on("lobbyUpdated", (lobby) => {
    if (lobby) {
      setMyLobby(lobby);
      setLines(lobby.lines);
      setSquares(lobby.squares)
    }
  });

  socket.on("lobbyJoined", (playerId, playerColor) => {
    setPlayerId(playerId);
    setPlayerColor(playerColor);
  });


  socket.on("lobbyJoinedFail", ({ errorCode, error }) => {
    setError(error);
    setErrorCode(errorCode);
  });

  socket.on("gameStarted", () => {
    setMyLobby({
      ...myLobby,
      gameStarted: true,
    })
    navigate("/gameroom/multiplayer");
  });

  socket.on("gameEnded", () => {
    setMyLobby({
      ...myLobby,
      gameStarted: false,
    })
    navigate("/end");
  });

  return (
    <div className="App">
      <Header/>
      {//error rather than no error or error due to already being in lobby
        errorCode !== 0 && errorCode !== 3 &&
        <div className='showOnError'>
          <p>{error}</p>
          <br />
          <Link to="/" reloadDocument>Start a new Game!</Link><br />
        </div>
      }
      {//no error or error due to already being in lobby
        (errorCode === 0 || errorCode === 3) &&
        <Routes>
          <Route path='/' element={<Home
            lobbyId={lobbyId}
            setLobbyId={setLobbyId}
            playerName={playerName}
            setPlayerName={setPlayerName}
            rows={rows}
            setRows={setRows}
            cols={cols}
            setCols={setCols}
            gameModeMultiplayer={gameModeMultiplayer}
            setGameModeMultiplayer={setGameModeMultiplayer}
            gameLevel={gameLevel}
            setGameLevel={setGameLevel}
            socket={socket}
          />} />
          <Route path='/:lobbyCode' element={<Home
            lobbyId={lobbyId}
            setLobbyId={setLobbyId}
            playerName={playerName}
            setPlayerName={setPlayerName}
            rows={rows}
            setRows={setRows}
            cols={cols}
            setCols={setCols}
            gameModeMultiplayer={gameModeMultiplayer}
            setGameModeMultiplayer={setGameModeMultiplayer}
            gameLevel={gameLevel}
            setGameLevel={setGameLevel}
            socket={socket}
          />} />
          <Route path='/lobby/:any' element={<Lobby
            inviteLink={"http://localhost:3000/" + lobbyId}
            myLobby={myLobby}
            lobbyId={lobbyId}
            setLobbyId={setLobbyId}
            socket={socket}
            rows={rows}
            cols={cols}
            playerName={playerName}
            setPlayerName={setPlayerName}
            setErrorCode={setErrorCode}
            setError={setError}
          />} />
          <Route path='/gameroom/singleplayer' element={<Gameroom
            rows={rows}
            cols={cols}
            playerName={playerName}
            gameLevel={gameLevel}
          />} />
          <Route path='/gameroom/multiplayer' element={<GameroomMultiplayer
            myLobby={myLobby}
            setMyLobby={setMyLobby}
            lobbyId={lobbyId}
            setErrorCode={setErrorCode}
            setError={setError}
            socket={socket}
            playerId={playerId}
            playerColor={playerColor}
            playerName={playerName}
            setPlayerName={setPlayerName}
            lines={lines}
            setLines={setLines}
            squares={squares}
            setSquares={setSquares}
          />} />
          <Route path='/end' element={<Endroom
            myLobby={myLobby}
            lobbyId={lobbyId}
            socket={socket}
            playerId={playerId}
          />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
      }
      <Footer/>
    </div>
  );
}

export default App;