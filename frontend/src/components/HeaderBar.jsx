import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import './HeaderBar.css';

function HeaderBar() {
  const { token, role, username, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header-bar">
      <div className="left-section">
        <Link to="/" className="header-button">Strona Główna</Link>
        {role === '' && (
          <>
            <Link to="/doctorlist" className="header-button">Lista lekarzy</Link>
          </>
        )}
        {role === 'pacjent' && (
          <>
            <Link to="/doctorlist" className="header-button">Lista lekarzy</Link>
            <Link to="/myappointments" className="header-button">Mój koszyk/zarezerowane wizyty</Link>
          </>
        )}
        {role === 'doctor' && (
          <>
            <Link to="/schedule" className="header-button">Mój harmonogram</Link>
            <Link to="/manageschedule" className="header-button">Zarządzanie harmonogramem</Link>
          </>
        )}
        {role === 'admin' && (
          <>
            <Link to="/doctorlist" className="header-button">Lista lekarzy</Link>
          </>
        )}
      </div>
      <div className="right-section">
        {token ? (
          <>
            <span className="header-username">{username} - {role}</span>
            <button className="header-button" onClick={handleLogout}>Logout</button>
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