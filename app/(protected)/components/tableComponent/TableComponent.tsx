'use client'
import Image from "next/image";
import React from "react";
import test from '../../../assets/google-icon.png'
import { FaEye } from "react-icons/fa";
import {motion} from 'framer-motion'

const TableComponent = ({item, index} : {item? : string, index : number}) => {
  return (
    <motion.div initial={{opacity : 0, translateY : -20}} animate={{opacity : 1, translateY : 0}} transition={{duration : 1, delay : 0.1 * index}} className="w-full overflow-hidden relative h-72 bg-black bg-opacity-65 md:w-[550px] rounded-3xl px-4">
      <div className="w-full h-1/3 flex items-start  py-8 gap-2 relative ">
      <motion.div initial={{opacity : 0, translateX : -30 }} animate={{opacity : 1, translateX : 0}} transition={{duration : 1.2, delay : 0.3}}>
      <Image src={test.src} alt="img" width={310 } height={310} className="w-20 h-20 rounded-full"></Image>
      </motion.div>
      <div className="h-full gap-1 flex flex-col justify-start text-white py-2">
        <motion.h1 initial={{opacity : 0, translateY : -20 }} animate={{opacity : 1, translateY : 0}} transition={{duration : 1.5, delay : .3}}  className="text-2xl font-bold">Host</motion.h1>
        <motion.h2 initial={{opacity : 0, translateY : -20}} animate={{opacity : 1, translateY : 0}} transition={{duration : 1.5, delay : .3}} >Guga Muchiashvili</motion.h2>
      </div>
      <div className="absolute right-1 flex-col flex gap-3 items-end ">
        <motion.button initial={{opacity : 0, translateX : 40 }} animate={{opacity : 1, translateX : 0}} transition={{duration : 1.2, delay : 0.3}}  className="bg-green-600 cursor-default text-white px-4 py-1 rounded-full ">Playing</motion.button>
        <motion.h1 initial={{opacity : 0, translateX : 40  }} animate={{opacity : 1, translateX : 0}} transition={{duration : 1.2, delay : 0.5}}  className="text-white font-semibold mr-2 cursor-pointer">9/11</motion.h1>

      </div>
      </div>
      <div className="w-full absolute bottom-3 flex left-0 justify-between px-3 pl-7 items-center">
        <motion.h1 initial={{opacity : 0, translateX : -30 }} animate={{opacity : 1, translateX : 0}} transition={{duration : 1.2, delay : 0.3}}  className="text-white font-semibold flex items-center gap-2">3/5 <FaEye className="text-xl" /></motion.h1>
        <motion.button initial={{opacity : 0, translateX : 40 }} animate={{opacity : 1, translateX : 0}} transition={{duration : 1.2, delay : 0.3}}  className="w-32 h-9 bg-gray-600 text-white rounded-full ">
          Spectate
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TableComponent;
