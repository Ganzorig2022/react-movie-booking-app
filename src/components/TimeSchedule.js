import styles from '../UI/timeList.module.css';
import timeData from '../TimeData.json';
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useMovieDataContext } from './MovieDataContext';
import { useUserDataContext } from './userOrderContext';

const TimeSchedule = () => {
  const [enteredInput, setEnteredInputs] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedOption, setselectedOption] = useState('');
  const [isActive, setIsActive] = useState(false);
  const { movieData } = useMovieDataContext();
  const { userData, setUserData } = useUserDataContext();
  const navigate = useNavigate();

  // 1. Tsag songodog eventHandler
  const timeClickHandler = (event) => {
    const timeValue = event.currentTarget.textContent;
    setSelectedTime(timeValue);
    setIsActive((current) => !current);
  };

  // 2. Ner,Email,Pass hadgaldag eventHandler
  const eventHandler = (event) => {
    const { name, value } = event.target;
    setEnteredInputs({ ...enteredInput, [name]: value });
  };
  // if (Object.keys(enteredInput).length < 3)
  //   return alert('Та бүх талбараа оруулна уу');

  //3. Odor, tanhim songodog eventHandler
  const selectOptionHandler = (event) => {
    const value = event.target.value;
    const name = event.target.selectedOptions[0].getAttribute('name');
    setselectedOption({ ...selectedOption, [name]: value });
  };

  //4. Buh data-g hadgaldag eventHandler
  const submitHandler = () => {
    setUserData({
      ...enteredInput,
      time: selectedTime,
      ...selectedOption,
    });
  };

  //5. Next Page-ruu JUMP hdeg hseg.
  const prevPageHandler = () => {
    navigate('/');
  };
  const nextPageHandler = () => {
    submitHandler();
    navigate('/ticket');
  };

  return (
    <div className={styles.timeWrapper}>
      <div className={styles.leftImg}>
        <img src={movieData.Poster} alt='' />
      </div>
      <div className={styles.timeRightContainer}>
        <h2>Захиалгын хэсэг</h2>
        <div className={styles.timeSelectContainer}>
          <div className={styles.inputArea}>
            <label>Нэр*</label>
            <input
              type='text'
              name='name'
              value={userData.name}
              onChange={eventHandler}
            />
            <label>Утас*</label>
            <input
              type='phone'
              name='phone'
              value={userData.phone}
              onChange={eventHandler}
            />
            <label>Имэйл*</label>
            <input
              type='email'
              name='email'
              value={userData.email}
              onChange={eventHandler}
            />
          </div>
          <p>Цагаа сонгоно уу:</p>
          <div className={styles.timeListContainer}>
            {timeData.map((time, idx) => {
              return (
                <span
                  id={idx}
                  className={
                    isActive ? styles.times + ' ' + styles.active : styles.times
                  }
                  key={idx}
                  name='time'
                  onClick={timeClickHandler}
                >
                  {time}
                </span>
              );
            })}
          </div>
          <p>Өдрөө сонгоно уу:</p>
          <div>
            <label>Өдрүүд: </label>
            <select className={styles.selectDay} onChange={selectOptionHandler}>
              <option name='day' value='Даваа'>
                Даваа
              </option>
              <option name='day' value='Мягмар'>
                Мягмар
              </option>
              <option name='day' value='Лхагва'>
                Лхагва
              </option>
              <option name='day' value='Пүрэв'>
                Пүрэв
              </option>
              <option name='day' value='Баасан'>
                Баасан
              </option>
              <option name='day' value='Бямба'>
                Бямба
              </option>
              <option name='day' value='Ням'>
                Ням
              </option>
            </select>
          </div>
          <p>Танхимаа сонгоно уу:</p>
          <div>
            <label>Танхим: </label>
            <select className={styles.selectDay} onChange={selectOptionHandler}>
              <option name='hall' value='Танхим-1'>
                Танхим-1
              </option>
              <option name='hall' value='Танхим-2'>
                Танхим-2
              </option>
              <option name='hall' value='Танхим-3'>
                Танхим-3
              </option>
            </select>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={nextPageHandler} disabled={null}>
            Үргэлжлүүлэх
          </button>
          <button onClick={prevPageHandler}>Буцах</button>
        </div>
      </div>
    </div>
  );
};

export default TimeSchedule;
