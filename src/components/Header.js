import React, { useState } from 'react';
import logo from '../asset/my-logo-10.png';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { BsCartPlusFill } from 'react-icons/bs';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
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
            <Link to={'/'}>Home</Link>
            <Link to={'menu'}>Menu</Link>
            <Link to={'about'}>About</Link>
            <Link to={'contact'}>Contact</Link>
          </nav>

          <div className='text-2xl text-slate-600 relative'>
            <BsCartPlusFill className='bg-transparent' />
            <div
              className='absolute -top-2 text-sm -right-1 text-white h-4
            text-center w-4 bg-blue-600 rounded-full m-0 p-0'
            >
              0
            </div>
          </div>

          <div className='text-1xl text-slate-600 p-1 rounded-full border-2 border-slate-600 relative'>
            <FaUser
              onClick={() => {
                setShowDropdown((prev) => !prev);
              }}
            />
            {showDropdown && (
              <div className='absolute right-0 mt-7 bg-white px-2 shadow drop-shadow-md'>
                <Link to={'newproduct'}>
                  <p className='whitespace-nowrap cursor-pointer p-1'>
                    New Product
                  </p>
                </Link>

                <Link to={'/login'}>
                  <p className='whitespace-nowrap  p-1'> Login</p>
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
