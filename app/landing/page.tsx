"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Ensure correct import from 'next/navigation'
import "./landingStyle.scss";
import Link from "next/link";
import background from "../assets/bg.jpg";
import { motion } from "framer-motion";
import { landingTexts } from "../additional/texts";
import useSound from "use-sound";
import Usernav from "../elements/user/UserNav";
import { SessionProvider } from "next-auth/react";
import VolumeElement from "../elements/volume/volumeElement";
import useDevice from "@/hooks/getDeviceHook";
import useRegistered from "@/hooks/isRegisteredHook";

const Page = () => {
  const device = useDevice();
  const isRegistered = useRegistered();

  return (
    <div
      className="backgroundImageDiv flex flex-col relative justify-center items-center gap-12"
      style={{
        backgroundImage: `url('${background.src}')`,
        width: "100%",
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Usernav />
      <VolumeElement />
      <motion.div
        className={`sm:w-fit sm:items-start px-3 gap-12 md:gap-16 absolute flex flex-col h-2/3 text-left justify-centerc w-full items-center bottom-0 md:bottom-16 left-0 font-oswalid font-extrabold`}
      >
        {Object.entries(landingTexts).map((item, i) =>
          isRegistered && item[0] === "Registration" ? null : (
            <motion.h1
              key={i}
              id="landing-txt"
              initial={{ opacity: 0, translateX: -1000 }}
              animate={{
                opacity: 1,
                translateX: i * (device === "mobile" ? 0 : 50),
              }}
              transition={{ duration: 1, delay: i * 0.1, ease: "easeIn" }}
              className={`text-red-600 ${
                isRegistered
                  ? "text-7xl md:text-9xl"
                  : "text-5xl md:8xl xl:text-9xl"
              } sm:text-7xl font-bold cursor-pointer hover:text-white duration-700  hover:${
                device == "mobile" ? "text-[50px]" : "text-[145px]"
              }`}
            >
              <Link href={`/${item[1]}`}>
                <p>{item[0].toUpperCase()}</p>
              </Link>
            </motion.h1>
          )
        )}
      </motion.div>
    </div>
  );
};

export default Page;
