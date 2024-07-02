'use server'
import { getVerificationTokenByEmail } from '@/actions/verify-email/verificationToken/verificationTokens'
import {v4 as uuid} from 'uuid'
import { db } from './db'
import { getPasswordResetTokenByEmail } from '@/actions/resetPassword/resetPasswordTokens/resetPasswordTokens'

export const generatePasswordResetToken = async(email : string) => {
    const token = uuid()
    const expires = new Date(new Date().getTime() + 3600 * 1000)
    const existingToken = await getPasswordResetTokenByEmail(email)

    if(existingToken){
        await db.passwordResetToken.delete({
            where : {
                id : existingToken.id
            }
        })
    }

    const passwordResetToken = await db.passwordResetToken.create({
        data : {
            email,
            token,
            expires
        }
    })

    return passwordResetToken
}

export const generateVerificationToken = async(email : string) => {
    const token = uuid()
    const expires = new Date(new Date().getTime() + 3600 * 1000)
    const existingToken = await getVerificationTokenByEmail(email)

    if(existingToken){
        await db.verificationToken.delete({
            where : {
                id : existingToken.id
            }
        })
    }

    const verificationToken = await db.verificationToken.create({
        data : {
            email,
            token,
            expires
        }
    })

    console.log('token created')

    return verificationToken
}