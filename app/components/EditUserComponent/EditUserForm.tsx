import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import Image from "next/image";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { updateUser } from "@/actions/editUser/editUser";
import { noUserImage } from "@/app/additional/texts";
import ImagePickerElement from "@/app/elements/imagePicker/imagePicker";
import {IEditUserProps } from "./editUser.types"; // Ensure you import the correct types/interfaces
import ButtonInputElement from "@/app/elements/button/buttonInput.Element";
import TextInputElement from "@/app/elements/textInput/textInput.Element";
import IEditUser from "@/app/(protected)/editprofile/types";
import { useRouter } from "next/navigation";
import { signOutUser } from "@/actions/signOut/signOutUser";
import { getImage } from "@/actions/getImage/fetchImage";

const EditUserForm = ({ schema, onLanding }: IEditUserProps) => {
  const { data: session, update: updateSession } = useSession();
  const [file, setFile] = useState<File | undefined>();
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useRouter()


  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch
  } = useForm<IEditUser>({
    resolver: yupResolver(schema) as any,
  });

  const onSubmit = async (val: IEditUser) => {
    const ml = await getImage()
    const filtered = ml.resources?.filter((item : any) =>{ if(item.secure_url == imageUrl) return item})

    const data: IEditUser = {
      email: val.email,
      image: imageUrl === noUserImage ? null : filtered[0]?.secure_url,
      name: val.name,
    };
    const res = await updateUser(data);

    if (res.success) {
      updateSession({ ...session, user: res.user });
      toast.success("User updated successfully");
    } else {
      return toast.error("Something went wrong");
    }
    navigate.push('/landing')
    window.location.reload()
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData();
      if (e.target.files && e.target.files.length > 0) {
        formData.append("file", e.target.files[0]);
        setFile(e.target.files[0]);
      }

      formData.append('upload_preset', 'uploads')

      const data = await fetch('https://api.cloudinary.com/v1_1/dqsgmvnye/image/upload', {
        method : "POST",
        body : formData
      }).then((res) => {
       return res.json()
      })

      setImageUrl(data.secure_url)

    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const onImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    setImageUrl(session?.user.image as string)
    reset(session?.user);
  }, [reset]);


  return (
    <form
      className={`w-full ${onLanding ? 'w-full' : "sm:w-2/3 md:w-2/5 lg:w-1/3"} h-full bg-white px-7 flex flex-col items-center justify-center py-14`}
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
      <div className="w-full flex flex-col items-center mt-5">
        <div
          onClick={onImageClick}
          className="rounded-full h-40 w-40 overflow-hidden cursor-pointer p-3 hover:bg-gray-800 hover:bg-opacity-25 duration-500 ease-in"
        >
          {file ? (
            <Image
              src={typeof file == 'string' ? file :  URL.createObjectURL(file)}
              width={120}
              height={120}
              alt="pfp"
              className="w-full h-full rounded-full"
            />
          ) : (
            <Image
              src={
                session?.user.image == null ? noUserImage :
                session?.user.image.includes('http') ? 
                session.user.image : 
                session?.user.image ?
                   `/uploads/${session?.user.image}` : ""
              }
              width={120}
              height={120}
              alt="pfp"
              className="w-full h-full rounded-full"
            />
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          name="image"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <TextInputElement
          id="name"
          placeholder="Enter name"
          type="text"
          label="Name"
          control={control}
          error={errors}
          disabled={false}
        />
      </div>
      <div className="w-full">
        <TextInputElement
          disabled={true}
          id="email"
          placeholder="Enter Email"
          type="email"
          control={control}
          error={errors}
          label="Email"
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeIn" }}
        className="mt-3 w-full"
      >
         <button className="w-full h-12 text-blue-500 hover:bg-blue-300 hover:text-white hover:border-none duration-200 ease-in rounded-lg font-normal border-[1px] border-blue-500 ">Save</button>
          <div className="absolute bottom-5 left-0 px-6 w-full " onClick={async() => {
            signOutUser()
            }}>
         <button className="w-full h-12 text-red-500 hover:bg-red-300 hover:text-white hover:border-none duration-200 ease-in rounded-lg font-normal border-[1px] border-red-500 ">Sign Out</button>
        </div>
      </motion.div>
      
    </form>
  );
};

export default EditUserForm;
