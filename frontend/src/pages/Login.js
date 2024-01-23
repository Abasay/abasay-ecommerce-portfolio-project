import React, { useState, useEffect } from 'react';
import signuplogo from '../asset/login-animation.gif';
import { BiSolidShow } from 'react-icons/bi';
import { BiHide } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { toastFunction } from '../utility/toastFunction';
import { useSelector, useDispatch } from 'react-redux';
import { loginRedux } from '../redux/userSlice';
import { RingLoader } from 'react-spinners';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showFocus, setShowFocus] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [formMsg, setFormMsg] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    try {
      if (email && password) {
        setIsLoggingIn(true);
        const fetchLoginData = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/login`,
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(data),
          }
        );

        const loginFetchRes = await fetchLoginData.json();
        setIsLoggingIn(false);
        if (
          loginFetchRes.alert &&
          loginFetchRes.userData.password === data.password
        ) {
          dispatch(loginRedux(loginFetchRes));
          toastFunction('success', 'Successfully logged in');
          localStorage.setItem('user_email', email);
          navigate('/');
        } else {
          toastFunction('error', 'Invalid Login Credentials');
        }
      } else {
        setFormMsg('Please enter a valid email and password credential');
        setTimeout(() => {
          setFormMsg('');
        }, 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(userData);
  }, [dispatch]);
  return (
    <>
      {isLoggingIn && (
        <div className='text-center justify-center mx-auto max-w-md flex flex-row items-center bg-gray-100 my-10 rounded-full px-12 py-2'>
          <RingLoader size={40} color='lightblue' />
          <p className='text-xxl font-medium text-gray-500 pl-3 '>
            Logging you in, please wait a moment.
          </p>
        </div>
      )}
      <div className='p-3 md:p-4 shadow drop-shadow-md'>
        <div className='w-full max-w-sm bg-white m-auto flex items-center flex-col p-4'>
          <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md'>
            <img src={signuplogo} alt='' className='w-full' />
          </div>
          {formMsg && (
            <p className='bg-red-400 italic text-white text-base mt-8 mb-5 p-1 rounded-md'>
              {formMsg}
            </p>
          )}

          <form
            action=''
            className='w-full py-3 flex flex-col'
            onSubmit={handleSubmit}
          >
            <label htmlFor='email' className='text-sm'>
              Email
            </label>
            <input
              type='text'
              id='email'
              name='email'
              className='w-full bg-slate-100 p-1 mt-1 mb-3 rounded-md pl-3 pb-2 focus-within:outline-blue-200'
              value={data.email}
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
            />

            <label htmlFor='password' className='text-sm '>
              Pasword
            </label>
            <div
              className={
                showFocus
                  ? 'bg-slate-100 flex mt-1 p-1 rounded-md border-blue-300 focus-within:outline focus-within:outline-blue-200 mb-3'
                  : 'bg-slate-100 flex mt-1 p-1 rounded-md focus-within:outline focus-within:outline-blue-200 mb-3'
              }
            >
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                name='password'
                onClick={() => {
                  setShowFocus(true);
                }}
                // hidden={showPassword ? true : false}
                className=' w-full bg-slate-100 p-0.5 rounded-md pl-3  outline-none'
                value={data.password}
                onChange={(e) => {
                  setData({ ...data, password: e.target.value });
                }}
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className='mt-1 text-xl'
              >
                {showPassword ? <BiHide /> : <BiSolidShow />}
              </span>
            </div>

            <button
              type='submit'
              className=' w-full max-w-[120px] m-auto bg-blue-200 mt-3 hover:bg-blue-600 hover:text-white hover:transition-all cursor-pointer rounded-full p-2'
            >
              Login
            </button>
          </form>

          <p className='mt-3'>
            Don't have account ? click{' '}
            <Link
              to={'/signup'}
              className='text-blue-300 active:text-red-500 hover:text-red-500'
            >
              here
            </Link>{' '}
            to signup
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
