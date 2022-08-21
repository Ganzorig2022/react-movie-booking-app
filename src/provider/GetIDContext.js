import { useState, createContext, useContext } from 'react';

const GetIDContext = createContext();

export const GetIDProvider = (props) => {
  const { children } = props;
  const [isClickedID, setIsClickedID] = useState('');
  return (
    <GetIDContext.Provider value={{ isClickedID, setIsClickedID }}>
      {children}
    </GetIDContext.Provider>
  );
};

export const useGetIDContext = () => useContext(GetIDContext);
