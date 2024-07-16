'use client'
import Usernav from '@/app/elements/user/UserNav'
import Link from 'next/link'
import React from 'react'
import FilterTableComponent from '../FilterComponent/FilterTableComponent'
import { filterTableLabels } from '@/app/additional/texts'
import { useTypeContext } from '../../tableTypeContext/TypeContext'
import CreateTableModal from '../TableModalComponent/TableModalComponent'
import TableComponent from '../TableComponent/TableComponent'

const GamePageComponent = () => {
    
  const {defineType, type} = useTypeContext()
  console.log(type)
  return (
    <div className="w-full min-h-screen relative flex flex-col items-center py-9" id="MainPage">
      {type == 'Create Table' && (
        <CreateTableModal/>
      )}
      <Link href={'/landing'} className="text-white absolute top-5 left-5">Go Back</Link>
      <Usernav/>
      <FilterTableComponent/>
      <div className="w-full min-h-screen flex flex-wrap gap-12 relative px-10 py-28 items-center justify-center">
        {filterTableLabels.map((item, i) => (
          <TableComponent index={i} item={item} key={item}/>
        ))}
      </div>
    </div>
  )
}

export default GamePageComponent