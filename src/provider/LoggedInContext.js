import { useState, createContext, useContext } from 'react';

const LoggedContext = createContext();

export const LoggedInProvider = (props) => {
  const { children } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <LoggedContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoggedContext.Provider>
  );
};

export const useLoggedInContext = () => useContext(LoggedContext);
