import { useState } from 'react';
import classes from '../UI/loggedUserModal.module.css';
import { useModalToggleContext } from '../provider/ModalToggleContext';
import { useLoggedUserDataContext } from '../provider/LoggedUserDataContext';
import { useLoggedInContext } from '../provider/LoggedInContext';
import userPhoneIsAvailable from '../helper/helper';

const UserModal = ({ data }) => {
  const { modalClose, setModalClose } = useModalToggleContext();
  const { loggedUserData } = useLoggedUserDataContext();
  const { isLoggedIn, setIsLoggedIn } = useLoggedInContext();

  const modalCloseHandler = () => {
    setModalClose(false);
  };
  const signOutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      <div className={classes.backdrop} onClick={modalCloseHandler} />
      <div className={classes.modal}>
        <header className={classes.header}>
          <h2>Хэрэглэгчийн мэдээлэл</h2>
        </header>

        <div className={classes.content}>
          <div className={classes.contentLeft}>
            <h3>Хувийн мэдээлэл:</h3>
            <p>Хэрэглэгчийн нэр:</p>
            <span>{loggedUserData[0].name} </span>
            <p>Имэйл:</p>
            <span>{loggedUserData[0].email} </span>
            <p>Утас:</p>
            <span>{loggedUserData[0].phone} </span>
          </div>
          <div className={classes.contentRight}>
            <h3>Захиалгууд:</h3>
            {loggedUserData.map((user, idx) => (
              <div key={idx}>
                <p id={idx}>Үзвэрийн нэр:</p>
                <span>{user.movie}</span>
                <p id={idx}>Үзвэрийн цаг:</p>
                <span>{user.time} </span>
                <p id={idx}>Тасалбарын тоо:</p>
                <span>{user.ticket} </span>
              </div>
            ))}
          </div>
        </div>

        <footer className={classes.actions}>
          <button onClick={signOutHandler}>Системээс гарах</button>
          <button onClick={modalCloseHandler}>Хаах</button>
        </footer>
      </div>
    </div>
  );
};

export default UserModal;
