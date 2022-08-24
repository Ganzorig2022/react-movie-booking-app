import styles from '../UI/timeList.module.css';
import classes from '../UI/cancelOrder.module.css';
import { useNavigate } from 'react-router-dom';

const CancelOrder = () => {
  const navigate = useNavigate();

  const cancelHandler = () => {
    navigate('/movie');
  };

  return (
    <div className={styles.timeContainer}>
      <div className={styles.timeContainer}>
        <p className={classes.cancelSelectContainer}>Захиалга цуцлагдлаа.</p>{' '}
        <div className={styles.buttonContainer}>
          <button onClick={cancelHandler}>Эхлэл хуудас руу буцах</button>
        </div>
      </div>
    </div>
  );
};

export default CancelOrder;
