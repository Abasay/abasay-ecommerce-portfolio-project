import React from 'react';
import signuplogo from '../asset/login-animation.gif';
import { BiSolidShow } from 'react-icons/bi';
import { BiHide } from 'react-icons/bi';

const SignUp = () => {
  return (
    <div className='p-3 md:p-4'>
      <div className='w-full max-w-sm bg-white m-auto flex items-center flex-col p-4'>
        <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md'>
          <img src={signuplogo} alt='' className='w-full' />
        </div>

        <form action='' className='w-full py-3'>
          <label htmlFor='firstName' className='text-sm'>
            First Name
          </label>
          <input
            type='text'
            id='firstName'
            name='firstName'
            className='w-full bg-slate-100 p-1 mt-1 mb-3 rounded-md pl-3 pb-2'
          />

          <label htmlFor='lastName' className='text-sm'>
            Last Name
          </label>
          <input
            type='text'
            id='lastName'
            name='lastName'
            className='w-full bg-slate-100 p-1 mt-1 mb-3 rounded-md pl-3 pb-2'
          />

          <label htmlFor='email' className='text-sm'>
            Email
          </label>
          <input
            type='text'
            id='email'
            name='email'
            className='w-full bg-slate-100 p-1 mt-1 mb-3 rounded-md pl-3 pb-2'
          />

          <label htmlFor='password' className='text-sm'>
            Pasword
          </label>
          <input
            type='password'
            id='password'
            name='password'
            className=' w-full bg-slate-100 p-1 mt-1 mb-3 rounded-md pl-3 pb-2'
          />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
