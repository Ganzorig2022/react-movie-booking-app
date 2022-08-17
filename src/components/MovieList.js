import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useMovieDataContext } from './MovieDataContext';
import styles from '../UI/movieList.module.css';
import { useState } from 'react';

const MovieList = ({ movies }) => {
  const navigate = useNavigate();
  const { movieData, setMovieData } = useMovieDataContext();
  const [isActive, setIsActive] = useState(false);

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
