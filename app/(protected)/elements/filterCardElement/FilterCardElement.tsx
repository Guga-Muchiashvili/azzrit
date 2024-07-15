import React from 'react'

const FilterCardElement = ({label} : {label : string}) => {
  return (
    <div className='w-1/4 h-full flex items-center justify-center hover:shadow-none shadow-md duration-500 shadow-red-700 bg-red-500 font-semibold cursor-pointer text-white rounded-3xl'>
        <h1>{label}</h1>
    </div>
  )
}

export default FilterCardElement