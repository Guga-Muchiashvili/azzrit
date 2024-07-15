import { filterTableLabels } from '@/app/additional/texts'
import React from 'react'
import FilterCardElement from '../../elements/filterCardElement/FilterCardElement'

const FilterTableComponent = () => {
  return (
    <div className='text-white w-full md:w-1/2 h-20 md:gap-5 mt-6 text-[9px] md:text-sm gap-2 py-3 px-1 flex justify-center rounded-full'>
        {filterTableLabels.map((item, i) => (
            <FilterCardElement label={item} key={item} index={i} />
        ))}
    </div>
  )
}

export default FilterTableComponent