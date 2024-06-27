import React from 'react'
import './loader.scss'

const LoaderElement = () => {
  return (
    <div className='bg-white gap-40 flex flex-col items-center justify-center'>
    <span className="loader"></span>
    <h5 id='load-txt' className='mt-4'>loading...</h5>
    </div>
  )
}

export default LoaderElement