import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import classes from '../UI/login.module.css';
import {
  getDataFromFireStore,
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from '../firebase';
import { usePathNameContext } from '../provider/PathNameContext';
import { useLoggedInContext } from '../provider/LoggedInContext';
import { useLoggedUserDataContext } from '../provider/LoggedUserDataContext';

const Login = () => {
  const navigate = useNavigate();
  const [OTP, setOTP] = useState('');
  const [enteredPhone, setEnteredPhone] = useState('');
  const [openSignInInput, setOpenSignInInput] = useState(false);
  const [openVerifyBtn, setOpenVerifyBtn] = useState(false);
  const [phoneIsValid, setPhoneIsValid] = useState();
  const [OTPIsValid, setOTPIsValid] = useState(false);
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

  // useEffect(() => {
  //   setFormIsValid(OTPIsValid && enteredPhone.trim().length === 8);
  // }, [OTP, enteredPhone]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await getDataFromFireStore();
    setLoggedUserData([...data.userData]);
  };

  const inputChangeHandler = (event) => {
    const { id, value } = event.target;
    if (id === 'phone') setEnteredPhone(value);
    if (id === 'code') setOTP(value);
  };

  // console.log(typeof OTP);
  const validatePhoneHandler = () => {
    let phoneRegex = /^[0-9]{8}$/;

    setPhoneIsValid(
      enteredPhone.trim().length === 8 && phoneRegex.test(enteredPhone.trim())
    );
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const result = loggedUserData.find((el) => el.phone === enteredPhone);
    if (!result) alert('Таны нэвтрэх имэйл, утас буруу байна!');
    else {
      alert('Та амжилттай нэвтэрлээ');
      setIsLoggedIn(true);
      navigate('/movie');
    }
  };

  //============Authentication with Code from Phone Number using FireBase============
  // 1.Нэвтрэх код илгээх товчин дээр дарахад ажиллана.
  const requestOTP = () => {
    setOpenSignInInput(true);
    setOpenVerifyBtn(true);
    // if (enteredPhone.length === 8) {
    //   setOpenSignInInput(true);
    //   setOpenVerifyBtn(true);
    //   let phoneNumber = '+976' + enteredPhone;
    //   generateRecaptcha();
    //   const appVerifier = window.recaptchaVerifier;
    //   signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    //     .then((confirmationResult) => {
    //       window.confirmationResult = confirmationResult;
    //     })
    //     .catch((error) => {
    //       alert(error.message);
    //     });
    // } else alert('Та заавал 8н оронтой тоо оруулна уу!');
  };
  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: (response) => {},
      },
      auth
    );
  };

  // 2. Нэвтрэх Код Баталгаажуулах товчин дээр дарахад ажиллана.
  const verifyOTPHandler = () => {
    setOpenVerifyBtn(false);
    setOTPIsValid(true);

    // if (OTP.length === 6) {
    //   //verify OTP
    //   let confirmationResult = window.confirmationResult;
    //   if (!confirmationResult) {
    //     alert(
    //       'Таны оруулсан код буруу байна. Та утсан дээр ирсэн 6 оронтой кодоо зөв оруулна уу!'
    //     );
    //   } else {
    //     setOpenVerifyBtn(false);
    //     // setOTP(Number(OTP));
    //     // console.log(OTP);
    //     confirmationResult
    //       .confirm(OTP)
    //       .then((result) => {
    //         // User signed in successfully.
    //         setOTPIsValid(true);
    //         alert('Таны оруулсан код зөв байна!');
    //       })
    //       .catch((error) => {
    //         // alert(error.message);
    //         alert('Та кодны хугацаа дууссан байна!');
    //       });
    //   }
    // } else
    //   alert('Та нэвтрэх код огт оруулаагүй байна. 6 оронтой тоо оруулна уу!');
  };
  console.log(OTPIsValid);
  return (
    <div className={classes.login}>
      <header className={classes.header}>
        <h2>Нэвтрэх</h2>
      </header>
      <main>
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
        {openSignInInput && (
          <div
            className={`${classes.control} ${
              OTPIsValid === false ? classes.invalid : ''
            }`}
          >
            <label htmlFor='code'> Нэвтрэх код*</label>
            <input
              type='text'
              id='code'
              value={isNaN(OTP) ? '' : OTP}
              onChange={inputChangeHandler}
              onBlur={verifyOTPHandler}
              disabled={OTPIsValid}
            />
          </div>
        )}
        <div id='recaptcha-container'></div>
        {!openSignInInput && (
          <div className={classes.actions}>
            <button
              type='submit'
              className={classes.button}
              onClick={requestOTP}
              disabled={isLoggedIn}
            >
              Нэвтрэх код утас руу илгээх
            </button>
          </div>
        )}
        {openVerifyBtn && (
          <div className={classes.actions}>
            <button
              type='submit'
              className={classes.button}
              onClick={verifyOTPHandler}
            >
              Нэвтрэх код баталгаажуулах
            </button>
          </div>
        )}

        {OTPIsValid && (
          <div className={classes.actions}>
            <button
              type='submit'
              className={classes.button}
              onClick={submitHandler}
            >
              Нэвтрэх {'>'} Кино сонголт
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Login;
