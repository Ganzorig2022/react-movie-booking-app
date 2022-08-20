import styles from '../UI/navBar.module.css';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState({
    home: false,
    time: false,
    seat: false,
  });
  const setActive = (event) => {
    const id = event.target.id;
    if (id === 'home') setActiveMenu({ time: false, seat: false, home: true });
    if (id === 'time') setActiveMenu({ time: true, seat: false, home: false });
    if (id === 'seat') setActiveMenu({ time: false, seat: true, home: false });
  };
  return (
    <div className={styles.header}>
      <h1>Ganzorig Cinema</h1>
      <div className={styles.labelsContainer}>
        <ul>
          {/* <NavLink to='/' exact>
            <li className={activeMenu.home && styles.active}>Home</li>
          </NavLink> */}
          <li className={activeMenu.home ? styles.active : ''}>
            <Link id='home' to='/' onClick={setActive}>
              Эхлэл
            </Link>
          </li>
          <li className={activeMenu.time ? styles.active : ''}>
            <Link id='time' to='/time' onClick={setActive}>
              Цаг захиалга
            </Link>
          </li>
          <li className={activeMenu.seat ? styles.active : ''}>
            <Link id='seat' to='/seat' onClick={setActive}>
              Суудал захиалга
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
