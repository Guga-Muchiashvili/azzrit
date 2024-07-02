import ChangePasswordComponent from '@/components/changePasswordComponent/changePasswordComponent'
import ResetPasswordComponent from '@/components/resetPasswordComponent/ResetPasswordComponent'
import Link from 'next/link'
import React from 'react'
import schema from './schema'

const page = () => {
  return (
    <div className='w-full h-screen bg-gray-800 flex justify-center items-center px-4'>
      <Link href={'/signIn'} className='text-white font-poppins absolute top-4 left-4'>Go back</Link>
        <ChangePasswordComponent schema={schema}/>
    </div>
  )
}

export default page