'use client'
import Usernav from '@/app/elements/user/UserNav'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import CreateModal from '../tableModalComponent/TableModal'
import { deleteUserTableId } from '@/actions/GameLogics/deletePlayerFromTable/deletePlayer'
import { useSession } from 'next-auth/react'
import { useTypeContext } from '../../tableTypeContext/TypeContext'
import TableCardElement from '../tableComponent/TableCard'
import FilterTableComponent from '../filterComponent/FilterTable'
import { Toaster } from 'sonner'
import { socket } from '@/socket'
const GamePageComponent = () => {
  const { defineType, type, Tables, fetchData } = useTypeContext()
  const session = useSession()
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on('tables', (newTables) => {
      console.log('Received tables:', newTables);
    });

    fetchData()
      const deleteTableId = async() => {
        const res = await deleteUserTableId(session.data?.user.id as string)
        console.log(res)
      }
      deleteTableId()
      socket.on('tables', (value) => {
        console.log('tab', value)
      })

      return () => {
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
      }
  },[])

  console.log(isConnected)

  return (
    <div className="w-full min-h-screen relative flex flex-col items-center py-9" id="MainPage">
      {type === 'Create Table' && (
        <CreateModal type={'FORM'}/>
      )}
      <Link href={'/landing'} className="text-white absolute top-5 left-5">Go Back</Link>
      <Usernav />
      <FilterTableComponent />
      <div className="w-full min-h-screen flex flex-wrap gap-12 px-10 py-28 items-center justify-center">
        {Tables?.map((item, i : number) => (
          <TableCardElement index={i} item={item} key={i} />
        ))}
        <Toaster />
      </div>
    </div>
  )
}

export default React.memo(GamePageComponent)
