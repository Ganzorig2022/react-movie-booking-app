import { useState, createContext, useContext } from 'react';

const DataContext = createContext();

export const MovieProvider = (props) => {
  const { children } = props;
  const [movieData, setMovieData] = useState('');

  return (
    <DataContext.Provider value={{ movieData, setMovieData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useMovieDataContext = () => useContext(DataContext);
