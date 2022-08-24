import { useState, useEffect } from 'react';
import { getDataFromFireStore, addSeatDataToFireStore } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useMovieDataContext } from '../provider/MovieDataContext';
import { useUserDataContext } from '../provider/userOrderContext';
import { usePathNameContext } from '../provider/PathNameContext';
import { useLoggedInContext } from '../provider/LoggedInContext';
import styles from '../UI/movieSeat.module.css';
import clsx from 'classnames';
import LegendItems from './Legend';
import img from '../img/no-image.jpg';

const MovieHall = () => {
  const navigate = useNavigate();
  const [seatID, setSeatID] = useState([]);
  const [occupiedSeat, setOccupiedSeat] = useState([]);
  const { movieData } = useMovieDataContext();
  const { userData } = useUserDataContext();
  const { pathName, setPathName } = usePathNameContext();
  const { isLoggedIn } = useLoggedInContext();

  const seatArr = new Array(33).fill(0);
  const ticketPrice = 7000;

  //==========0. Set Pathname for Navbar Active Page Color=======
  const getPathName = () => {
    const path = window.location.pathname;

    setPathName({ ...pathName, home: '', time: '', seat: path, login: '' });
  };

  useEffect(() => {
    getPathName();
  }, []);

  //==========1. Get Seat Data from FireStore database=======
  const getSeatData = async () => {
    const data = await getDataFromFireStore();
    const seatData = await data.seat;
    setOccupiedSeat([...seatData]);
  };

  useEffect(() => {
    getSeatData();
  }, []);

  //==============2. Get Seat Number, then set it=========================
  const inputClickHandler = (event) => {
    const value = +event.target.id;

    const isSelected = seatID.includes(value);

    if (!isSelected) setSeatID([...seatID, value]);
    if (isSelected) setSeatID(seatID.filter((id) => id !== value));
  };

  // ========================3. Jump to PREVIOUS page==============
  const prevPageHandler = () => {
    navigate('/time');
  };

  // ========================4. Jump to NEXT page==============
  const nextPageHandler = () => {
    // navigate(null);
    if (isLoggedIn) {
      if (checkEqualSeatAndTicket()) {
        let document = JSON.parse(localStorage.getItem('docID'));
        let docID = document.docID;
        addSeatDataToFireStore(seatID, userData, docID);
        alert('Таны захиалга амжилттай баталгаажлаа!');
      }
    } else alert('Та заавал нэвтэрч орно уу!');
  };

  const cancelOrderHandler = () => {
    const userDataIsEmpty = checkUserDataIsEmpty();
    if (isLoggedIn && !userDataIsEmpty) navigate('/cancel');
    alert(
      'Та заавал нэвтэрч ороод өмнөх хуудсаас захиалгаа өгсөнөөр цуцлах боломжтой!'
    );
  };
  // ========================5. Check if seat number is equal to ticket number or not==============
  const checkEqualSeatAndTicket = () => {
    const userDataIsEmpty = checkUserDataIsEmpty();
    if (userDataIsEmpty) {
      alert('Та өмнөх хуудас руу орж билетээ сонгоно уу!');
      return false;
    } else {
      if (seatID.length === +userData.ticket) return true;
      if (seatID.length !== +userData.ticket) {
        alert('Та захиалсан билетний тоотой тэнцүү тоотой суудал сонгоно уу!');
        return false;
      }
    }
  };

  const checkUserDataIsEmpty = () => {
    const userDataIsEmpty = Object.entries(userData).length === 0;
    if (userDataIsEmpty) return true;
    return false;
  };
  return (
    <>
      <h1>Суудал сонголт</h1>
      <div className={styles.movieSeatContainer}>
        <div className={styles.seatLeftContainer}>
          <div className={styles.seatWrapper}>
            <p>Суудлаа сонгоно уу:</p>
            <small>
              *Дэлгэц нь зөвхөн суудлын зүг чигийг заах бөгөөд дэлгэцнээс суудал
              хоорондох зай бодит биш болно.
            </small>
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
                        !isLoggedIn
                          ? styles.seats + ' ' + styles.invalid
                          : isSelected
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
            <button onClick={nextPageHandler}>Захиалга баталгаажуулах</button>
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
            <p> {userData.ticket} </p>
            <h3>Суудлын №:</h3>
            <p>{seatID.join(', ')})</p>
            <h3>Билетын үнэ: </h3>
            <p>7000 ₮</p>
            <h3>Нийт үнэ: </h3>
            <p>
              {seatID.length > 0 && !isNaN(+userData.ticket)
                ? (seatID.length * ticketPrice).toFixed(1)
                : ''}{' '}
              ₮
            </p>
            <div className={styles.buttonContainer}>
              <button onClick={cancelOrderHandler}>Цуцлах</button>
            </div>
          </div>
          <div>
            {movieData.Poster ? (
              <img src={movieData.Poster} />
            ) : (
              <img src={img} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieHall;
