import styles from '../UI/timeList.module.css';
import { useState } from 'react';

const MovieHall = () => {
  const [isActive, setIsActive] = useState(false);
  const seatArr = new Array(27).fill(0);

  const timeClickHandler = (event) => {
    // console.log(event.currentTarget.textContent);
    setIsActive((current) => !current);
  };
  return (
    <div>
      <h2>Суудал сонголт</h2>
      <div className={styles.timeSelectContainer}>
        <p>Суудлаа сонгоно уу:</p>
        <div className={styles.seatsContainer}>
          <div className={styles.screenContainer}>
            <p className={styles.screen}>Screen</p>
          </div>
          <div>
            {seatArr.map((seat, idx) => {
              return (
                <input
                  id={idx}
                  key={idx}
                  type='checkbox'
                  name=''
                  className={styles.seats}
                  onClick={timeClickHandler}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieHall;
