import React from 'react';
import Header from './Header';
import Footer from './Footer';

const ErrorBoundary = () => {
  return (
    <>
      <div className='pt-20'>
        <div style={styles.container}>
          <h1 style={styles.heading}>Oops! Something went wrong.</h1>
          <p style={styles.message}>We apologize for the inconvenience.</p>
          <div style={styles.errorDetails} className='w-100'>
            <pre>
              The page you are trying to access doesn't exist please peruse the
              nav bars.
            </pre>
          </div>
          <p style={styles.suggestion}>
            Please try again later or contact support if the issue persists. We
            are always open to be contacted.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};
const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  heading: {
    fontSize: '24px',
    color: '#ff6347', // Tomato color
  },
  message: {
    fontSize: '16px',
    marginTop: '10px',
  },
  errorDetails: {
    backgroundColor: '#f8d7da', // Light red background
    padding: '10px',
    borderRadius: '5px',
    marginTop: '15px',
  },
  suggestion: {
    fontSize: '14px',
    marginTop: '15px',
    color: '#6c757d', // Secondary text color
  },
};

export default ErrorBoundary;
