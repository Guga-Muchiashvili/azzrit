'use client'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { FaChevronCircleRight  } from "react-icons/fa";


const CretorControlComponent = ({id} : {id: string | undefined}) => {
    const {data} = useSession()
    const [control, setControl] = useState(false)

    useEffect(() => {
        id == data?.user.id && setControl(false)
    },[])


  return (
    <>
    { control == false ? <FaChevronCircleRight className='text-white cursor-pointer  text-4xl absolute bottom-6 left-2' onClick={() => setControl(true)} /> : <h1 className='text-black text-2xl left-3 top-2 cursor-pointer z-30 absolute' onClick={() => setControl(false)}>X</h1>}
    {control && <div className='w-1/5 h-screen bg-white absolute z-20 left-0 top-0'></div>}
    </>

  )
}

export default CretorControlComponent