'use client';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { IoMdPerson } from "react-icons/io";
import { motion } from 'framer-motion';
import { FaEdit, FaSignOutAlt } from "react-icons/fa";
import { signOutUser } from '@/actions/signOut/signOutUser';
import { IoMdLogIn } from "react-icons/io";
import schema from '../../signIn/schema'
import edischema from '../../(protected)/editprofile/schema'
import Link from 'next/link';
import { MdLogin } from "react-icons/md";
import useDevice from '@/hooks/getDeviceHook';
import Image from 'next/image';
import { noUserImage } from '@/app/additional/texts';
import { IUser } from '@/types/types';
import FormComponent from '@/app/components/FormComponent/formComponent';
import EditUserForm from '@/app/components/EditUserComponent/EditUserForm';
import IEditUser from '@/app/(protected)/editprofile/types';

const Usernav = () => {
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleInteraction = () => {
    setShowModal(!showModal);
  };

  const defaultValues : IEditUser = {
    email : session?.user.email,
    image : session?.user.image ? session.user.image : noUserImage,
    name : session?.user.name,
  }
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, ease: "easeIn" }} className='fixed z-20 top-5 right-8  font-poppins'>
      {typeof session?.user.image == 'string' ? (
          <Image
          src={`${session?.user.image == noUserImage || !session?.user.image  ? noUserImage : session.user.image.includes('http') ? session.user.image : `/uploads/${session.user.image}` }`}
          className='w-12 h-12 rounded-full cursor-pointer'
          onClick={handleInteraction }
          alt='pfp'
          width={100}
          height={100}
          />
      ) : (
        <IoMdPerson
        className='text-5xl border-2 z-20 border-red-600 hover:bg-white duration-500 ease-in bg-black cursor-pointer rounded-full p-[5px]'
        onClick={handleInteraction}
      />
      )}
      
      {showModal && (
        <motion.div
        initial={{translateX : 2000}}
        animate={{translateX : 0}}
        transition={{duration : 1}}
          className='w-96 bg-white h-screen fixed top-0 right-0'
        >
            {session ? (
              <div>
                <p className='absolute top-3 right-3 cursor-pointer text-black' onClick={() => setShowModal(false)}>X</p>
                <EditUserForm modalToggle={handleInteraction} schema={edischema} onLanding={true}/>
              </div>
            ) : (
              <div>
                <p className='absolute top-3 cursor-pointer right-3 text-black' onClick={() => setShowModal(false)}>X</p>
                <FormComponent onLanding={true} schema={schema}/>
              </div>
            )}
          </motion.div>
      )}
    </motion.div>
  );
};

export default Usernav;
