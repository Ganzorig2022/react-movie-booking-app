import styles from '../UI/movieSeat.module.css';
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useMovieDataContext } from './MovieDataContext';
import { useUserDataContext } from './userOrderContext';
import { useGetIDContext } from './GetIDContext';
import LegendItems from './Legend';

const MovieHall = () => {
  const navigate = useNavigate();
  const [seatID, setSeatID] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const { isClickedID, setIsClickedID } = useGetIDContext();
  const { userData, setUserData } = useUserDataContext();
  const { movieData } = useMovieDataContext();
  const seatArr = new Array(33).fill(0);

  const inputClickHandler = (event) => {
    const value = +event.target.id;
    setIsActive(!isActive);
    getIDHandler(value);

    const isSelected = seatID.includes(value);

    if (!isSelected) setSeatID([...seatID, value]);

    // localStorage.setItem('selectedSeats', JSON.stringify(seatID));
  };

  // 2. Darsan suudalnii ID-g hadgaldag heseg
  const getIDHandler = (id) => {
    setIsClickedID(id);
  };

  console.log(seatID);

  const prevPageHandler = () => {
    navigate('/time');
  };
  const nextPageHandler = () => {
    navigate('/ticket');
  };
  // console.log(userData);

  return (
    <>
      <h1>Суудал сонголт</h1>
      <div className={styles.movieSeatContainer}>
        <div className={styles.seatLeftContainer}>
          <div className={styles.seatWrapper}>
            <p>Суудлаа сонгоно уу:</p>
            <div className={styles.seatsContainer}>
              <div className={styles.screenContainer}>
                <p className={styles.screen}>Дэлгэц</p>
              </div>
              <div className={styles.suudalContainer}>
                {seatArr.map((seat, idx) => {
                  const isSelected = seatID.includes(seat);
                  console.log(isSelected);
                  return (
                    <div
                      id={idx}
                      key={idx}
                      className={
                        isSelected && isActive
                          ? styles.seats + ' ' + styles.selected
                          : styles.seats
                      }
                      onClick={inputClickHandler}
                    >
                      {idx}
                    </div>
                  );
                })}
              </div>
              <LegendItems />
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button onClick={nextPageHandler}>Үргэлжлүүлэх</button>
            <button onClick={prevPageHandler}>Буцах</button>
          </div>
        </div>
        <div className={styles.seatRightContainer}>
          <div className={styles.seatRightItems}>
            <h3>Хэрэглэгчийн нэр:</h3>
            <p>{userData.name}</p>
            <h3>Киноны нэр:</h3>
            <p>{movieData.Title}</p>
            <h3>Танхимын №:</h3>
            <p>{userData.hall}</p>
            <h3>Үзвэрийн цаг:</h3>
            <p>{userData.time}</p>
            <h3>Билетын тоо:</h3>
            <h3>Суудлын №:</h3>
            <h3>Билетын үнэ:</h3>
          </div>
          <div>
            <img src={movieData.Poster} alt='movie-image' />
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieHall;
