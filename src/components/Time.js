import { useState } from 'react';
import styles from '../UI/timeList.module.css';
import LegendItems from './Legend';
import TimeSchedule from './TimeSchedule';
import MovieHall from './MovieHall';

const TimeOrder = () => {
  return (
    <div className={styles.timeContainer}>
      <LegendItems />
      <TimeSchedule />
      <MovieHall />
    </div>
  );
};

export default TimeOrder;
