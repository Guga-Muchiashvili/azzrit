'use client'
import React, { useState } from 'react';
import './landingStyle.scss';
import { rules } from '@/additional/texts';
import {motion} from 'framer-motion'
import { useRouter } from 'next/navigation';

const Page = () => {
    const [showRules, setShowRules] = useState<boolean>(false)
    const router = useRouter()

    const submit = () => {
        router.push('/signUp')
    }

  return (
    <div className='backgroundImageDiv flex flex-col justify-center items-center gap-12'>
        {showRules && <motion.div initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : '.6'}} className='absolute text-center w-1/3 h-5/6 flex text-black items-center justify-center rounded-lg px-2 bg-white bg-opacity-75 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10' style={{textShadow : "0px 0px 0px"}}>
        <h1 className='absolute top-4 right-3 cursor-pointer text-black' onClick={() => setShowRules(prev => !prev)}>X</h1>
        {rules}
        </motion.div>
        }
      <h1 className='flex md:text-5xl text-3xl gap-3 lg:text-8xl'>
        Join the City of <span className='text-red-800'>Mafia</span>
      </h1>
      <div className='flex gap-7 flex-col md:flex-row'>
        <button onClick={() => submit()} className='w-40 bg-red-800  hover:scale-90 hover:bg-opacity-85 transition-all duration-500 shadow-black shadow-md font-bold h-12 rounded-md text-white'>
          Sign Up
        </button>
        <button className='w-40 bg-white hover:scale-90 hover:bg-opacity-85 transition-all duration-500 shadow-black shadow-md font-bold h-12 rounded-md text-red-600' onClick={() => setShowRules(prev => !prev)} style={{ textShadow: '0px 0px 0px' }}>
          Read rules
        </button>
      </div>
    </div>
  );
};

export default Page;