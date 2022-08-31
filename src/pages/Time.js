import styles from '../UI/timeList.module.css';
import TimeSchedule from '../components/TimeSchedule';

const TimeOrder = () => {
  return (
    <div className={styles.timeContainer}>
      <TimeSchedule />
    </div>
  );
};

export default TimeOrder;
