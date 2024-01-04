import React from 'react';

const CardFeature = ({
  name,
  productImg,
  category,
  description,
  price,
  isLoading,
}) => {
  return (
    <div className='w-full min-w-[200px] max-w-[200px] bg-white hover:shadow-lg py-5 px-4 cursor-pointer flex flex-col'>
      <div className='h-28 flex flex-col justify-center items-center'>
        <img src={productImg} alt={name} className='h-full' />
      </div>
      <h3 className='font-semibold text-slate-600 capitalize txt-lg mt-4 overflow-hidden '>
        {name}
      </h3>
      <p className='text-slate-500'>{category}</p>
      <p className='font-bold'>
        <span className='text-blue-500'>#</span>
        <span>{price}</span>
      </p>
    </div>
  );
};

export default CardFeature;
