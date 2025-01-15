import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUsername){
      setUsername(storedUsername);
    }
  }, []);

  const login = (tokenData, usernameData) => {
    setToken(tokenData);
    setUsername(usernameData);
    localStorage.setItem('token', tokenData);
    localStorage.setItem('username', usernameData);
  };

  const logout = () => {
    setToken(null);
    setUsername('');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  return (
    <UserContext.Provider value={{ token, username, setUsername, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};