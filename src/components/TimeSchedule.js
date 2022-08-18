import styles from '../UI/timeList.module.css';
import timeData from '../TimeData.json';
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useMovieDataContext } from './MovieDataContext';
import { useUserDataContext } from './userOrderContext';

const TimeSchedule = () => {
  const [enteredInput, setEnteredInputs] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [selectedTime, setSelectedTime] = useState({ time: '' });
  const [selectedOption, setSelectedOption] = useState({ day: '', hall: '' });
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
  console.log(enteredInput);
  //3. Odor, tanhim songodog eventHandler
  const selectOptionHandler = (event) => {
    const value = event.target.value;
    const name = event.target.selectedOptions[0].getAttribute('name');

    setSelectedOption({ ...selectedOption, [name]: value });
  };

  //4. Buh data-g hadgaldag eventHandler
  const submitHandler = () => {
    setUserData({
      ...enteredInput,
      ...selectedTime,
      ...selectedOption,
    });
  };

  //5. Next Page-ruu JUMP hdeg hseg.
  const prevPageHandler = () => {
    navigate('/');
  };
  const nextPageHandler = () => {
    let emailPattern = /^[^ ]+@[^ ]+.[a-z]{2,3}$/;
    if (enteredInput.name === '') alert('Та нэрээ зөв оруулна уу!');
    if ((enteredInput.phone = '' || enteredInput.phone.length !== 8))
      alert('Та утсаа зөв оруулна уу!');
    if (enteredInput.email === '' || !enteredInput.email.match(emailPattern))
      alert('Та имэйлээ зөв оруулна уу!');
    if (selectedTime.time === '') alert('Та цагаа заавал  сонгоно уу!');
    if (selectedOption.day === '') alert('Та өдрөө заавал  сонгоно уу!');
    if (selectedOption.hall === '') alert('Та танхимаа заавал  сонгоно уу!');
    else {
      submitHandler();
      navigate('/ticket');
    }
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
              value={enteredInput.name}
              onChange={eventHandler}
            />
            <label>Утас*</label>
            <input
              type='phone'
              name='phone'
              value={enteredInput.phone}
              onChange={eventHandler}
            />
            <label>Имэйл*</label>
            <input
              type='email'
              name='email'
              value={enteredInput.email}
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
