import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CardFeature from './CardFeature';

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

  const [productByCategory, setProductByCategory] = useState([...productData]);
  const filterProductByCategory = (category) => {
    const productCategory = productData.filter((product) =>
      category === 'all' ? productData : product.category === category
    );
    setProductByCategory([...productCategory]);
  };
  return (
    <div className='my-5'>
      <h2 className='font-bold text-2xl text-slate-800 mb-4'>All Products</h2>
      <div className='flex gap-4 justify-center overflow-auto scrollbar-none '>
        {categoryList.map((category, idx) => {
          return (
            <div
              key={idx}
              onClick={() => {
                setIsActive(idx);
                filterProductByCategory(category);
                console.log(idx);
              }}
              className={`capitalize mx-4 rounded-lg transition-all text-slate-200  px-3 ${
                isActive === idx ? 'bg-yellow-600' : 'bg-blue-500'
              }`}
            >
              {category}
            </div>
          );
        })}
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
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
