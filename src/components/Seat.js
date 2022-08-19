import styles from '../UI/movieSeat.module.css';
import clsx from 'classnames';
import { getDataFromFireStore, addSeatDataToFireStore } from '../firebase';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMovieDataContext } from './MovieDataContext';
import { useUserDataContext } from './userOrderContext';
import LegendItems from './Legend';

const MovieHall = () => {
  const navigate = useNavigate();
  const [seatID, setSeatID] = useState([]);
  const [occupiedSeat, setOccupiedSeat] = useState([]);
  const { userData, setUserData } = useUserDataContext();
  const { movieData } = useMovieDataContext();
  const seatArr = new Array(33).fill(0);
  const ticketPrice = 7000;

  //==========1. Get Seat Data from FireStore database=======
  const getSeatData = async () => {
    const data = await getDataFromFireStore();
    // console.log(data);
    const seatData = await data.user.seat;
    setOccupiedSeat([...seatData]);
  };

  useEffect(() => {
    getSeatData();
  }, []);
  // occupiedSeat = JSON.parse(localStorage.getItem('selectedSeats'));

  // console.log('from local', occupiedSeat);
  const inputClickHandler = (event) => {
    const value = +event.target.id;

    const isSelected = seatID.includes(value);

    if (!isSelected) setSeatID([...seatID, value]);
    if (isSelected) setSeatID(seatID.filter((id) => id !== value));
  };

  const prevPageHandler = () => {
    navigate('/time');
  };
  const nextPageHandler = () => {
    // navigate(null);
    setOccupiedSeat([...occupiedSeat.concat(...seatID)]);
  };

  console.log(seatID);
  console.log(occupiedSeat);
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
                  const isSelected = seatID.includes(idx);
                  const isOccupied = occupiedSeat.includes(idx);
                  return (
                    <div
                      id={idx}
                      key={idx}
                      className={clsx(
                        styles.seats,
                        isSelected
                          ? styles.seats + ' ' + styles.selected
                          : styles.seats,
                        isOccupied
                          ? styles.seats + ' ' + styles.occupied
                          : styles.seats
                      )}
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
            <button onClick={nextPageHandler}>Төлбөр төлөх</button>
            <button onClick={prevPageHandler}>Буцах</button>
          </div>
        </div>
        <div className={styles.seatRightContainer}>
          <div className={styles.seatRightItems}>
            <h3>Хэрэглэгчийн нэр:</h3>
            <p>{userData.name}</p>
            <h3>Киноны нэр:</h3>
            <p>{movieData.Title}</p>
            <h3>Үзвэрийн цаг:</h3>
            <p>
              {userData.time} ({userData.day})
            </p>
            <h3>Билетын тоо:</h3>
            <p> {userData.ticket} ш</p>
            <h3>Суудлын №:</h3>
            <p>
              {seatID.join(', ')} ({seatID.length} ш)
            </p>
            <h3>Билетын үнэ: </h3>
            <p>7000 ₮</p>
            <h3>Нийт үнэ: </h3>
            <p>
              {seatID.length > 0 && !isNaN(+userData.ticket)
                ? (seatID.length * +userData.ticket * ticketPrice).toFixed(1)
                : ''}{' '}
              ₮
            </p>
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
