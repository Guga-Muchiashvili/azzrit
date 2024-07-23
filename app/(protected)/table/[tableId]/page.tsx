'use client'
import { useParams } from 'next/navigation'
import React from 'react'

const TablePage = () => {
    const {tableId} = useParams()
    console.log(tableId)
  return (
    <div>TablePage</div>
  )
}

export default TablePage