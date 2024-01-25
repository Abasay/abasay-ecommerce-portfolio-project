import React, { useState, useEffect } from 'react';
import { ImageToBase64 } from '../utility/imageToBase64';
import signuplogo from '../asset/login-animation.gif';
import { BiSolidShow } from 'react-icons/bi';
import { BiHide } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Profile = () => {
  const userData = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [showFocus, setShowFocus] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showConfirmFocus, setConfirmShowFocus] = useState(false);
  const [data, setData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    password: userData.password,
    confirmPassword: userData.confirmPassword,
    imgUrl: userData.imgUrl,
  });
  const [hide, setHide] = useState(true);

  const navigate = useNavigate();

  const handleImgUpload = async (e) => {
    console.log(e.target.files[0]);
    const data = await ImageToBase64(e.target.files[0]);
    setData((prev) => {
      return { ...prev, imgUrl: data };
    });

    console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  if (!userData.imgUrl && !userData.name) {
    window.location.href = '/login';
    // return navigate('/login');
  }

  return (
    <div className='mt-8'>
      <div className='my-6 max-w-md mx-auto text-center flex items-center flex-col'>
        <h1 className='text-4xl text-slate-500 italic my-2'>Your Profile</h1>
        <div className=' border w-12 border-4 rounded-full border-blue-400'></div>
      </div>
      <div className='p-3 md:p-4 shadow drop-shadow-md max-w-[900px] mx-auto  grid grid-cols-2 gap-4 p-4'>
        <div className='w-64 h-64 overflow-hidden mt-12 rounded-full drop-shadow-md shadow-md relative cursor-pointer'>
          <img
            src={data.imgUrl ? data.imgUrl : signuplogo}
            alt=''
            className='w-full h-full'
          />
          <label htmlFor='profileImg'>
            <div className='absolute bottom-0 text-sm h-1/3 bg-blue-200 w-full text-center bg-opacity-50'>
              <p className='p-1 text-gray-600 font-medium italic'>Upload</p>
            </div>
            <input
              type='file'
              name='profileImg'
              id='profileImg'
              accept='image/*'
              onChange={handleImgUpload}
              className='hidden'
            />
          </label>
        </div>
        <div className='w-full bg-white m-auto  p-2'>
          <div>
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
                disabled={hide && true}
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
                disabled={hide && true}
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
                disabled={hide && true}
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
                  disabled={hide && true}
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
                Save Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
