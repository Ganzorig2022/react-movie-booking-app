import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMovieDataContext } from './MovieDataContext';
import { useUserDataContext } from './userOrderContext';
import styles from '../UI/timeList.module.css';
import timeData from '../TimeData.json';
import weekData from '../WeekData.json';

const TimeSchedule = () => {
  const ticketArr = new Array(10).fill(0);
  const [enteredInput, setEnteredInputs] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [inputIsValid, setInputIsValid] = useState({
    nameEmpty: true,
    nameValid: false,
    emailEmpty: true,
    emailValid: false,
    phoneEmpty: true,
    phoneValid: false,
  });

  const [selectedTime, setSelectedTime] = useState({ time: '' });
  const [selectedOption, setSelectedOption] = useState({ day: '', ticket: '' });
  const [selectedTimeID, setselectedTimeID] = useState([]);
  const { movieData } = useMovieDataContext();
  const { userData, setUserData } = useUserDataContext();
  const navigate = useNavigate();

  //========================Name check====================================
  const checkName = (name) => {
    if (name.length > 3) {
      setInputIsValid({ ...inputIsValid, nameEmpty: false, nameValid: true });
      return true;
    } else {
      alert('Та нэрээ зөв өгөхдөө хамгийн багадаа 3 тэмдэгт оруулна уу!');
      setInputIsValid({ ...inputIsValid, nameEmpty: false, nameValid: false });
      return false;
    }
  };
  //=========================Phone Check===============================
  const checkPhone = (phone) => {
    if (phone.length !== 8) {
      alert('Та утсаа зөв оруулахдаа хамгийн багадаа 8н тоо оруулна уу!');
      setInputIsValid({
        ...inputIsValid,
        phoneEmpty: false,
        phoneValid: false,
      });
      return false;
    } else {
      setInputIsValid({
        ...inputIsValid,
        phoneEmpty: false,
        phoneValid: true,
      });
      return true;
    }
  };
  //========================Email Check==================================
  const checkEmail = (email) => {
    let emailRegex = /^[^ ]+@[^ ]+.[a-z]{2,3}$/;

    if (emailRegex.test(email.trim())) {
      setInputIsValid({ ...inputIsValid, emailEmpty: false, emailValid: true });
      return true;
    } else {
      alert('Та имэйлээ зөв оруулна уу!');
      setInputIsValid({
        ...inputIsValid,
        emailEmpty: false,
        emailValid: false,
      });
      return false;
    }
  };

  //=================1. Ner,Email,Pass hadgaldag eventHandler====================
  const eventHandler = (event) => {
    const { name, value } = event.target;
    if (name === 'name')
      checkName(value) && setEnteredInputs({ ...enteredInput, [name]: value });
    if (name === 'phone')
      checkPhone(value) && setEnteredInputs({ ...enteredInput, [name]: value });
    if (name === 'email')
      checkEmail(value) && setEnteredInputs({ ...enteredInput, [name]: value });
  };

  //===================2. Tsag songoj hadgaldag eventHandler===================
  const timeClickHandler = (event) => {
    const timeValue = event.currentTarget.textContent;
    const id = +event.currentTarget.id;

    setSelectedTime({ time: timeValue });
    setselectedTimeID([id]);
  };

  //=================3. Odor, tasalbar songoj hadgaldag eventHandler================
  const selectOptionHandler = (event) => {
    const value = event.target.value;
    const name = event.target.selectedOptions[0].getAttribute('name');
    setSelectedOption({ ...selectedOption, [name]: value });
  };

  //===============4. Buh data-g hadgaldag heseg============================
  const saveAllData = () => {
    const validInputs = Object.values(enteredInput).every(
      (value) => value !== ''
    );
    const validOptions = Object.values(selectedOption).every(
      (value) => value !== ''
    );
    const validTime = selectedTime.time !== '';
    if (validInputs && validOptions && validTime) {
      setUserData({
        ...enteredInput,
        ...selectedTime,
        ...selectedOption,
      });
      alert('Бүх мэдээлэл зөв байна!');
      return true;
    } else {
      alert('Таны зарим мэдээлэл дутуу байна. Та бүрэн зөв бөглөнө үү!');
      return false;
    }
  };

  // useEffect(() => {
  //   localStorage.setItem('userAllData', JSON.stringify(userData));
  // }, [userData]);

  //===============5. Omnoh Page-ruu JUMP hiine.=================================
  const prevPageHandler = () => {
    navigate('/');
  };
  //===============5. Next Page-ruu JUMP hiine.=================================
  const nextPageHandler = () => {
    if (saveAllData()) navigate('/seat');
  };

  return (
    <div className={styles.timeWrapper}>
      <div className={styles.leftImg}>
        <img src={movieData.Poster} alt='' />
      </div>
      <div className={styles.timeRightContainer}>
        <h2>Захиалгын хэсэг</h2>
        <div className={styles.timeSelectContainer}>
          <p>Мэдээллээ оруулна уу:</p>
          <div className={styles.inputArea}>
            <label>Нэр*</label>
            <input
              type='text'
              name='name'
              value={enteredInput.name}
              onChange={eventHandler}
              className={
                inputIsValid.nameEmpty
                  ? styles.inputFormArea
                  : inputIsValid.nameValid
                  ? styles.inputFormArea + ' ' + styles.success
                  : styles.inputFormArea + ' ' + styles.error
              }
            />
            <label>Утас*</label>
            <input
              type='phone'
              name='phone'
              value={enteredInput.phone}
              onChange={eventHandler}
              className={
                inputIsValid.phoneEmpty
                  ? styles.inputFormArea
                  : inputIsValid.phoneValid
                  ? styles.inputFormArea + ' ' + styles.success
                  : styles.inputFormArea + ' ' + styles.error
              }
            />
            <label>Имэйл*</label>
            <input
              type='email'
              name='email'
              value={enteredInput.email}
              onChange={eventHandler}
              className={
                inputIsValid.emailEmpty
                  ? styles.inputFormArea
                  : inputIsValid.emailValid
                  ? styles.inputFormArea + ' ' + styles.success
                  : styles.inputFormArea + ' ' + styles.error
              }
            />
          </div>
          <p>Цагаа сонгоно уу:</p>
          <div className={styles.timeListContainer}>
            {timeData.map((time, idx) => {
              const isSelected = selectedTimeID.includes(idx);
              return (
                <span
                  id={idx}
                  className={
                    isSelected
                      ? styles.times + ' ' + styles.active
                      : styles.times
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
              {weekData.map((day, idx) => {
                return (
                  <option key={idx} name='day' value={day}>
                    {day}
                  </option>
                );
              })}
            </select>
          </div>
          <p>Тасалбарын тоог сонгоно уу:</p>
          <div>
            <label>Тасалбар: </label>
            <select className={styles.selectDay} onChange={selectOptionHandler}>
              {ticketArr.map((el, idx) => {
                return (
                  <option key={idx} name='ticket'>
                    {idx + 1} ш
                  </option>
                );
              })}
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
