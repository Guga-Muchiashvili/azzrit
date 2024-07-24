'use client'
import Usernav from '@/app/elements/user/UserNav'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import FilterTableComponent from '@/inGameComponents/filterComponent/FilterTableComponent'
import CreateModal from '../tableModalComponent/TableModal'
import { filterTableLabels } from '@/app/additional/texts'
import { deleteUserTableId } from '@/actions/GameLogics/deletePlayerFromTable/deletePlayer'
import { useSession } from 'next-auth/react'
import { useTypeContext } from '../../tableTypeContext/TypeContext'
import TableCardElement from '../tableComponent/TableCard'
const GamePageComponent = () => {
  const { defineType, type, Tables, fetchData } = useTypeContext()
  const session = useSession()

  useEffect(() => {
    fetchData()
      const deleteTableId = async() => {
        const res = await deleteUserTableId(session.data?.user.id as string)
        console.log(res)
      }
      deleteTableId()

  },[])

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
      </div>
    </div>
  )
}

export default React.memo(GamePageComponent)
