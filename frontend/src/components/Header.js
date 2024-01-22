import React, { useEffect, useState } from 'react';
import logo from '../asset/my-logo-10.png';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { BsCartPlusFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { logOutRedux } from '../redux/userSlice';
import { toastFunction } from '../utility/toastFunction';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const productCartItem = useSelector((state) => state.products.cartItem);

  const [showDropdown, setShowDropdown] = useState(false);
  const userData = useSelector((state) => state.user);
  const [cartQuantity, setCartQuantity] = useState(0);

  const navigate = useNavigate();

  console.log(userData);
  console.log(process.env.REACT_APP_ADMIN_EMAIL);
  const [data, setData] = useState(userData);

  const dispatch = useDispatch();
  const handleLogOut = () => {
    setShowDropdown(false);
    dispatch(logOutRedux());
    navigate('/');
    toastFunction('success', 'Successfully logged out');
  };

  const handleLogIn = () => {};

  useEffect(() => {
    setCartQuantity(productCartItem.length);
  }, [productCartItem]);
  return (
    <header className='fixed shadow-md w-full h-20 px-2 md:px-4 z-50 bg-white'>
      {/* desktop */}
      <div className='flex items-center h-full justify-between'>
        <Link to='/'>
          <div className='h-16'>
            <img src={logo} alt='App Logo' className='h-full' />
          </div>
        </Link>

        <div className='flex items-center gap-4 md:gap-7'>
          <nav className='flex gap-4 md:gap-6 text-base md:text-lg'>
            <Link
              to={'/'}
              className='hover:bg-blue-300 hover:text-white p-1 transition-all rounded-lg'
            >
              Home
            </Link>
            {/* <Link
              to={'cart'}
              className='hover:bg-blue-300 hover:text-white p-1 transition-all rounded-lg'
            >
              Cart
            </Link> */}
            <Link
              to={'about'}
              className='hover:bg-blue-300 hover:text-white p-1 transition-all rounded-lg'
            >
              About
            </Link>
            <Link
              to={'contact'}
              className='hover:bg-blue-300 hover:text-white p-1 transition-all rounded-lg'
            >
              Contact
            </Link>
          </nav>
          <Link to={'/cart'}>
            <div className='text-2xl text-slate-600 relative'>
              <BsCartPlusFill className='bg-transparent' />
              <div
                className='absolute -top-2 text-sm -right-1 text-white h-4
            text-center w-4 bg-blue-600 rounded-full m-0 p-0'
              >
                {userData.email ? cartQuantity : 0}
              </div>
            </div>
          </Link>

          <div className='text-1xl text-slate-600 p-1 rounded-full border-2 relative'>
            {userData.imgUrl ? (
              <img
                src={userData.imgUrl}
                alt='user pic'
                onClick={() => {
                  setShowDropdown((prev) => !prev);
                }}
                className='w-12 h-12 rounded-full'
              />
            ) : (
              <FaUser
                onClick={() => {
                  setShowDropdown((prev) => !prev);
                }}
              />
            )}
            {showDropdown && (
              <div className='absolute right-0 mt-4 bg-white px-2 shadow drop-shadow-md'>
                {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                  <Link to={'newproduct'}>
                    <p className='whitespace-nowrap p-1 hover:bg-blue-300 hover:text-white w-full mb-1 rounded-md'>
                      New Product
                    </p>
                  </Link>
                )}

                <Link
                  to={userData.imgUrl ? '' : '/login'}
                  onClick={() => {
                    userData.imgUrl ? handleLogOut() : handleLogIn();
                    setShowDropdown(false);
                  }}
                >
                  <p className='whitespace-nowrap  p-1 hover:bg-blue-300 hover:text-white w-full mb-1 rounded-md'>
                    {' '}
                    {userData.imgUrl ? 'Logout' : 'Login'}
                  </p>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
    </header>
  );
};

export default Header;
