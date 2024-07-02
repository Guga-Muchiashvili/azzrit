import IEditUser from '@/app/(protected)/editprofile/types';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ObjectSchema } from 'yup';
import { IEditUserProps } from './editUser.types';
import { motion } from 'framer-motion';
import TextInputElement from '@/app/elements/textInput/textInput.Element';
import ButtonInputElement from '@/app/elements/button/buttonInput.Element';
import Image from 'next/image';
import { noUserImage } from '@/app/additional/texts';

const EditUserForm = ({ schema, defaultValues }: IEditUserProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IEditUser>({
    resolver: yupResolver(schema) as any,
    defaultValues,
  });

  const onSubmit = (val: IEditUser) => {
    const data : IEditUser =  {
      email : val.email,
      image : val.image == noUserImage ? null : val.image,
      name : val.name
    }

    console.log(data)
  };

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  console.log(errors)

  return (
    <form
      className="w-full sm:w-2/3 md:w-2/5 lg:w-1/3 h-full bg-white   px-7 flex flex-col items-center justify-center py-14"
      onSubmit={handleSubmit(onSubmit)}
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="font-semibold text-oswalid text-3xl text-black"
      >
        Edit User
      </motion.h1>
      <>
      
        <motion.div
          className="w-full flex flex-col items-center mt-5"
          initial={{ opacity: 0, translateX: -10 }}
          animate={{ opacity: 1, translateY: 0, translateX: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: 'easeIn' }}
        >
          <Image
            src={defaultValues.image as string}
            width={120}
            height={120}
            alt='pfp'
            className='rounded-full cursor-pointer p-3 hover:bg-gray-800 hover:bg-opacity-25 duration-500 ease-in '
            />
          <TextInputElement
            id="name"
            placeholder="Enter name"
            type="text"
            label="Name"
            control={control}
            error={errors}
          />
        </motion.div>
        <motion.div
          className="w-full"
          initial={{ opacity: 0, translateX: -10 }}
          animate={{ opacity: 1, translateY: 0, translateX: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeIn' }}
        >
          <TextInputElement
            id="email"
            placeholder="Enter Email"
            type="email"
            control={control}
            error={errors}
            label="Email"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeIn' }}
          className='mt-3'
        >
          <ButtonInputElement text="Edit" />
        </motion.div>
      </>
    </form>
  );
};

export default EditUserForm;
