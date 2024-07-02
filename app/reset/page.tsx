import ResetPasswordComponent from '@/components/resetPasswordComponent/ResetPasswordComponent'
import React from 'react'
import schema from './schema'
import Link from 'next/link'

const ResetPasswordPage = () => {
  return (
    <div className='w-full h-screen bg-gray-800 flex justify-center items-center px-4'>
      <Link href={'/signIn'} className='text-white font-poppins absolute top-4 left-4'>Go back</Link>
        <ResetPasswordComponent schema={schema}/>
    </div>
  )
}

export default ResetPasswordPage