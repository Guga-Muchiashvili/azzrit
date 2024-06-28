import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const VolumeElement = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { stop }] = useSound('/sound.mp3', { loop: true });

  useEffect(() => {
    const savedIsPlaying = localStorage.getItem('isPlaying');
    if (savedIsPlaying === 'true') {
      setIsPlaying(true);
      play();
    }
  }, [play]);

  const toggleSound = () => {
    if (isPlaying) {
      stop();
      localStorage.setItem('isPlaying', 'false');
    } else {
      play();
      localStorage.setItem('isPlaying', 'true');
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return (
    <div className='absolute bottom-5 right-5'>
      {isPlaying ? (
        <FaVolumeUp className='text-4xl cursor-pointer duration-700 transition-all' onClick={toggleSound} />
      ) : (
        <FaVolumeMute className='text-4xl cursor-pointer text-red-500 duration-700 transition-all' onClick={toggleSound} />
      )}
    </div>
  );
};

export default VolumeElement;
