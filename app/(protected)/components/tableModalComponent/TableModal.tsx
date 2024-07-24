
"use client"
import React from 'react'
import {motion} from 'framer-motion'
import TableFormComponent from '../CreateTableForm/TableFormComponent/TableForm'
import { useTypeContext } from '../../tableTypeContext/TypeContext'
import { deleteTable } from '@/actions/GameLogics/DeleteTable/deleteTable'
import { ITable } from '../CreateTableForm/TableFormComponent/tableFormType'


const CreateModal = ({type, ides } : {type : "FORM" | "REMOVE", ides? :{id : string, creatorId : string}}) => {

  const { defineType, type:tableType, fetchData, toggleModal, } = useTypeContext();

  const DeleteTable = async() => {
    console.log(ides?.id, ides?.creatorId)
    const res = await deleteTable(ides?.id as string, ides?.creatorId as string);
    fetchData();
    toggleModal()
  }

  console.log(ides)
  return (
    <motion.div initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : .6, ease : "easeIn"}} className='w-full min-h-full absolute left-0 top-0 z-30 bg-black bg-opacity-60 flex py-72 justify-center'>
        {type == 'FORM' ? <TableFormComponent/> : <div className='fixed justify-around w-96 rounded-3xl h-40 flex flex-col  items-center bg-white'>
          <h1 className='font-mono font-bold'>Are you Sure you want to Delete Table?</h1>
          <div className='flex justify-center items-center w-full gap-7'>
            <button className='w-32 h-12 rounded-xl bg-red-500 hover:bg-opacity-70 hover:scale-90 duration-500 ease-in text-white' onClick={() => DeleteTable()}>Delete</button>
            <button className='w-32 h-12 rounded-xl border-red-500 border-[1px] hover:scale-90 duration-500 ease-in hover:bg-red-200 text-red-500' onClick={() => toggleModal() }>Close</button>
          </div>
        </div>}
    </motion.div>
  )
}

export default CreateModal