'use client';

import React from 'react';
import {useRouter } from 'next/navigation';
import FormComponent from '@/components/formComponent';
import schema from './schema';
import './signUpStyle.scss';

const SignUpPage = () => {

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <FormComponent schema={schema} signUp={true} />
    </div>
  );
}

export default SignUpPage;
