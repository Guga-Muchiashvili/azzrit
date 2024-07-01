'use server'

import { db } from "@/lib/db"
import { getUserByEmail } from "../fetchData/dataRequests"
import { getVerificationTokenByToken } from "../verificationToken/verificationTokens"

export const newVerification = async(token : string) => {
    const existingToken = await getVerificationTokenByToken(token)

    if(!existingToken){
        return {error : "Token does not exist"}
    }

    const hasExspired = new Date(existingToken.expires) < new Date()

    if(hasExspired) {
        return {error : 'Token verification expired'}
    }

    const existingUser = await getUserByEmail(existingToken.email)

    if(!existingUser) return {
        error : "invalid email"
    }

    console.log('exit', existingUser)

    await db.user.update({
        where : {id : existingUser.id},
        data : {
            emailVerified : new Date(),
            email : existingToken.email
        }
    })

    console.log()
    await db.verificationToken.delete({
        where : {id : existingToken.id}
    })

    return { message : "email verified"}
}