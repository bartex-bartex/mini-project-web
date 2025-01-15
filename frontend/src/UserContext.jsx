import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (storedToken) {
      setToken(storedToken);
      const decodedToken = jwtDecode(storedToken);
      setRole(decodedToken.role);
    }
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const login = (tokenData, usernameData) => {
    setToken(tokenData);
    setUsername(usernameData);
    const decodedToken = jwtDecode(tokenData);
    setRole(decodedToken.role);
    localStorage.setItem('token', tokenData);
    localStorage.setItem('username', usernameData);
  };

  const logout = () => {
    setToken(null);
    setUsername('');
    setRole('');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  return (
    <UserContext.Provider value={{ token, username, role, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};