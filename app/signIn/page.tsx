'use client'
import FormComponent from '@/components/formComponent'
import React from 'react'
import schema from './schema'
import Link from 'next/link'
import Image from 'next/image'
import background from '../assets/sare.png'
import { IoIosArrowBack } from "react-icons/io";


const SignInPage = () => {
  
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <Link href={'/landing'}>
      <IoIosArrowBack className='text-black absolute text-xl top-3 left-3 cursor-pointer' />
      </Link>
      
      <div className='w-full md:w-2/3 lg:w-1/3 h-full flex items-center justify-center'>
      <FormComponent schema={schema}/>
      </div>
      <div className='lg:w-2/3 h-full relative hidden md:block w-1/3'>
      <Image
          src={background}
          alt="background"
          layout="fill"
        />
      </div>
     
    </div>
  )
}

export default SignInPage