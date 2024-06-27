'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { IoMdPerson } from "react-icons/io";
import { motion } from 'framer-motion';
import { FaEdit, FaSignOutAlt } from "react-icons/fa";
import { signOutUser } from '@/actions/signOut/signOutUser';
import { IoMdLogIn } from "react-icons/io";
import Link from 'next/link';
import { MdLogin } from "react-icons/md";



const Usernav = () => {
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState<boolean>(false);


  return (
    <motion.div initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 1, ease : "easeIn"}} className='absolute top-5 right-8 text-red-600 font-poppins'>
      <IoMdPerson
        className='text-5xl border-2 border-red-600 hover:bg-white duration-700 ease-in bg-black cursor-pointer rounded-full p-[5px]'
        onMouseEnter={() => setShowModal(true)}
        onMouseLeave={() => setShowModal(false)}
      />
      {showModal && (
      <div className='absolute top-10 z-10 w-48 right-1 h-fit p-5'        
      onMouseEnter={() => setShowModal(true)}
      onMouseLeave={() => setShowModal(false)}>
        <motion.div
        onMouseEnter={() => setShowModal(true)}
        onMouseLeave={() => setShowModal(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeIn' }}
          className='py-2 gap-2 items-center flex flex-col h-fit rounded-md bg-black border-[1px] px-2 border-red-500 bg-opacity-75 absolute text-white right-2 top-5'
          style={{ minWidth: 'fit-content', whiteSpace: 'nowrap' }}
        >
          {session ? (
            <div>
              <motion.div className='flex flex-col pb-2'>
                <motion.p>name: {session?.user.name}</motion.p>
                <motion.p>email: {session?.user.email}</motion.p>
              </motion.div>
              <div className='flex w-full text-red-500 border-t-[1px] border-red-500 pt-2 gap-1'>
                <button className='flex hover:text-white duration-1000 ease-in-out border-[1px] border-red-500 rounded-xl p-[3px] justify-center gap-2 items-center w-1/2'>
                  edit
                  <FaEdit />
                </button>
                <button
                  className='flex hover:text-white duration-1000 ease-in-out border-[1px] border-red-500 rounded-xl p-[3px] justify-center gap-2 items-center w-1/2'
                  onClick={async () => {
                    await signOutUser()
                    window.location.href = window.location.href + '?refresh=' + new Date().getTime();
                  }}
                >
                  LogOff
                  <FaSignOutAlt />
                </button>
              </div>
            </div>
          ) : (
            <div className='flex flex-col gap-2'>
              <Link href={'/signIn'} className='w-full hover:text-red-500 duration-1000 ease-in-out flex items-center justify-between gap-2'>
                Sign In <IoMdLogIn />
              </Link>
              <Link href={'/signUp'} className='w-full hover:text-red-500 duration-1000 ease-in-out flex items-center justify-between gap-2'>
                Sign Up <MdLogin  />
              </Link>
            </div>
          )}
        </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Usernav;
