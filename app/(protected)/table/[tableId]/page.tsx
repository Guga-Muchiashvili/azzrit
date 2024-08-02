import { getTableById } from '@/actions/fetchData/dataRequests'
import Usernav from '@/app/elements/user/UserNav'
import { FaRunning } from "react-icons/fa";
import React from 'react'
import Link from 'next/link';
import PlayerListComponent from '../../components/PlayerList/PlayerList';
import { TypeProvider } from '../../tableTypeContext/TypeContext';
import { Toaster } from 'sonner';

const TablePage = async() => {
    // const session = useSession()
    // const {tableId} = useParams()
    // // const table = await getTableById(tableId)

    // // console.log(table)

    
  return (
    <TypeProvider>
    <div className='w-full h-screen bg-[#020e3d]'>
      <Usernav/>
      <PlayerListComponent/>
      <Link href={'/'}>
      <FaRunning className='text-2xl text-red-600 absolute bottom-6 right-8 cursor-pointer hover:bg-white w-12 h-12 p-2 rounded-full duration-700'/>
      </Link>
      <Toaster/>
    </div>
    </TypeProvider>
  )
}

export default TablePage