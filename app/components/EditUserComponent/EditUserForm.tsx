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

const EditUserForm = ({ schema, onLanding }: IEditUserProps) => {
  const { data: session, update: updateSession } = useSession();
  const [file, setFile] = useState<File | undefined>();
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useRouter()

  console.log(file)

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
    const data: IEditUser = {
      email: val.email,
      image: imageUrl === noUserImage ? null : imageUrl,
      name: val.name,
    };

    console.log( session?.user.image)

    const res = await updateUser(data);

    if (res.success) {
      updateSession({ ...session, user: res.user });
      toast.success("User updated successfully");
    } else {
      return toast.error("Something went wrong");
    }

    console.log('done')
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

      const response = await fetch("/api/imageupload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      const result = await response.json();
      setImageUrl(result.path);
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
              src={URL.createObjectURL(file)}
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
        className="mt-3"
      >
        <div className="w-52 flex gap-6">
          <div>
        <ButtonInputElement text="Edit" />
          </div>
        <div onClick={() => signOutUser()}>
        <ButtonInputElement text="Sign Out"/>
        </div>
        </div>
      </motion.div>
    </form>
  );
};

export default EditUserForm;
