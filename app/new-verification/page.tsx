import VerificationComponent from '@/components/verificationComponent/VerificationComponent'
import React, { Suspense } from 'react'

const Page = () => {
  return (
    <div className='w-full h-screen bg-gray-800 justify-center items-center flex'>
      <Suspense fallback={<div>Loading...</div>}>
        <VerificationComponent />
      </Suspense>
    </div>
  )
}

export default Page
