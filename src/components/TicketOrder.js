import styles from '../UI/ticketOrder.module.css';
import { Routes, Route, useNavigate } from 'react-router-dom';

const TicketOrder = () => {
  const ticketArr = new Array(10).fill(0);
  const navigate = useNavigate();

  const prevPageHandler = () => {
    navigate('/time');
  };
  const nextPageHandler = () => {
    navigate('/seat');
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
          <button>-</button>
          <select name='' id=''>
            {ticketArr.map((el, idx) => {
              return <option value={idx + 1}>{idx + 1}</option>;
            })}
          </select>
          <button>+</button>
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
