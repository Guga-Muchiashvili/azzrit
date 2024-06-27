import React from 'react';
import {useRouter } from 'next/navigation';
import FormComponent from '@/components/formComponent';
import schema from './schema';
import './signUpStyle.scss';
import Link from 'next/link';
import Image from 'next/image';
import background from '../assets/sare.png'

const SignUpPage = async () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
    <Link href={'/landing'} className='absolute top-4 left-4 font-semibold'> back</Link>
    <div className='w-full md:w-1/2 lg:w-1/3 h-full flex items-center justify-center'>
    <FormComponent schema={schema}/>
    </div>
    <div className='lg:w-2/3 h-full relative hidden md:block w-1/2'>
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
