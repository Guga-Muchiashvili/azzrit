'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Ensure correct import from 'next/navigation'
import './landingStyle.scss';
import Link from 'next/link';
import background from '../assets/bg.jpg'
import {motion} from 'framer-motion'
import { landingTexts } from '../additional/texts';
// import track from '../assets/sound.mp3'
import useSound from 'use-sound';


const Page = () => {
  // console.log(track)
  // const [play] = useSound(track)
  

  return (
    <div
      className="backgroundImageDiv flex flex-col justify-center items-center gap-12"
      style={{
        backgroundImage: `url('${background.src}')`,
        width: '100%',
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <motion.div className='w-fit px-8 gap-12 absolute flex flex-col h-2/3 text-left bottom-0 left-0 font-oswalid font-extrabold' >
          {Object.entries(landingTexts).map((item, i) => (
          <motion.h1 
          id='landing-txt'
          initial={{ opacity: 0, translateX: -1000 }} 
          animate={{ opacity: 1, translateX: i * 40 }} 
          transition={{ duration: 1, delay: i * .1, ease : "easeIn" }} 
          className="text-red-600 text-9xl font-bold cursor-pointer hover:text-white duration-700 hover:text-[145px]"
        >
        <Link href={`/${item[1]}`}>
          {item[0].toUpperCase()}
          </Link>
        </motion.h1>
          ))}
      </motion.div>
    </div>
  );
};

export default Page;
