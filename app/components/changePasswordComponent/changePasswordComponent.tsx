"use client";
import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import ButtonInputElement from "@/app/elements/button/buttonInput.Element";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import TextInputElement from "@/app/elements/textInput/textInput.Element";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { IChangePassword, IChangePasswordComponentProps } from "./changePasswordTypes";
import { newPassword } from "@/actions/resetPassword/newPasswordCreate/newPasswordCreate";
import { BiError } from "react-icons/bi";
import { MdDone } from "react-icons/md";

const ChangePasswordComponent = ({schema} : IChangePasswordComponentProps) => {
  const searchParams = useSearchParams();
  const token: string | undefined = searchParams.get("token") || undefined;
  const navigate = useRouter()
  const [isSucess, setisSucess] = useState<{succes : null | boolean, message : string | undefined}>({succes : null, message : ""})

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IChangePassword>({
    resolver: yupResolver(schema),
  });


  const onSubmit = async(val : IChangePassword) => {
    const res = await newPassword(val.password, token)
    if(res.succes){
        setisSucess({message : res.succes, succes : true})
        setTimeout(() => {
            navigate.push('/signIn')
        }, 1400);
    }else{
        setisSucess({message : res.error, succes : false})
    }
  }


  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-96 h-96 bg-white gap-2 px-10 rounded-lg flex items-center justify-center flex-col">
      <motion.h1>change your password</motion.h1>
        <TextInputElement disabled={false} control={control} error={errors} id="password" label="password" placeholder="enter password" type="password" />
        <TextInputElement disabled={false} control={control} error={errors} id="confirmPassword" label="password" placeholder="confirm password" type="password" />
        {isSucess.succes  == false ?  
        <motion.div className='w-full h-12 rounded-lg px-2 flex items-center justify-left bg-opacity-80 mt-2 bg-red-200'>
        <BiError className='text-red-500 text-3xl'/>
        <motion.h2 className='font-kanit text-red-500 font-semibold'>{isSucess.message}</motion.h2>
        </motion.div> : isSucess.succes ? <motion.div className='w-full h-12 rounded-lg px-2 flex items-center justify-left gap-3 bg-opacity-80 mt-2 bg-green-200'>
        <MdDone className='text-green-500 text-2xl'/>
        <motion.h2 className='font-kanit text-green-500 font-semibold'>{isSucess.message}</motion.h2>
        </motion.div> : ""}
        <ButtonInputElement text="Update" />
    </form>
  );
};

export default ChangePasswordComponent;
