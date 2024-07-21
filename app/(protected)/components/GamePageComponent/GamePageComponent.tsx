'use client'
import Usernav from '@/app/elements/user/UserNav'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import FilterTableComponent from '../FilterComponent/FilterTableComponent'
import { filterTableLabels } from '@/app/additional/texts'
import { useTypeContext } from '../../tableTypeContext/TypeContext'
import CreateTableModal from '../TableModalComponent/TableModalComponent'
import TableComponent from '../TableComponent/TableComponent'
import { getEveryTable, getEveryUser } from '@/actions/fetchData/dataRequests'
import { ITable } from '../CreateTableForm/TableFormComponent/tableFormType'

const GamePageComponent = () => {
  const [tableData, setTableData] = useState<ITable[]>([] )
  const { defineType, type } = useTypeContext()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tables = await getEveryTable()
        const users = await getEveryUser()

        const enrichedTableData = tables?.map(table => {
          const creator = users?.find(user => user.id === table.creatorId)
          return {
            ...table,
            creator: creator || null
          }
        })

        setTableData(enrichedTableData as any) 
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }

    fetchData()
  }, [])


  return (
    <div className="w-full min-h-screen relative flex flex-col items-center py-9" id="MainPage">
      {type === 'Create Table' && (
        <CreateTableModal />
      )}
      <Link href={'/landing'} className="text-white absolute top-5 left-5">Go Back</Link>
      <Usernav />
      <FilterTableComponent />
      <div className="w-full min-h-screen flex flex-wrap gap-12 relative px-10 py-28 items-center justify-center">
        {tableData.map((item, i : number) => (
          <TableComponent index={i} item={item} key={i} />
        ))}
      </div>
    </div>
  )
}

export default React.memo(GamePageComponent)
