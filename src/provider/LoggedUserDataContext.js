import { useState, createContext, useContext } from 'react';

const LoggedUserContext = createContext();

export const LoggedUserDataProvider = (props) => {
  const { children } = props;
  const [loggedUserData, setLoggedUserData] = useState([]);
  return (
    <LoggedUserContext.Provider value={{ loggedUserData, setLoggedUserData }}>
      {children}
    </LoggedUserContext.Provider>
  );
};

export const useLoggedUserDataContext = () => useContext(LoggedUserContext);
