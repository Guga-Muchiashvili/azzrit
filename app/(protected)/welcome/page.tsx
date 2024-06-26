import { auth, signOut } from '@/auth'
import React from 'react'

const WelcomePage = async() => {
  const session = await auth()
  console.log(session)
  return (
    <div>
      {JSON.stringify(session)}
      <form action={async() => {
        'use server'
        await signOut()
      }}>
        <button type='submit'>Sign out</button>
      </form>
    </div>
  )
}

export default WelcomePage