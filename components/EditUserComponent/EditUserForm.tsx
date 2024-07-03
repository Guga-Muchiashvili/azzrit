import IEditUser from "@/app/(protected)/editprofile/types";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ObjectSchema } from "yup";
import { IEditUserProps } from "./editUser.types";
import { motion } from "framer-motion";
import TextInputElement from "@/app/elements/textInput/textInput.Element";
import ButtonInputElement from "@/app/elements/button/buttonInput.Element";
import Image from "next/image";
import { noUserImage } from "@/app/additional/texts";
import { updateUser } from "@/actions/editUser/editUser";
import axios from "axios";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import ImagePickerElement from "@/app/elements/imagePicker/imagePicker";

const EditUserForm = ({ schema, defaultValues }: IEditUserProps) => {
  const { data: session, update: updateSession } = useSession();
  const [file, setfile] = useState<Blob | MediaSource>()

  console.log(session);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch
  } = useForm<IEditUser>({
    resolver: yupResolver(schema) as any,
    defaultValues,
  });

  const FormEmail = watch('email')

  const onSubmit = async (val: IEditUser, e : any) => {

    console.log("submit", val.image);
    const data: IEditUser = {
      email: val.email,
      image: val.image == noUserImage ? null : val.image,
      name: val.name,
    };

    fileUpload(e, val)

    // const res = await updateUser(data);
    // if (res.success) {
    //   updateSession({ ...session, user: res.user });
    //   toast.success("User updated successfully");
    // } else {
    //   toast.error("Something went wrong");
    // }
  };

  const fileUpload  = async(e : any, values : IEditUser) => {
    
    const img = e?.target.files[0]
    setfile(img)
    const data =  new FormData()
    data.append('image', img)
    data.append('email', FormEmail as string)
    console.log('before')
    const res = await updateUser(data);
    console.log(res)
    console.log('after')
    // for (const entry of data.entries()) {
    //   console.log(entry);
    // }
    
  }

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

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
          transition={{ duration: 1, delay: 0.1, ease: "easeIn" }}
        >
          <Image
            src={file ? URL.createObjectURL(file ) :  defaultValues.image as string}
            width={120}
            height={120}
            alt='pfp'
            className='rounded-full h-40 w-40 overflow-hidden  cursor-pointer p-3 hover:bg-gray-800 hover:bg-opacity-25 duration-500 ease-in '
            />
          <input type="file" name="image" onChange={fileUpload} />
          <TextInputElement
            id="name"
            placeholder="Enter name"
            type="text"
            label="Name"
            control={control}
            error={errors}
            disabled={false}
          />
        </motion.div>
        <motion.div
          className="w-full"
          initial={{ opacity: 0, translateX: -10 }}
          animate={{ opacity: 1, translateY: 0, translateX: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeIn" }}
        >
          <TextInputElement
            disabled={true}
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
          transition={{ duration: 1.2, ease: "easeIn" }}
          className="mt-3"
        >
          <ButtonInputElement text="Edit" />
        </motion.div>
      </>
    </form>
  );
};

export default EditUserForm;
