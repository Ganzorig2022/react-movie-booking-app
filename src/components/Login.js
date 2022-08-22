import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import classes from '../UI/login.module.css';
import { getDataFromFireStore } from '../firebase';
import { usePathNameContext } from '../provider/PathNameContext';
import { useLoggedInContext } from '../provider/LoggedInContext';
import { useLoggedUserDataContext } from '../provider/LoggedUserDataContext';

const Login = () => {
  const navigate = useNavigate();
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPhone, setEnteredPhone] = useState('');
  const [phoneIsValid, setPhoneIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const { loggedUserData, setLoggedUserData } = useLoggedUserDataContext();
  const { pathName, setPathName } = usePathNameContext();
  const { isLoggedIn, setIsLoggedIn } = useLoggedInContext();

  //==========0. Set Pathname for Navbar Active Page Color=======
  const getPathName = () => {
    const path = window.location.pathname;
    setPathName({ ...pathName, login: path, home: '', time: '', seat: '' });
  };

  useEffect(() => {
    getPathName();
  }, []);

  useEffect(() => {
    setFormIsValid(
      enteredEmail.includes('@') && enteredPhone.trim().length === 8
    );
  }, [enteredEmail, enteredPhone]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await getDataFromFireStore();
    setLoggedUserData([...data.userData]);
  };

  const inputChangeHandler = (event) => {
    const { id, value } = event.target;
    if (id === 'email') setEnteredEmail(value);
    if (id === 'phone') setEnteredPhone(value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePhoneHandler = () => {
    let phoneRegex = /^[0-9]{8}$/;

    setPhoneIsValid(
      enteredPhone.trim().length === 8 && phoneRegex.test(enteredPhone.trim())
    );
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const result = loggedUserData.find(
      (el) => el.email === enteredEmail && el.phone === enteredPhone
    );
    if (!result) alert('Таны нэвтрэх имэйл, утас буруу байна!');
    else {
      alert('Та амжилттай нэвтэрлээ');
      setIsLoggedIn(true);
      navigate('/movie');
    }
  };

  return (
    <div className={classes.login}>
      <header className={classes.header}>
        <h2>Нэвтрэх</h2>
      </header>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor='email'>Имэйл*</label>
          <input
            type='email'
            id='email'
            value={enteredEmail}
            onChange={inputChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            phoneIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor='password'>Утасны дугаар*</label>
          <input
            type='phone'
            id='phone'
            value={enteredPhone}
            onChange={inputChangeHandler}
            onBlur={validatePhoneHandler}
          />
        </div>
        <div className={classes.actions}>
          <button
            type='submit'
            className={classes.button}
            disabled={!formIsValid}
          >
            Нэвтрэх {'>'} Кино сонголт
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
