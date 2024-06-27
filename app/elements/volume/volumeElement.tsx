import React, { useState } from 'react';
import useSound from 'use-sound';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const VolumeElement = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { stop }] = useSound('/sound.mp3', { loop: true })

  const toggleSound = () => {
    if (isPlaying) {
      stop();
    } else {
      play();
    }
    setIsPlaying(!isPlaying);
  };

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
