import styles from '../UI/legendItems.module.css';

const LegendItems = () => {
  return (
    <>
      <ul className={styles.showcase}>
        <li>
          <div className={styles.seat}></div>
          <small>Захиалаагүй</small>
        </li>
        <li>
          <div className={styles.seat + ' ' + styles.occupied}></div>
          <small>Захиалсан</small>
        </li>
        <li>
          <div className={styles.seat + ' ' + styles.selected}></div>
          <small>Сонгосон</small>
        </li>
      </ul>
    </>
  );
};

export default LegendItems;
