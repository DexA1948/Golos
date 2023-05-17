import { Route, Routes } from 'react-router-dom';
import golosLogo from '../assets/images/logo.png';
import './Header.css';

export function Header() {
    return (
        <div className="header">
            <div className="logo-container">
                <img src={golosLogo} alt="Golos Logo" className="logo-img" />
            </div>
            <Routes>
                <Route path='/' element={
                    <div className="welcome-message">
                        <span className="welcome-text">Welcome to </span><br />
                        <span className="logo-text">
                            <img src={golosLogo} alt="Golos Logo" className="logo-img" />
                            <span className="golos-text">olos</span>
                        </span>
                    </div>
                } />
                <Route path='/lobby' element={
                    <div className="welcome-message">
                        <span className="lobby">Lobby</span><br />
                    </div>
                } />
                <Route path='/gameroom' element={
                    <div className="welcome-message">
                        <span className="gameroom">Let's play</span><br />
                    </div>
                } />
            </Routes>
        </div>
    );
}