import React, { useEffect, useState } from 'react';
import signuplogo from '../asset/login-animation.gif';
import { BiSolidShow } from 'react-icons/bi';
import { BiHide } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showFocus, setShowFocus] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showConfirmFocus, setConfirmShowFocus] = useState(false);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formMsg, setFormMsg] = useState('');
  console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = data;

    if (firstName && lastName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        alert('SignUp Successful');
      } else {
        setFormMsg('Password and Confirm Password inputs are not same');
        setTimeout(() => {
          setFormMsg('');
        }, 5000);
      }
    } else {
      setFormMsg('Please fill all the forms to continue');
      setTimeout(() => {
        setFormMsg('');
      }, 5000);
    }
  };

  useEffect(() => {
    setFormMsg(formMsg);
  }, [formMsg]);
  return (
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
          <label htmlFor='firstName' className='text-sm'>
            First Name
          </label>
          <input
            type='text'
            id='firstName'
            name='firstName'
            className='w-full bg-slate-100 p-1 mt-1 mb-3 rounded-md pl-3 pb-2 focus-within:outline-blue-200'
            value={data.firstName}
            onChange={(e) => {
              //This is another way to do it, You can just create a function instead of witing it here
              const { name, value } = e.target;
              setData((prev) => {
                return { ...prev, [name]: value };
              });
            }}
          />

          <label htmlFor='lastName' className='text-sm'>
            Last Name
          </label>
          <input
            type='text'
            id='lastName'
            name='lastName'
            className='w-full bg-slate-100 p-1 mt-1 mb-3 rounded-md pl-3 pb-2 focus-within:outline-blue-200'
            value={data.lastName}
            onChange={(e) => {
              setData({ ...data, lastName: e.target.value });
            }}
          />

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

          <label htmlFor='confirmPassword' className='text-sm'>
            Confirm Pasword
          </label>
          <div
            className={
              showConfirmFocus
                ? 'bg-slate-100 flex mt-1 p-1 rounded-md border-blue-300 focus-within:outline focus-within:outline-blue-200 mb-3'
                : 'bg-slate-100 flex mt-1 p-1 rounded-md focus-within:outline focus-within:outline-blue-200 mb-3'
            }
          >
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id='confirmPassword'
              name='password'
              onClick={() => {
                setConfirmShowFocus(true);
              }}
              // hidden={showPassword ? true : false}
              className=' w-full bg-slate-100 p-0.5 rounded-md pl-3 outline-none'
              value={data.confirmPassword}
              onChange={(e) => {
                setData({ ...data, confirmPassword: e.target.value });
              }}
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className='mt-1 text-xl'
            >
              {showConfirmPassword ? <BiHide /> : <BiSolidShow />}
            </span>
          </div>

          <button
            type='submit'
            className=' w-full max-w-[120px] m-auto bg-blue-200 mt-3 hover:bg-blue-600 hover:text-white hover:transition-all cursor-pointer rounded-full p-2'
          >
            Sign up
          </button>
        </form>

        <p className='mt-3'>
          Already have account ? click{' '}
          <Link
            to={'/login'}
            className='text-blue-300 active:text-red-500 hover:text-red-500'
          >
            here
          </Link>{' '}
          to login
        </p>
      </div>
    </div>
  );
};

export default SignUp;
