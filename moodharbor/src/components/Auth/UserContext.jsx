import React, { createContext, useState } from 'react'

const UserContext = createContext();

export const UserProvider = ({ children }) => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [user, setUser] = useState(null);
  const [user, setUserState] = useState(() => {
      // const storedUser = localStorage.getItem('user');
      const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    });

  const setUser = (username, stayLoggedIn) => {
      
    if (stayLoggedIn) {
      localStorage.setItem('user', JSON.stringify(username));
      sessionStorage.removeItem('user');
    } else {
      sessionStorage.setItem('user', JSON.stringify(username));
      localStorage.removeItem('user');
    }
    setUserState(username);
    setIsLoggedIn(true);
    };

  const logout = (stayLoggedIn) => {
    // Remove user details from localStorage or sessionStorage
    if (stayLoggedIn) {
      localStorage.removeItem('user');
      console.log('User removed from localStorage');
    }else {
      sessionStorage.removeItem('user');
      console.log('User removed from sessionStorage');
    }
    setUser(null);
    setIsLoggedIn(false);
    };

  return (
      <UserContext.Provider value={{ user, setUser, logout }}>
          {children}
      </UserContext.Provider>
  )
}

export default UserContext