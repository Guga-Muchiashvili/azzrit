import { useState, useEffect } from 'react';

const useDevice = () => {
  const [deviceType, setDeviceType] = useState('');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let type = '';

      if (width < 768) {
        type = 'mobile';
      } else if (width >= 768 && width < 1024) {
        type = 'tablet';
      } else {
        type = 'desktop';
      }

      setDeviceType(type);
    };

    handleResize(); 

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return deviceType;
};

export default useDevice;