import { useState, createContext, useContext } from 'react';

const PathContext = createContext();

export const PathNameProvider = (props) => {
  const { children } = props;
  const [pathName, setPathName] = useState({
    home: '',
    time: '',
    seat: '',
  });

  return (
    <PathContext.Provider value={{ pathName, setPathName }}>
      {children}
    </PathContext.Provider>
  );
};

export const usePathNameContext = () => useContext(PathContext);
