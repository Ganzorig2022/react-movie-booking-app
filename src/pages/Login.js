import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetDataFromFire } from '../hooks/useFirebase';
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { app } from '../firebase.config';
import { usePathNameContext } from '../provider/PathNameContext';
import { useLoggedInContext } from '../provider/LoggedInContext';
import { useLoggedUserDataContext } from '../provider/LoggedUserDataContext';
import LoadingSpinner from '../components/Spinner';
import { toast } from 'react-toastify';
import classes from '../UI/login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [showVerifyBtn, setShowVerifyBtn] = useState(false);
  const [phoneIsValid, setPhoneIsValid] = useState();
  const [OTPIsValid, setOTPIsValid] = useState();
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
      return true;
    } else return false;
  };

  //================Last Step of Login Handler======================================
  const submitHandler = (event) => {
    event.preventDefault();

    if (isLoggedIn) {
      toast.success('Та амжилттай нэвтэрлээ');
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

  //============2. OTP Authentication with Code from Phone Number using FireBase============
  // 2.1. Send OTP code handler when click its button
  const requestOTP = () => {
    const phoneInput = phoneRef.current.value;
    const userPhoneIsValid = validatePhoneHandler(phoneInput);
    const userPhoneIsRegistered = userPhoneIsAvailable();

    if (userPhoneIsValid) {
      setPhoneIsValid(true);
      if (userPhoneIsRegistered) {
        // setShowCodeInput(true);
        // setShowVerifyBtn(true);
        let phoneNumber = '+976' + phoneInput;
        generateRecaptcha();
        setIsLoading(true);
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
          .then((confirmationResult) => {
            // Code sending is successfull.
            window.confirmationResult = confirmationResult;
            setShowVerifyBtn(true);
            setShowCodeInput(true);
            setIsLoading(false);
          })
          .catch((error) => {
            toast.error(error.message);
          });
      } else
        toast.error('Уучлаарай, таны оруулсан утасны дугаар бүртгэлгүй байна!');
    } else {
      setPhoneIsValid(false);
      toast.error('Та заавал 8н оронтой ТОО оруулна уу!');
    }
  };
  // 2.1.1 Generating Recaptcha function
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
    const otpInputIsValid = checkCodeLength(otpInput);
    // setShowVerifyBtn(false);
    // setOTPIsValid(true);
    // setIsLoggedIn(true);

    if (otpInputIsValid) {
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
            setShowVerifyBtn(false);
            setOTPIsValid(true);
            setIsLoggedIn(true);
            resetInputRef(phoneRef, otpRef);
            toast.success('Таны оруулсан код зөв байна!');
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }
    } else setOTPIsValid(false);
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

  //======Reset (empty) Inputs field==========
  const resetInputRef = (phoneRef, otpRef) => {
    phoneRef.current.value = '';
    otpRef.current.value = '';
  };
  //========================RENDERING=====================================
  return (
    <div className={classes.login}>
      <header className={classes.header}>
        <h2>Нэвтрэх</h2>
      </header>

      <main>
        <div
          className={`${classes.control} ${
            phoneIsValid === false
              ? classes.invalid
              : phoneIsValid === true
              ? classes.valid
              : ''
          }`}
        >
          <label htmlFor='password'>Утасны дугаар*</label>
          <input type='phone' ref={phoneRef} disabled={isLoggedIn} />
        </div>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div
            className={`${classes.control} ${
              OTPIsValid === false
                ? classes.invalid
                : OTPIsValid === true
                ? classes.valid
                : ''
            }`}
          >
            <label htmlFor='code'> Нэвтрэх код*</label>
            <input
              type='text'
              ref={otpRef}
              disabled={isLoggedIn || !showCodeInput ? true : false}
            />
          </div>
        )}
        {!showCodeInput && (
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
        {showVerifyBtn && (
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
        <div id='recaptcha-container'></div>
      </main>
    </div>
  );
};

export default Login;
