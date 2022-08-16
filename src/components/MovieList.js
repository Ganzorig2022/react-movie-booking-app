import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import styles from '../UI/movieList.module.css';

const MovieList = ({ movies }) => {
  const navigate = useNavigate();

  const navigateTimePage = () => {
    navigate('/time');
  };

  return (
    <div className={styles.movieContainer}>
      {movies.map((movie, idx) => (
        <div key={idx} className={styles.movieItems}>
          <div className={styles.headerContainer}>
            <h2 className={styles.header}>{movie.Title}</h2>
          </div>
          <img src={movie.Poster} alt='movie'></img>
          <button onClick={navigateTimePage} className={styles.orderText}>
            Цагийн хуваарь {'>'} Захиалга
          </button>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
