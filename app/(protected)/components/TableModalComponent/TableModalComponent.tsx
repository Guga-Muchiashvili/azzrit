
"use client"
import React from 'react'
import {motion} from 'framer-motion'
import TableFormComponent from '../CreateTableForm/TableFormComponent/TableForm'


const CreateTableModal = ({type } : {type : "FORM" | "REMOVE"}) => {
  return (
    <motion.div initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : .6, ease : "easeIn"}} className='w-full min-h-full absolute left-0 top-0 z-30 bg-black bg-opacity-60 flex py-52 justify-center'>
        {type == 'FORM' ? <TableFormComponent/> : <div></div>}
    </motion.div>
  )
}

export default CreateTableModal