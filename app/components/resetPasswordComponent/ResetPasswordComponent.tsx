'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ButtonInputElement from '@/app/elements/button/buttonInput.Element';
import TextInputElement from '@/app/elements/textInput/textInput.Element';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IResetPasswordFormComponentProps } from './resetPasswordTypes';
import { IResetPassword } from '@/app/reset/restPasswordFormTypes';
import { getUserByEmail } from '@/actions/fetchData/dataRequests';
import { MdDone } from 'react-icons/md';
import { BiError } from 'react-icons/bi';
import { resrtPassword } from '@/actions/resetPassword/resetPassword';

const ResetPasswordComponent = ({ schema }: IResetPasswordFormComponentProps) => {
  const [sent, setSent] = useState<null | boolean>(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IResetPassword>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ email }: { email: string }) => {
    try {
      const res = await resrtPassword({ email });
      if (!res) {
        setSent(false);
      } else {
        setSent(true);
        reset();
      }
    } catch (err) {
      console.error('Error resetting password:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-96 h-72 bg-white gap-4 px-10 rounded-lg flex items-center justify-center flex-col'>
      <motion.h1>Reset your password</motion.h1>
      <TextInputElement disabled={false} control={control} error={errors} id='email' placeholder='Enter email' label='Enter email' type='email' />
      {sent === false && (
        <motion.div className='w-full h-12 rounded-lg px-2 flex items-center justify-left bg-opacity-80 mt-2 bg-red-200'>
          <BiError className='text-red-500 text-3xl' />
          <motion.h2 className='font-kanit text-red-500 font-semibold'>Email was not found</motion.h2>
        </motion.div>
      )}
      {sent && (
        <motion.div className='w-full h-12 rounded-lg px-2 flex items-center justify-left gap-3 bg-opacity-80 mt-2 bg-green-200'>
          <MdDone className='text-green-500 text-2xl' />
          <motion.h2 className='font-kanit text-green-500 font-semibold'>Email Sent</motion.h2>
        </motion.div>
      )}
      <ButtonInputElement text='Send Email' />
    </form>
  );
};

export default ResetPasswordComponent;
