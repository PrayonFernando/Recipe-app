import React, { useState } from "react";
import { IoExitOutline } from "react-icons/io5";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/");
  };

  return (
    <header className="header">
      <img src={logo} alt="coek logo" className="logo" />
      <nav className="nav-links">
        <a href="/home">HOME</a>
        <a href="/favourite">FAVOURITE</a>
        <div className="settings-container">
          <IoExitOutline
            className="settings-icon"
            onClick={() => setShowSettings((prev) => !prev)}
          />
          {showSettings && (
            <div className="settings-dropdown">
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
