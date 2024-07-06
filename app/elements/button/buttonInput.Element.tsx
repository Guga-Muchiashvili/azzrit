import { Button } from '@mui/material'
import React from 'react'

const ButtonInputElement = ({text} : {text : string}) => {
  return (
    <Button className={`mt-3`} color={text == 'Sign Out' ? "error" : "primary"} type={text !== 'Sign Out' ? 'submit' : "button"} variant="outlined">{text}</Button>
  )
}

export default ButtonInputElement