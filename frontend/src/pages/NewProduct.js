import React, { useEffect, useState } from 'react';
import { BsCloudUpload } from 'react-icons/bs';
import { ImageToBase64 } from '../utility/imageToBase64';
import { toastFunction } from '../utility/toastFunction';

const initialState = {
  name: '',
  category: '',
  productImg: '',
  price: '',
  description: '',
};
const NewProduct = () => {
  const [productData, setProductData] = useState(initialState);
  const upLoadImage = async (e) => {
    const image = await ImageToBase64(e.target.files[0]);
    setProductData((prev) => {
      return { ...prev, productImg: image };
    });
  };

  const inputOnChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(productData);

    const { name, productImg, category, description, price } = productData;

    try {
      if (
        name &&
        productImg &&
        category !== 'none' &&
        category !== '' &&
        description &&
        price
      ) {
        const uploadProduct = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/upload-product`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
          }
        );

        const uploadProdRes = await uploadProduct.json();
        console.log(uploadProdRes);
        // if (uploadProdRes.status === 200) {
        // }
        toastFunction('success', 'Product successfully uploaded');
        setProductData(() => {
          return {
            name: '',
            category: '',
            productImg: '',
            price: '',
            description: '',
          };
        });
      } else {
        if (category === 'none' || category === '') {
          toastFunction('warning', 'please select a valid category');
        } else {
          toastFunction('warning', 'Please fill up the required fields!!!');
        }
      }
    } catch (error) {
      toastFunction(
        'error',
        'Failed to Upload, please check your internet connectivity!!!'
      );
    }
  };

  // useEffect(() => {
  //   setProductData((prev) => prev);
  // }, []);
  return (
    <div className='mt-5'>
      <form
        action=''
        onSubmit={handleSubmit}
        className=' p-4 m-auto w-full max-w-md shadow drop-shadow-lg flex flex-col h-full rounded-md'
      >
        <label htmlFor='name' className=''>
          Name:{' '}
        </label>
        <input
          type='text'
          name='name'
          value={productData.name}
          className='w-full bg-slate-100 p-1 mt-1 mb-3 rounded-md pl-3 pb-2 focus-within:outline-blue-200'
          onChange={inputOnChange}
        />

        <label htmlFor='category'>Category:</label>
        <select
          name='category'
          id='category'
          value={productData.category}
          onChange={inputOnChange}
          className='w-full bg-slate-100 p-1 mt-1 mb-3 rounded-md pl-3 pb-2 focus-within:outline-blue-200'
        >
          <option value='none' className='hover:text-blue-200'>
            select a category
          </option>
          <option value='fruit' className='hover:text-blue-200'>
            Fruit
          </option>
          <option value='vegetable'>Vegetable</option>
          <option value='pizza'>Pizza</option>
          <option value='icecream'>IceCream</option>
          <option value='cookies'>Cookies</option>

          <option value='rice'>Rice</option>
          <option value='cake'>Cake</option>
          <option value='others' className='hover:text-blue-200'>
            Others
          </option>
        </select>

        <label htmlFor='productImg' className='mb-1 mt-2'>
          <p className='mb-2'>Product Image: </p>
          {productData.productImg ? (
            <img
              src={productData.productImg}
              alt=''
              className='w-full h-60 rounded-md '
            />
          ) : (
            <div className='h-40 bg-slate-200 mt-1 flex justify-center items-center flex-col'>
              <span className='text-xl'>
                <BsCloudUpload size={40} />
              </span>

              <p className='text-xl'>Upload Image</p>
            </div>
          )}

          <input
            type='file'
            name='productImg'
            accept='image/*'
            id='productImg'
            className='hidden'
            onChange={upLoadImage}
          />
        </label>

        <label htmlFor='price' className='mt-3'>
          Price:{' '}
        </label>
        <input
          type='text'
          name='price'
          id='price'
          value={productData.price}
          onChange={inputOnChange}
          className='w-full bg-slate-100 p-1 mt-1 mb-3 rounded-md pl-3 pb-2 focus-within:outline-blue-200'
        />
        <label htmlFor='description'>Description:</label>
        <textarea
          name='description'
          id=''
          cols='3'
          rows='6'
          value={productData.description}
          onChange={inputOnChange}
          className='w-full bg-slate-100 p-1 mt-1 mb-3 rounded-md pl-3 pb-2 focus-within:outline-blue-200'
        ></textarea>

        <button
          type='submit'
          className='w-full  m-auto bg-blue-200 mt-3 mb-4 hover:bg-blue-600 hover:text-white hover:transition-all cursor-pointer rounded-full p-2'
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
