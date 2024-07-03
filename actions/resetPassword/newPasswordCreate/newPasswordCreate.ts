'use server'
import bcrypt from 'bcryptjs'
import { IChangePassword } from "@/components/changePasswordComponent/changePasswordTypes"
import { getPasswordResetTokenByToken } from "../resetPasswordTokens/resetPasswordTokens"
import { getUserByEmail } from "@/actions/fetchData/dataRequests"
import { db } from '@/lib/db'

export const newPassword = async(password : string, token : string | undefined) => {
    if(!token) return {error : "missing Token!"}

    const existingToken = await getPasswordResetTokenByToken(token)

    if(!token) return {error : "Token Not found"}

    if(new Date(existingToken?.expires as any) < new Date() ) return {error : "token expired"}

    const existingUser = await getUserByEmail(existingToken?.email as string)

    if(!existingUser) return {error : "Session Expired"}

    const hashedPassword = await bcrypt.hash(password, 10)

    console.log('new password', hashedPassword)

    console.log(existingUser)
    await db.user.update({
        where : {id : existingUser.id},
        data : {password : hashedPassword}
    })

    await db.passwordResetToken.delete({
        where : {id : existingToken?.id}
    })

    return {succes : 'password Updated'}
}