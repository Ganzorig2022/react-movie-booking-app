import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useMovieDataContext } from '../provider/MovieDataContext';
import { usePathNameContext } from '../provider/PathNameContext';
import styles from '../UI/movieList.module.css';

const MovieList = ({ movies }) => {
  const navigate = useNavigate();
  const { movieData, setMovieData } = useMovieDataContext();
  const { pathName, setPathName } = usePathNameContext();
  const [isActive, setIsActive] = useState(false);

  //==========0. Set Pathname for Navbar Active Page Color=======
  const getPathName = () => {
    const path = window.location.pathname;

    setPathName({ ...pathName, home: path, time: '', seat: '' });
  };

  useEffect(() => {
    getPathName();
  }, []);

  if (isActive) return navigate('/time');
  return (
    <div className={styles.movieContainer}>
      {movies.map((movie, idx) => (
        <div key={idx} className={styles.movieItems}>
          <div className={styles.headerContainer}>
            <h2 className={styles.header}>{movie.Title}</h2>
          </div>
          <img src={movie.Poster} alt='movie'></img>
          <button
            onClick={() => {
              setMovieData(movie);
              setIsActive(true);
            }}
            className={styles.orderText}
          >
            Цагийн хуваарь {'>'} Захиалга
          </button>
        </div>
      ))}
    </div>
  );
};
export default MovieList;
