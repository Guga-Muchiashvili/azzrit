'use client'
import FormComponent from '@/components/formComponent'
import React from 'react'
import schema from './schema'

const SignInPage = () => {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <FormComponent schema={schema}/>
    </div>
  )
}

export default SignInPage