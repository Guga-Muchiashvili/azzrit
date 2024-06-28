'use client'
import { useSession } from 'next-auth/react'
import React from 'react'
import background from '../../assets/editprofile.jpg'
import FormComponent from '@/components/FormComponent/formComponent'
import Link from 'next/link'
import schema from './schema'
import EditUserForm from '@/components/EditUserComponent/EditUserForm'
import IEditUser from './types'
import { noUserImage } from '@/app/additional/texts'


const EditProfilePage = () => {
  const {data, status} = useSession()

  console.log(data)
  const defaultValues : IEditUser = {
    email : data?.user.email,
    image : data?.user.image ? data.user.image : noUserImage,
    name : data?.user.name,
  }

  console.log(defaultValues)
  return (
    <div className='w-full h-screen bg-cover bg-bottom bg-no-repeat' style={{backgroundImage : `url(${background.src})`}}>
      <Link href={'/landing'} className='absolute text-black top-3 left-3'>Go Back</Link>
      <EditUserForm schema={schema} defaultValues={defaultValues}  />
    </div>
  )
}

export default EditProfilePage