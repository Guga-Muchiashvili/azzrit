import React from 'react';
import {useRouter } from 'next/navigation';
import FormComponent from '@/components/FormComponent/formComponent';
import schema from './schema';
import './signUpStyle.scss';
import Link from 'next/link';
import Image from 'next/image';
import background from '../assets/sare.png'
import { IoIosArrowBack } from "react-icons/io";


const SignUpPage = async () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
    <Link href={'/landing'}>
      <IoIosArrowBack className='text-black absolute text-xl top-3 left-3 cursor-pointer' />
      </Link>
    <div className='w-full  lg:w-1/3 h-full flex items-center justify-center'>
    <FormComponent schema={schema}/>
    </div>
    <div className='lg:w-2/3 lg:block h-full relative hidden '>
    <Image
        src={background}
        alt="background"
        layout="fill"
      />
    </div>
   
  </div>
  );
}

export default SignUpPage;
