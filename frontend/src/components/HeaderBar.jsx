import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext';
import './HeaderBar.css';

function HeaderBar() {
  const { token, username, logout } = useUser();

  return (
    <header className="header-bar">
      <div className="left-section">
        <button className="header-button">Lista lekarzy</button>
      </div>
      <div className="right-section">
        {token ? (
          <>
            <span className="header-username">{username}</span>
            <button className="header-button" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/register" className="header-button">Register</Link>
            <Link to="/login" className="header-button">Login</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default HeaderBar;