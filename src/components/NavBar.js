import styles from '../UI/navBar.module.css';
import { Link } from 'react-router-dom';
import { usePathNameContext } from '../provider/PathNameContext';

const Navbar = () => {
  const { pathName } = usePathNameContext();

  return (
    <div className={styles.header}>
      <h1>Ganzorig Cinema</h1>
      <div className={styles.labelsContainer}>
        <ul>
          <li className={pathName.home === '/' ? styles.active : ''}>
            <Link id='home' to='/'>
              Эхлэл
            </Link>
          </li>
          <li className={pathName.time === '/time' ? styles.active : ''}>
            <Link id='time' to='/time'>
              Цаг захиалга
            </Link>
          </li>
          <li className={pathName.seat === '/seat' ? styles.active : ''}>
            <Link id='seat' to='/seat'>
              Суудал захиалга
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
