import React from 'react';
import { addCartItem } from '../redux/productSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toastFunction } from '../utility/toastFunction';
import { useSelector } from 'react-redux';
import { uploadToCart } from '../utility/uploadProductToCart';

const CardFeature = ({
  name,
  productImg,
  category,
  description,
  price,
  isLoading,
  prod_id,
}) => {
  //const username = Cookies.get('username')
  const user_email = localStorage.getItem('user_email');
  const userData = useSelector((state) => state.user);
  const addToCart = async () => {
    const request = await fetch('http:8080/add-to-cart', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        user_email: user_email,
        prodInfo: { name, productImg, category, description, price },
      }),
    });

    const response = await request.json();
    console.log(response);
  };
  const dispatch = useDispatch();

  const handleAddCartProduct = async (e) => {
    if (userData.email && userData.imgUrl) {
      const upload = await uploadToCart(
        userData.email,
        name,
        category,
        productImg,
        price,
        description,
        prod_id
      );
      if (upload.success) {
        dispatch(
          addCartItem({
            _id: prod_id,
            name: name,
            price: price,
            category: category,
            image: productImg,
          })
        );
      } else {
        toastFunction('error', 'Failed to add item to cart');
      }
    } else {
      toastFunction('error', 'Please log in to add items to your cart!!!');
    }
  };

  return (
    <>
      {name ? (
        <Link
          to={`/menu/${prod_id}`}
          onClick={() => window.scrollTo({ top: '0', behavior: 'smooth' })}
        >
          <div className='w-full h-auto min-w-[200px] max-h-80 max-w-[200px] bg-blue-50 hover:shadow-lg py-5 px-4 cursor-pointer flex flex-col'>
            <div className='h-40 flex flex-col justify-center items-center'>
              <img src={productImg} alt={name} className='h-full' />
            </div>
            <h3 className='font-semibold text-slate-600 capitalize txt-lg mt-3 overflow-hidden '>
              {name}
            </h3>
            <p className='text-slate-500 '>{category}</p>
            <p className='font-bold'>
              <span className='text-blue-800'>#</span>
              <span className='text-blue-600'>{price}</span>
            </p>
            <button
              className='bg-blue-500 text-white py-1 mt-2 rounded hover:bg-blue-700 hover:text-black transition-all'
              onClick={() => {
                console.log(`Adding this product ${prod_id} to cart`);
                handleAddCartProduct();
              }}
            >
              Add To Cart
            </button>
          </div>
        </Link>
      ) : (
        <div className='font-medium text-gray-500'>Loading...</div>
      )}
    </>
  );
};

export default CardFeature;
