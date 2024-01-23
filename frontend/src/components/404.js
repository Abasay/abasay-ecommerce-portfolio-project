import React from 'react';
import Header from './Header';
import Footer from './Footer';

const ErrorBoundary = () => {
  return (
    <>
      <Header />
      <div className='pt-20'>ErrorBoundary</div>
      <Footer />
    </>
  );
};

export default ErrorBoundary;
