import React from 'react';
import { toast } from 'react-toastify';

export const toastFunction = (type, msg, position) => {
  toast[`${type}`](msg, {
    position: position || 'top-center',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    // pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

  return true;
};
