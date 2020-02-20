import { useEffect } from 'react';

const CheckKeyEvent = handleEvent => {
  useEffect(() => {
    document.addEventListener('keydown', handleEvent);
    return () => {
      document.removeEventListener('keydown', handleEvent);
    };
  });
};

export default CheckKeyEvent;
