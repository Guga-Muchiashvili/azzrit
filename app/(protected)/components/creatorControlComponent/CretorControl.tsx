'use client'
import { waitingPlayerList } from '@/actions/fetchData/dataRequests';
import { confirmRequest } from '@/actions/GameLogics/confirmPlayer/confirmPlayer';
import { IUser } from '@/types/types';
import { useSession } from 'next-auth/react'
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaChevronCircleRight  } from "react-icons/fa";


const CretorControlComponent = ({creatorId} : {creatorId: string | undefined}) => {
    const {data} = useSession()
    const [control, setControl] = useState(false)
    const [playerList, setPlayers] = useState<IUser[] | null>(null)

    const {tableId} = useParams()

    useEffect(() => {
      const getWaitingPlayers = async() => {
        const players = await waitingPlayerList(tableId as string)
        setPlayers(players)
      }
      getWaitingPlayers()
    },[])

    console.log(playerList)

    const acceptPlayer = async(id : string) => {
      const res = await confirmRequest({ id : id,  tableId : tableId as string })
      console.log(res)
    }

  return (
    <>
    {creatorId === data?.user.id && !control ? (
  <FaChevronCircleRight 
    className='text-white cursor-pointer text-4xl absolute bottom-6 left-2' 
    onClick={() => setControl(true)} 
  />
) : (
  <h1 
    className='text-white text-2xl left-3 top-2 cursor-pointer font-bold z-40 absolute' 
    onClick={() => setControl(false)}
  >
    X
  </h1>
)}
{control && (
  <div className='w-3/5 md:w-2/5 lg:w-1/3 h-screen bg-opacity-75 bg-black absolute z-20 left-0 top-0 px-3'>
    <div className='w-full h-2/3 mt-11 flex flex-col'>
      {playerList?.map((item) => (
        item ? (
          <div key={item?.id} className='w-full relative flex items-center gap-2 px-4 h-20 rounded-xl bg-gray-300 bg-opacity-25'>
            <Image 
              src={item?.image && item?.image as any} 
              alt='imag' 
              width={320} 
              height={320} 
              className='w-16 h-16 rounded-full' 
            />
            <div className='flex text-white gap-1 font-bold font-poppins flex-col'>
              <p>{item?.name}</p> 
              <p>{item?.email}</p>
            </div>
            <div className='h-full w-7 absolute right-16 gap-2 py-1 flex text-white font-bold flex-col justify-center'>
              <p className='h-1/2 bg-green-500 w-20 rounded-xl flex items-center justify-center cursor-pointer' onClick={() => acceptPlayer(item.id)}>Approve</p>
              <p className='h-1/2 bg-red-500 w-20 rounded-xl flex items-center justify-center cursor-pointer'>Reject</p>
            </div>
          </div>
        ) : null
      ))}
    </div>
  </div>
)}

    </>

  )
}

export default CretorControlComponent