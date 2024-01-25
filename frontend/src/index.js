import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Contact from './pages/Contact';
import About from './pages/About';
import Login from './pages/Login';
import NewProduct from './pages/NewProduct';
import SignUp from './pages/SignUp';
import { Provider } from 'react-redux';
import { store } from './redux/index';
import Cart from './pages/Cart';
import ErrorBoundary from './components/404';
import Catalog from './pages/Catalog';
import Profile from './pages/Profile';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
      <Route path='menu/:filterby' element={<Menu />} />
      <Route path='cart' element={<Cart />} />
      <Route path='contact' element={<Contact />} />
      <Route path='about' element={<About />} />
      <Route path='login' element={<Login />} />
      <Route path='newproduct' element={<NewProduct />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='catalog' element={<Catalog />} />
      <Route path='profile' element={<Profile />} />

      <Route path='*' element={<ErrorBoundary />} />
    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
