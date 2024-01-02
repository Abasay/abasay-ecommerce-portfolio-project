import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const productData = useSelector((state) => state.products.productList);

  return (
    <div className='p-2 md:p-4'>
      <div className='md:flex gap-4 py-2'>
        <div className='md:w-1/2'>
          <div className='flex gap-3 bg-slate-200 w-36 px-2 items-center rounded-full'>
            <p className='text-sm font-medium text-slate-500'>Bike Delivery</p>
            <img
              src='https://cdn-icons-png.flaticon.com/512/2972/2972185.png'
              className='h-7'
            />
          </div>
          <h2 className='text-4xl md:text-7xl font-bold py-3'>
            The Fasted Delivery in{' '}
            <span className='text-blue-600 text-'>Your Home</span>
          </h2>
          <p className='py-3 text-base text-justify'>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries.
          </p>
          <button className='font-bold bg-blue-500 text-slate-200 px-4 py-2 rounded-md'>
            Order Now
          </button>
        </div>

        <div className='md:w-1/2 flex flex-wrap gap-5 p-4 justify-center'></div>
      </div>
    </div>
  );
};

export default Home;
