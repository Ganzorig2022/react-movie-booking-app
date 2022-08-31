import styles from '../UI/navBar.module.css';
import { Link } from 'react-router-dom';
import UserModal from './LoggedUserDataModal';
import { usePathNameContext } from '../provider/PathNameContext';
import { useLoggedInContext } from '../provider/LoggedInContext';
import { useModalToggleContext } from '../provider/ModalToggleContext';

const Navbar = () => {
  const { pathName } = usePathNameContext();
  const { isLoggedIn } = useLoggedInContext();
  const { modalClose, setModalClose } = useModalToggleContext();

  return (
    <div className={styles.header}>
      {modalClose ? <UserModal /> : ''}
      <h1>Ganzorig Cinema</h1>
      <div className={styles.labelsContainer}>
        <ul>
          <Link id='home' to='/movie'>
            <li className={pathName.home === '/movie' ? styles.active : ''}>
              Эхлэл
            </li>
          </Link>
          <Link id='time' to='/time'>
            <li className={pathName.time === '/time' ? styles.active : ''}>
              Цаг захиалга
            </li>
          </Link>
          <Link id='seat' to='/seat'>
            <li className={pathName.seat === '/seat' ? styles.active : ''}>
              Суудал захиалга
            </li>
          </Link>
          <Link id='login' to='/'>
            <li className={pathName.login === '/' ? styles.active : ''}>
              {isLoggedIn ? 'Нэвтэрсэн' : 'Нэвтрэх'}
            </li>
          </Link>
          {isLoggedIn && (
            <button
              id='modal'
              onClick={() => setModalClose((prevState) => !prevState)}
            >
              Профайл
            </button>
          )}
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
