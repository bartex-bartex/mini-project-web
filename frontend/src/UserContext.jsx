import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    const storedId = localStorage.getItem('id');
    if (storedToken) {
      setToken(storedToken);
      const decodedToken = jwtDecode(storedToken);
      setRole(decodedToken.role);
      setId(decodedToken.id); // Assuming the token contains id
    }
    if (storedUsername) {
      setUsername(storedUsername);
    }
    if (storedId) {
      setId(storedId);
    }
    setLoading(false);
  }, []);

  const login = (tokenData, usernameData) => {
    setToken(tokenData);
    setUsername(usernameData);
    const decodedToken = jwtDecode(tokenData);
    setRole(decodedToken.role);
    setId(decodedToken.id); // Assuming the token contains id
    localStorage.setItem('token', tokenData);
    localStorage.setItem('username', usernameData);
    localStorage.setItem('id', decodedToken.id);
  };

  const logout = () => {
    setToken(null);
    setUsername('');
    setRole('');
    setId('');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('id');
  };

  return (
    <UserContext.Provider value={{ token, username, role, id, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};