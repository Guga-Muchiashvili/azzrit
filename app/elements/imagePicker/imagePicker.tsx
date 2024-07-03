import { Button, styled, TextField as MuiTextField } from '@mui/material'
import { FaCloudUploadAlt } from "react-icons/fa";
import React from 'react'
import { Controller } from 'react-hook-form';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

const ImagePickerElement = ({control, id} : any) => {
    
    return (
        <Controller
          control={control}
          name={id}
          render={({ field: {onChange, value, ref, name, onBlur} }) => {
            console.log('value', value)
            return(
            <Button
              component="label"
              variant="contained"
              startIcon={<FaCloudUploadAlt />}
            >
              Upload file
              <MuiTextField
                placeholder='none'
                className='absolute hidden'
                type='file'
                name={name}
                inputRef={ref}
                onChange={(e) => {
                  console.log(e)
                }}
                onBlur={onBlur}
                onChange={(event)=> {
                    // @ts-ignore
                    onChange({target: {value : event.target.files[0]}})
                }}
              />
            </Button>
          )}}
        />
      );
}

export default ImagePickerElement