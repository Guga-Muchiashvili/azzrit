import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Ensure correct import from 'next/navigation'
import './landingStyle.scss';
import Link from 'next/link';

const Page = () => {

  return (
    <div
      className="backgroundImageDiv flex flex-col justify-center items-center gap-12"
      style={{
        backgroundImage: `url('https://assetsio.gnwcdn.com/wise-guys-board-game-gale-force-nine-setup.png?width=1920&height=1920&fit=bounds&quality=80&format=jpg&auto=webp')`,
        width: '100%',
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="flex md:text-5xl text-3xl gap-3 lg:text-8xl font-kanit font-extrabold italic text-shadow-custom">
        Join the City of <span className="text-red-800">Mafia</span>
      </h1>
      <div className="flex gap-7 flex-col md:flex-row items-center justify-center text-center">
        <Link
          href={'/signUp'}
          className="w-40 bg-red-800 shadow-black flex justify-center items-center shadow-md font-bold h-12 rounded-md text-white"
        >
          Sign Up
        </Link>
        <button
          className="w-40 bg-white shadow-black shadow-md font-bold h-12 rounded-md text-red-600 text-shadow-none"
        >
          Read rules
        </button>
      </div>
    
    </div>
  );
};

export default Page;
