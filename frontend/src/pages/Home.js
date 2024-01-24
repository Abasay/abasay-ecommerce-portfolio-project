import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import HomeCard from '../components/HomeCard';
import CardFeature from '../components/CardFeature';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import AllProducts from '../components/AllProducts';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const productData = useSelector((state) => state.products.productList);
  const homeProductList = productData.slice(0, 4);
  const navigate = useNavigate();

  const homeProductVegetableList = productData.filter(
    (prod) => prod.category === 'vegetable'
  );

  const homeProductFruitList = productData.filter(
    (prod) => prod.category === 'fruit'
  );

  const homeProductIceCreamList = productData.filter(
    (prod) => prod.category === 'icecream'
  );
  const dummyArray = new Array(4).fill(null);
  const dummyArray1 = new Array(10).fill(null);

  const slideRef = useRef();
  const slideRefFruit = useRef();
  const slideRefIce = useRef();
  const slideToLeft = () => {
    slideRef.current.scrollLeft += 200;
  };
  const slideToRight = () => {
    slideRef.current.scrollLeft -= 200;
  };

  const slideFruitToLeft = () => {
    slideRefFruit.current.scrollLeft += 200;
  };
  const slideFruitToRight = () => {
    slideRefFruit.current.scrollLeft -= 200;
  };

  const slideIceToLeft = () => {
    slideRefIce.current.scrollLeft += 200;
  };
  const slideIceToRight = () => {
    slideRefIce.current.scrollLeft -= 200;
  };

  return (
    <div className='p-2 md:p-4'>
      <div className='md:flex gap-4 py-2'>
        <div className='md:w-1/2 mb-10'>
          <div className='flex gap-3 bg-slate-200 w-36 px-2 items-center rounded-full'>
            <p className='text-sm font-medium text-slate-500'>Bike Delivery</p>
            <img
              src='https://cdn-icons-png.flaticon.com/512/2972/2972185.png'
              className='h-7'
            />
          </div>
          <h2 className='text-4xl md:text-7xl font-bold py-3'>
            The Fastest <br /> Delivery in <br />
            <span className='text-blue-600 text-'>Your HomeTown</span>
          </h2>
          <p className='py-3 text-base text-justify font-medium'>
            This is an ecommerce web app, designed to ease you the stress of
            going around just to get your vegetables, fruits, and other
            delicacies of your choice. Let's take that burden off you, with us
            your fridges and freezers will never be empty of what you want.
          </p>
          <button
            onClick={() => navigate('/catalog')}
            className='font-bold bg-blue-500 text-slate-200 px-4 py-2 rounded-md'
          >
            Order Now
          </button>
        </div>

        <div className='md:w-1/2 flex flex-wrap gap-5 p-4 justify-center'>
          {homeProductList[0]
            ? homeProductList.map((prod) => {
                return (
                  <HomeCard
                    key={`homeProduct-${prod._id}`}
                    name={prod.name}
                    description={prod.description}
                    productImg={prod.productImg}
                    category={prod.category}
                    price={prod.price}
                  />
                );
              })
            : dummyArray.map((elem, idx) => {
                return <HomeCard key={idx} isLoading={true} />;
              })}
        </div>
      </div>
      <div className=''>
        <div className='flex w-full items-center mb-10'>
          <h2 className='font-bold text-2xl text-slate-800 mb-4'>
            Fresh Vegetables
          </h2>
          <div className='mx-6'>
            <button
              className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'
              onClick={slideToLeft}
            >
              <BsArrowLeft />
            </button>
          </div>
          <div
            className=' flex gap-5 overflow-auto scrollbar-none scroll-smooth transition-all'
            ref={slideRef}
          >
            {homeProductVegetableList[0]
              ? homeProductVegetableList.map((prod) => {
                  return (
                    <CardFeature
                      key={`vegetable-${prod._id}`}
                      prod_id={prod._id}
                      name={prod.name}
                      description={prod.description}
                      productImg={prod.productImg}
                      category={prod.category}
                      price={prod.price}
                    />
                  );
                })
              : dummyArray1.map((elem, idx) => {
                  return (
                    <CardFeature
                      key={idx + 'vegetableLoading'}
                      isLoading={true}
                    />
                  );
                })}
          </div>
          <div className='mx-6'>
            <button
              className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'
              onClick={slideToRight}
            >
              <BsArrowRight />
            </button>
          </div>
        </div>
        <div className='flex w-full items-center mb-10'>
          <h2 className='font-bold text-2xl text-slate-800 mb-4'>
            Fresh Fruits
          </h2>
          <div className='mx-6'>
            <button
              className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'
              onClick={slideFruitToLeft}
            >
              <BsArrowLeft />
            </button>
          </div>
          <div
            className=' flex gap-5 overflow-auto scrollbar-none scroll-smooth transition-all'
            ref={slideRefFruit}
          >
            {homeProductFruitList[0]
              ? homeProductFruitList.map((prod) => {
                  return (
                    <CardFeature
                      key={`fruit-${prod._id}`}
                      prod_id={prod._id}
                      name={prod.name}
                      description={prod.description}
                      productImg={prod.productImg}
                      category={prod.category}
                      price={prod.price}
                    />
                  );
                })
              : dummyArray1.map((elem, idx) => {
                  return (
                    <CardFeature key={idx + 'fruitLoading'} isLoading={true} />
                  );
                })}
          </div>
          <div className='mx-6'>
            <button
              className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'
              onClick={slideFruitToRight}
            >
              <BsArrowRight />
            </button>
          </div>
        </div>
        <div className='flex w-full items-center mb-10'>
          <h2 className='font-bold text-2xl text-slate-800 mb-4'>
            Frozen IceCream
          </h2>
          <div className='mx-6'>
            <button
              className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'
              onClick={slideIceToLeft}
            >
              <BsArrowLeft />
            </button>
          </div>
          <div
            className=' flex gap-5 overflow-auto scrollbar-none scroll-smooth transition-all'
            ref={slideRefIce}
          >
            {homeProductIceCreamList[0]
              ? homeProductIceCreamList.map((prod) => {
                  return (
                    <CardFeature
                      key={`icecream-${prod._id}`}
                      prod_id={prod._id}
                      name={prod.name}
                      description={prod.description}
                      productImg={prod.productImg}
                      category={prod.category}
                      price={prod.price}
                    />
                  );
                })
              : dummyArray1.map((elem, idx) => {
                  return (
                    <CardFeature
                      key={idx + 'icecreamLoading'}
                      isLoading={true}
                    />
                  );
                })}
          </div>
          <div className='mx-6'>
            <button
              className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'
              onClick={slideIceToRight}
            >
              <BsArrowRight />
            </button>
          </div>
        </div>
        {/* <div className='mt-10'>
          <AllProducts />
        </div> */}
      </div>
    </div>
  );
};

export default Home;
