import styles from '../UI/timeList.module.css';
import timeData from '../TimeData.json';
import { useState } from 'react';

const TimeSchedule = () => {
  const [isActive, setIsActive] = useState(false);

  const timeClickHandler = (event) => {
    // console.log(event.currentTarget.textContent);
    setIsActive((current) => !current);
  };
  return (
    <div>
      <h2>Цагийн хуваарь</h2>
      <div className={styles.timeSelectContainer}>
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
          <select className={styles.selectDay}>
            <option value=''>Даваа</option>
            <option value=''>Мягмар</option>
            <option value=''>Лхагва</option>
            <option value=''>Пүрэв</option>
            <option value=''>Баасан</option>
            <option value=''>Бямба</option>
            <option value=''>Ням</option>
          </select>
        </div>
        <p>Танхимаа сонгоно уу:</p>
        <div>
          <label>Танхим: </label>
          <select className={styles.selectDay}>
            <option value=''>Танхим-1</option>
            <option value=''>Танхим-2</option>
            <option value=''>Танхим-3</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TimeSchedule;
