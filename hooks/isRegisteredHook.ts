import { useSession } from 'next-auth/react'
import React from 'react'

const useRegistered = () => {
    const {data : session} = useSession()
    if(session) return true
    return false
}

export default useRegistered