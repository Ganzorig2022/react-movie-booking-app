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
  const [openLoginBtn, setOpenLoginBtn] = useState(true);
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
    getData();
  }, []);

  // ==============1. Firestore-oos loggedUserData awah=====================
  const getData = async () => {
    const data = await getDataFromFireStore();
    setLoggedUserData([...data.userData]);
  };

  // =============2.Handler functions==========================
  const inputChangeHandler = (event) => {
    const { id, value } = event.target;
    if (id === 'phone') setEnteredPhone(value);
    if (id === 'code') setOTP(value);
  };

  const validatePhoneHandler = () => {
    let phoneRegex = /^[0-9]{8}$/;

    if (
      enteredPhone.trim().length === 8 &&
      phoneRegex.test(enteredPhone.trim())
    ) {
      setPhoneIsValid(enteredPhone);
      return true;
    } else return false;

    // setPhoneIsValid(
    //   enteredPhone.trim().length === 8 && phoneRegex.test(enteredPhone.trim())
    // );
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const userPhoneIsRegistered = userPhoneIsAvailable();

    if (isLoggedIn && userPhoneIsRegistered) {
      alert('Та амжилттай нэвтэрлээ');
      navigate('/movie');
    } else {
      alert('Та бүртгэлгүй байна!');
    }
  };
  //================Check if user phone is registered===================
  const userPhoneIsAvailable = () => {
    const result = loggedUserData.find((user) => user.phone === enteredPhone);
    if (result) return true;
    if (!result) return false;
  };

  //============Authentication with Code from Phone Number using FireBase============
  // 1.Нэвтрэх код илгээх товчин дээр дарахад ажиллана.
  const requestOTP = () => {
    const userPhoneIsValid = validatePhoneHandler();
    const userPhoneIsRegistered = userPhoneIsAvailable();

    if (userPhoneIsValid) {
      if (userPhoneIsRegistered) {
        // setOpenSignInInput(true);
        // setOpenVerifyBtn(true);
        let phoneNumber = '+976' + enteredPhone;
        generateRecaptcha();
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
          .then((confirmationResult) => {
            // Code sending is successfull.
            window.confirmationResult = confirmationResult;
            setOpenSignInInput(true);
            setOpenVerifyBtn(true);
          })
          .catch((error) => {
            alert(error.message);
          });
      } else alert('Уучлаарай, таны оруулсан утасны дугаар бүртгэлгүй байна!');
    } else alert('Та заавал 8н оронтой ТОО оруулна уу!');
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

  // ===========2. Нэвтрэх Код Баталгаажуулах товчин дээр дарахад ажиллана.
  const verifyOTPHandler = () => {
    const OTPInputIsOkay = checkCodeLength();

    if (OTPInputIsOkay) {
      // setOpenVerifyBtn(false);
      // setOTPIsValid(true);
      // setIsLoggedIn(true);
      let confirmationResult = window.confirmationResult;
      if (!confirmationResult) {
        alert(
          'Таны оруулсан код буруу байна. Та утсан дээр ирсэн 6 оронтой кодоо зөв оруулна уу!'
        );
      } else {
        confirmationResult
          .confirm(OTP)
          .then((result) => {
            // User signed in successfully.
            setOpenVerifyBtn(false);
            setOTPIsValid(true);
            setIsLoggedIn(true);
            setOpenLoginBtn(false);
            alert('Таны оруулсан код зөв байна!');
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    }
  };

  // =====================Code Input Checking Helper function====================
  const checkCodeLength = () => {
    const cyrillicRegex =
      /^[аАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯ]+$/;
    const codeNumRegex = /^[0-9]+$/;

    if (cyrillicRegex.test(OTP)) {
      alert('Та үсгийн фонтоо ENGLISH болгоно уу!');
      return false;
    } else {
      if (codeNumRegex.test(OTP)) {
        if (OTP.length === 6) return true;
        if (OTP.length < 6 && OTP.length >= 1) {
          alert('Та яг 6н оронтой тоо оруулна уу!');
          return false;
        }
        if (OTP.length === 0) {
          alert('Таны код оруулах хэсэг хоосон байна!');
          return false;
        }
      } else {
        alert('Та зөвхөн тоо оруулна уу!');
        return false;
      }
    }
  };
  return (
    <div className={classes.login}>
      <header className={classes.header}>
        <h2>Нэвтрэх</h2>
      </header>
      {openLoginBtn && (
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
                value={OTP}
                onChange={inputChangeHandler}
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
      )}
    </div>
  );
};

export default Login;
