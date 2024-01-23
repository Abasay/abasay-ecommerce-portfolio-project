import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CardFeature from './CardFeature';
import { IoChevronBackCircleOutline } from 'react-icons/io5';

export const categoryList = [
  'all',
  'fruit',
  'vegetable',
  'pizza',
  'icecream',
  'cookies',
  'rice',
  'cake',
  'others',
];
const AllProducts = () => {
  const [isActive, setIsActive] = useState(0);
  const productData = useSelector((state) => state.products.productList);
  const [searchWord, setSearchWord] = useState('');
  const [search, setSearch] = useState(false);
  const [searchRes, setSearchRes] = useState(true);

  const [productByCategory, setProductByCategory] = useState([...productData]);

  const [category, setCategory] = useState('all');
  const filterProductByCategory = (category) => {
    const productCategory = productData.filter((product) =>
      category === 'all' ? productData : product.category === category
    );
    setProductByCategory([...productCategory]);
  };
  console.log(category);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    const searchResult = productData
      .map((product) => {
        if (
          product.name.includes(searchWord) ||
          product.category.includes(searchWord) ||
          product.price.includes(searchWord)
        ) {
          return product;
        }
        return null;
      })
      .filter((prod) => prod !== null);
    // setSearched(true)
    if (searchResult?.length > 0) {
      setSearchRes(true);
    } else {
      setSearchRes(false);
    }
    setProductByCategory([...searchResult]);
    console.log(searchResult);
  };
  useEffect(() => {
    filterProductByCategory(category);
    // setProductByCategory(productByCategory);
  }, [category]);

  // useEffect(() => {
  //   setProductByCategory(productByCategory);
  // }, [category, productByCategory, productData]);
  return (
    <div className='my-5 mx-4'>
      <div className=''>
        <h2 className='font-bold text-4xl w-full text-center text-slate-600 italic mx-auto mb-4'>
          Our Catalog
        </h2>
        <div className='border border-4 w-20 mx-auto border-blue-400'></div>
      </div>

      <div className='flex flex-row justify-between items-center my-8 '>
        <div className='pl-3 mt-3 text-3xl text-slate-600 italic font-medium uppercase'>
          <h3>
            {search ? (
              <p className='flex flex-row items-center gap-2'>
                <button
                  onClick={() => {
                    setSearch(false);
                    setSearchWord('');
                    setSearchRes(true);
                    filterProductByCategory('all');
                  }}
                >
                  <IoChevronBackCircleOutline size={25} />
                </button>
                Search Results for:{' '}
                <span className='text-xl italic '>{searchWord}</span>
              </p>
            ) : (
              category
            )}
          </h3>
        </div>

        <div className='flex flex-row gap-4 items-center'>
          <form action='' className='mt-3' onSubmit={handleSubmit}>
            <div className='flex fex-row items-center gap-2'>
              <span className='text-2xl text-slate-500 font-medium'>
                Search:{' '}
              </span>
              <input
                type='search'
                placeholder='Name, Category or Price'
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
                className='w- text-blue-400 font-medium transition-all p-1 bg-gray-100 mt-1 mb-3 rounded-md pl-3 pb-2 focus-within:outline-none border-b-4  border-blue-500 '
              />
            </div>
          </form>
          <p className='text-slate-500 text-2xl font-medium'>Sort by:</p>
          <select
            name='category'
            id='category'
            disabled={search && true}
            className='w-32 capitalize text-xl font-medium text-gray-500 bg-slate-200 mt-1 p-1 rounded-md pl-3 pb-2 focus-within:outline-blue-300'
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            {categoryList.map((cat, idx) => {
              return (
                <option key={idx} value={cat} className='capitalize'>
                  {cat}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className='flex flex-wrap justify-center gap-4 my-4'>
        {productByCategory[0] ? (
          productByCategory.map((prod) => {
            return (
              <CardFeature
                key={`allProd-${prod._id}`}
                prod_id={prod._id}
                name={prod.name}
                description={prod.description}
                productImg={prod.productImg}
                category={prod.category}
                price={prod.price}
              />
            );
          })
        ) : (
          <div className='font-medium text-gray-500 text-2xl my-20 '>
            {!searchRes ? 'No result' : 'Loading... '}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
