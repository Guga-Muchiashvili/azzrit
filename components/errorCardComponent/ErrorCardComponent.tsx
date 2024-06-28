'use client'
import ButtonInputElement from '@/app/elements/button/buttonInput.Element'
import Link from 'next/link'
import React from 'react'
import { BiError } from "react-icons/bi";

import {motion} from 'framer-motion'

const ErrorCardComponent = () => {
  return (
    <div className='w-96 h-52 bg-white gap-2 px-10 rounded-lg flex items-center justify-center flex-col'>
        <motion.h1>Opps... something went wrong</motion.h1>
        <motion.div className='w-full h-12 rounded-lg px-2 flex items-center justify-around bg-opacity-80 mt-5 bg-red-200'>
        <BiError className='text-red-500 text-3xl'/>
        <motion.h2 className='font-kanit text-red-500 font-semibold'>Email is Already Used</motion.h2>
        </motion.div>
        <Link href={'/signIn'}>
        <ButtonInputElement text='Go Back'/>
        </Link>
    </div>
  )
}

export default ErrorCardComponent