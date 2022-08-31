import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMovieDataContext } from '../provider/MovieDataContext';
import { usePathNameContext } from '../provider/PathNameContext';

import styles from '../UI/movieList.module.css';

const MovieList = ({ movies }) => {
  const navigate = useNavigate();
  const { setMovieData } = useMovieDataContext();
  const { pathName, setPathName } = usePathNameContext();

  //==========0. Set Pathname for Navbar Active Page Color=======
  const getPathName = () => {
    const path = window.location.pathname;

    setPathName({ ...pathName, home: path, time: '', seat: '', login: '' });
  };

  useEffect(() => {
    getPathName();
  }, []);

  return (
    <div className={styles.movieContainer}>
      {movies.map((movie, idx) => (
        <div key={idx} className={styles.movieItems}>
          <div className={styles.headerContainer}>
            <h2 className={styles.header}>{movie.Title}</h2>
          </div>
          <Link id='time' to='/time'>
            <img
              src={movie.Poster}
              alt='movie'
              onClick={() => {
                setMovieData(movie);
                navigate('/time');
              }}
            ></img>
          </Link>
          <button
            onClick={() => {
              setMovieData(movie);
              navigate('/time');
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
