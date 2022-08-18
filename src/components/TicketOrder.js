import styles from '../UI/ticketOrder.module.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const TicketOrder = () => {
  const [selectedInput, setSelectedInput] = useState('');
  const ticketArr = new Array(10).fill(0);
  const navigate = useNavigate();

  const prevPageHandler = () => {
    navigate('/time');
  };
  const nextPageHandler = () => {
    navigate('/seat');
  };
  const selectInputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.selectedOptions[0].getAttribute('name');
    // event.target.value = null;

    setSelectedInput({ [name]: value });
    console.log(value);
  };
  return (
    <div className={styles.ticketContainer}>
      <h2>ТАСАЛБАРЫН ТОО СОНГОХ</h2>
      <div className={styles.ticketOrderContainer}>
        <p>
          Та нэг удаагийн гүйлгээ хийхэд хамгийн ихдээ 10 тасалбар захиалах
          боломжтой. Хэрвээ та тасалбар захиалга хийж эхэлсэн бол тодорхой
          хугацааны дотор гүйлгээг дуусгахыг зөвлөе. Энэ хугацаанд амжаагүй
          тохиолдолд та дахин эхлүүлэх шаардлагатай болно.
        </p>
        <p>
          Сонгох боломжтой тасалбарын тоо: {'\n'}
          {0 / 10}
        </p>
        <div className={styles.ticketNumberIncreaseContainer}>
          <p>Том хүн</p>
          <button>-</button>
          <select onChange={selectInputHandler}>
            {ticketArr.map((el, idx) => {
              return (
                <option key={idx} name='ticket'>
                  {idx + 1}
                </option>
              );
            })}
          </select>
          <button>+</button>
          <p>7000₮</p>
          <p>Нийт үнэ: ₮</p>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={nextPageHandler} disabled={null}>
          Үргэлжлүүлэх
        </button>
        <button onClick={prevPageHandler}>Буцах</button>
      </div>
    </div>
  );
};

export default TicketOrder;
