import styles from '../UI/legendItems.module.css';

const LegendItems = () => {
  return (
    <>
      <ul className={styles.showcase}>
        <li>
          <div className={styles.seat}></div>
          <small>Боломжит</small>
        </li>
        <li>
          <div className={styles.seat + ' ' + styles.occupied}></div>
          <small>Зарагдсан</small>
        </li>
        <li>
          <div className={styles.seat + ' ' + styles.selected}></div>
          <small>Таны суудал</small>
        </li>
      </ul>
    </>
  );
};

export default LegendItems;
