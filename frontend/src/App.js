import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addCartItem, initialCart, setProducts } from './redux/productSlice';
import Footer from './components/Footer';
import ErrorBoundary from './components/404';

function App() {
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.products);
  const userData = useSelector((state) => state.user);

  const email = localStorage.getItem('user_email');

  useEffect(() => {
    (async () => {
      try {
        const productRequest = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/products`
        );
        const prodResponse = await productRequest.json();

        dispatch(setProducts(prodResponse));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      try {
        const requestCart = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/get-cart`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          }
        );
        const cartResponse = await requestCart.json();
        if (cartResponse.success) {
          dispatch(addCartItem(cartResponse.data));
        }
        console.log(cartResponse);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [email, dispatch]);

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
      <Footer />
    </div>
  );
}

export default App;
