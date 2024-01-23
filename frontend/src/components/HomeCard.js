import React from 'react';

const HomeCard = ({
  name,
  productImg,
  category,
  description,
  price,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-40 bg-blue-50'>
        <p className=' font-mono text-gray-500'>Loading...</p>
      </div>
    );
  }
  return (
    <div className='bg-blue-50 shadow-md p-2 rounded'>
      <div className='w-40'>
        <img src={productImg} alt={name} className='h-40 w-full' />
      </div>
      <h3 className='font-semibold text-slate-600 text-center ccapitalize text-lg'>
        {name}
      </h3>
      <p className='text-center text-slate-500 font-medium'>{category}</p>
      <p className='text-center text-slate-500 font-bold'>
        <span className='text-blue-500'>#</span>
        <span>{price}</span>
      </p>
    </div>
  );
};

export default HomeCard;
