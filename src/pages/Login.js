import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetDataFromFire } from '../hooks/useFirebase';
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { app } from '../firebase.config';
import { toast } from 'react-toastify';
import { usePathNameContext } from '../provider/PathNameContext';
import { useLoggedInContext } from '../provider/LoggedInContext';
import { useLoggedUserDataContext } from '../provider/LoggedUserDataContext';
import classes from '../UI/login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const [openSignInInput, setOpenSignInInput] = useState(false);
  const [openVerifyBtn, setOpenVerifyBtn] = useState(false);
  const [openLoginBtn, setOpenLoginBtn] = useState(true);
  const [phoneIsValid, setPhoneIsValid] = useState();
  const [OTPIsValid, setOTPIsValid] = useState(false);
  const { loggedUserData, setLoggedUserData } = useLoggedUserDataContext();
  const { pathName, setPathName } = usePathNameContext();
  const { isLoggedIn, setIsLoggedIn } = useLoggedInContext();
  const auth = getAuth(app);
  const phoneRef = useRef();
  const otpRef = useRef();

  //============================================================================
  const { userDataObj } = useGetDataFromFire();

  useEffect(() => {
    getPathName();
  }, []);

  //==========1. Set Pathname for Navbar Active Page Color=======
  const getPathName = () => {
    const path = window.location.pathname;
    setPathName({ ...pathName, login: path, home: '', time: '', seat: '' });
  };

  //=============Validate Phone number====================
  const validatePhoneHandler = (phoneInput) => {
    let phoneRegex = /^[0-9]{8}$/;

    if (phoneInput.trim().length === 8 && phoneRegex.test(phoneInput.trim())) {
      setPhoneIsValid(phoneInput);
      return true;
    } else return false;
  };

  //======================================================
  const submitHandler = (event) => {
    event.preventDefault();
    const userPhoneIsRegistered = userPhoneIsAvailable();

    if (isLoggedIn && userPhoneIsRegistered) {
      toast.success('Та амжилттай нэвтэрлээ');
      setOpenLoginBtn(false);
      navigate('/movie');
    } else {
      toast.error('Та бүртгэлгүй байна!');
    }
  };
  //================Check if user phone is registered in Firestore Databases===================
  const userPhoneIsAvailable = () => {
    const phoneInput = phoneRef.current.value;
    const loggedUserDataArr = userDataObj;
    const result = loggedUserDataArr.find((user) => user.phone === phoneInput);
    if (result) {
      getLoggedUserData();
      return true;
    }
    if (!result) return false;
  };

  //=========if user is available then filter it for loggedUserMODAL window======================
  const getLoggedUserData = () => {
    const phoneInput = phoneRef.current.value;
    const result = userDataObj.filter((user) => user.phone === phoneInput);
    setLoggedUserData(result);
  };

  //============2. Authentication with Code from Phone Number using FireBase============
  // 2.1. Send OTP code handler when click its button
  const requestOTP = () => {
    const phoneInput = phoneRef.current.value;
    const userPhoneIsValid = validatePhoneHandler(phoneInput);
    const userPhoneIsRegistered = userPhoneIsAvailable();

    if (userPhoneIsValid) {
      if (userPhoneIsRegistered) {
        // setOpenSignInInput(true);
        // setOpenVerifyBtn(true);
        let phoneNumber = '+976' + phoneInput;
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
            toast.error(error.message);
          });
      } else
        toast.error('Уучлаарай, таны оруулсан утасны дугаар бүртгэлгүй байна!');
    } else toast.error('Та заавал 8н оронтой ТОО оруулна уу!');
  };

  // 2.1.1
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

  // 2.2 Verify OTP input is valid HANDLER when click the its button=====================
  const verifyOTPHandler = () => {
    const otpInput = otpRef.current.value;

    const OTPInputIsOkay = checkCodeLength(otpInput);
    // setOpenVerifyBtn(false);
    // setOTPIsValid(true);
    // setIsLoggedIn(true);
    // setOpenLoginBtn(false);

    if (OTPInputIsOkay) {
      setOpenVerifyBtn(false);
      setOTPIsValid(true);
      setIsLoggedIn(true);
      let confirmationResult = window.confirmationResult;
      if (!confirmationResult) {
        toast.error(
          'Таны оруулсан код буруу байна. Та утсан дээр ирсэн 6 оронтой кодоо зөв оруулна уу!'
        );
      } else {
        confirmationResult
          .confirm(otpInput)
          .then((result) => {
            // User signed in successfully.
            setOpenVerifyBtn(false);
            setOTPIsValid(true);
            setIsLoggedIn(true);
            toast.success('Таны оруулсан код зөв байна!');
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    }
  };

  // =====================Code Input Checking Helper function====================
  const checkCodeLength = (otpInput) => {
    const cyrillicRegex =
      /^[аАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯ]+$/;
    const codeNumRegex = /^[0-9]+$/;

    if (cyrillicRegex.test(otpInput)) {
      toast.error('Та үсгийн фонтоо ENGLISH болгоно уу!');
      return false;
    } else {
      if (codeNumRegex.test(otpInput)) {
        if (otpInput.length === 6) return true;
        if (otpInput.length < 6 && otpInput.length >= 1) {
          toast.error('Та яг 6н оронтой тоо оруулна уу!');
          return false;
        }
        if (otpInput.length === 0) {
          toast.error('Таны код оруулах хэсэг хоосон байна!');
          return false;
        }
      } else {
        toast.error('Та зөвхөн тоо оруулна уу!');
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
            <input type='phone' ref={phoneRef} />
          </div>
          {openSignInInput && (
            <div
              className={`${classes.control} ${
                OTPIsValid === false ? classes.invalid : ''
              }`}
            >
              <label htmlFor='code'> Нэвтрэх код*</label>
              <input type='text' ref={otpRef} />
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
                Кино сонголт
              </button>
            </div>
          )}
        </main>
      )}
    </div>
  );
};

export default Login;
