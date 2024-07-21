'use client'
import Image from "next/image";
import React from "react";
import test from '../../../assets/google-icon.png'
import { FaEye } from "react-icons/fa";
import {motion} from 'framer-motion'
import { ITable } from "../CreateTableForm/TableFormComponent/tableFormType";
import { getSession, useSession } from "next-auth/react";

const TableComponent = ({item, index} : {item : ITable, index : number}) => {
  const session = useSession();
  return (
    <motion.div initial={{opacity : 0, translateY : -20}} animate={{opacity : 1, translateY : 0}} transition={{duration : 1, delay : 0.1 * index}} className="w-full overflow-hidden relative h-72 bg-black bg-opacity-65 md:w-[550px] rounded-3xl px-4">
      <div className="w-full h-1/3 flex items-start  py-8 gap-3 relative ">
      <motion.div initial={{opacity : 0, translateX : -30 }} animate={{opacity : 1, translateX : 0}} transition={{duration : 1.2, delay : 0.3}}>
      <Image src={item.creator.image as string} alt="img" width={310 } height={310} className="w-20 h-20 rounded-full"></Image>
      </motion.div>
      <div className="h-full gap-1 flex flex-col justify-start text-white py-2">
        <motion.h1 initial={{opacity : 0, translateY : -20 }} animate={{opacity : 1, translateY : 0}} transition={{duration : 1.5, delay : .3}}  className="text-2xl font-bold">{item.title}</motion.h1>
        <motion.h2 initial={{opacity : 0, translateY : -20}} animate={{opacity : 1, translateY : 0}} transition={{duration : 1.5, delay : .3}} >{item.creator.name}</motion.h2>
      </div>
      <div className="absolute right-1 flex-col flex gap-3 items-end ">
        <motion.button initial={{opacity : 0, translateX : 40 }} animate={{opacity : 1, translateX : 0}} transition={{duration : 1.2, delay : 0.3}}  className={`bg-${item.gameStarted ? "green-500" : "gray-600"} cursor-default text-white px-4 py-1 rounded-full `}>{item.gameStarted ? "playing" : "Pending"}</motion.button>
        <motion.h1 initial={{opacity : 0, translateX : 40  }} animate={{opacity : 1, translateX : 0}} transition={{duration : 1.2, delay : 0.5}}  className="text-white font-semibold mr-2 cursor-pointer">{item.playerCount}</motion.h1>

      </div>
      </div>
      <div className="w-full absolute bottom-3 flex left-0 justify-between px-3 pl-7 items-center">
        {!item.gameStarted ?         <motion.h1 initial={{opacity : 0, translateX : -30 }} animate={{opacity : 1, translateX : 0}} transition={{duration : 1.2, delay : 0.3}}  className="text-white font-semibold flex items-center gap-2"> {item.gameMode} 3/5 <FaEye className="text-xl" /></motion.h1>
 :  <motion.h1 initial={{opacity : 0, translateX : -30 }} animate={{opacity : 1, translateX : 0}} transition={{duration : 1.2, delay : 0.3}}  className="text-white font-semibold flex items-center gap-2">{item.gameMode} / {item.tableType}</motion.h1> }    
        <motion.button initial={{opacity : 0, translateX : 40 }} animate={{opacity : 1, translateX : 0}} transition={{duration : 1.2, delay : 0.3}}  className={`w-32 h-9 bg-${item.gameStarted ? 'gray-600' : "green-600"} text-white rounded-full`}>
          {item.gameStarted ? "Spectate" : item.creatorId == session?.data?.user.id ? 'join' : "Request"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TableComponent;
