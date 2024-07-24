'use client'
import Usernav from '@/app/elements/user/UserNav'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import FilterTableComponent from '../filterComponent/FilterTableComponent'
import { filterTableLabels } from '@/app/additional/texts'
import { useTypeContext } from '../../tableTypeContext/TypeContext'
import CreateTableModal from '../tableModalComponent/TableModalComponent'
import TableComponent from '../tableComponent/TableCardComponent'
import { deleteUserTableId } from '@/actions/GameLogics/deletePlayerFromTable/deletePlayer'
import { useSession } from 'next-auth/react'
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
        <CreateTableModal type={'FORM'}/>
      )}
      <Link href={'/landing'} className="text-white absolute top-5 left-5">Go Back</Link>
      <Usernav />
      <FilterTableComponent />
      <div className="w-full min-h-screen flex flex-wrap gap-12 px-10 py-28 items-center justify-center">
        {Tables?.map((item, i : number) => (
          <TableComponent index={i} item={item} key={i} />
        ))}
      </div>
    </div>
  )
}

export default React.memo(GamePageComponent)
