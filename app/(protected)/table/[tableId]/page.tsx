'use client'
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
    const {tableId} = useParams()
    console.log(tableId)
  return (
    <div>page</div>
  )
}

export default page