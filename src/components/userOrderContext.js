import { useState, createContext, useContext } from 'react';

const UserData = createContext();

export const UserDataProvider = (props) => {
  const { children } = props;
  const [userData, setUserData] = useState({});

  return (
    <UserData.Provider value={{ userData, setUserData }}>
      {children}
    </UserData.Provider>
  );
};

export const useUserDataContext = () => useContext(UserData);
