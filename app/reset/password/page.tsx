import React, { Suspense } from 'react';
import schema from './schema';
import ResetPasswordComponent from '@/components/resetPasswordComponent/ResetPasswordComponent'; // Adjusted naming convention
import ChangePasswordComponent from '@/app/components/changePasswordComponent/changePasswordComponent';

const ResetPasswordPage = () => {

  return (
    <div className='w-full h-screen bg-gray-800 flex justify-center items-center px-4'>
      <Suspense fallback={<div>Loading...</div>}>
        <ChangePasswordComponent schema={schema} />
      </Suspense>
    </div>
  );
};

export default ResetPasswordPage;
