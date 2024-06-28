import React from "react";
import { FaGoogle } from "react-icons/fa";
import googleIcon from "../../assets/google-icon.png";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { DEFAULT_ROUTE_NAVIGATE } from "@/routes";
import { motion } from "framer-motion";

const GoogleElementButton = () => {
  const onClick = (provider: "google") => {
    signIn(provider, {
      callbackUrl: DEFAULT_ROUTE_NAVIGATE,
    });
  };
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.6 }}
      type="button"
      className="w-80 mt-8 h-12 rounded-md cursor-pointer hover:scale-105 border-gray-300 border-[0.5px] duration-500 transition-all bg-gray-100 bg-opacity-50 items-center px-5 font-semibold gap-3 justify-center text-gray-700 flex"
      onClick={() => onClick("google")}
    >
      <Image
        src={googleIcon.src}
        width={20}
        height={5}
        alt="google"
        className="w-8 h-8"
      />
      <span>Continue with google</span>
    </motion.button>
  );
};

export default GoogleElementButton;
