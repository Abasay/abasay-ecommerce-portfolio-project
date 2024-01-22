import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setProducts } from './redux/productSlice';

function App() {
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.products);
  console.log(productsData);

  useEffect(() => {
    (async () => {
      try {
        const productRequest = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/products`
        );
        const prodResponse = await productRequest.json();
        console.log(prodResponse);

        dispatch(setProducts(prodResponse));
        console.log(productsData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className='relative'>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <Header />
      <main className='pt-20 bg-slate-50 min-h-[calc(100vh)]'>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
