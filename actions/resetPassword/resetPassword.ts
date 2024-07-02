'use server'

import { db } from "@/lib/db"
import { getUserByEmail } from "../fetchData/dataRequests"
import { getVerificationTokenByToken } from "../verify-email/verificationToken/verificationTokens"
import { IResetPassword } from "@/app/reset/restPasswordFormTypes"
import { generatePasswordResetToken } from "@/lib/tokens"
import { sendResetPasswordEmail } from "@/lib/mail"

export const resrtPassword = async({email} : IResetPassword) => {

    const existingUser = await getUserByEmail(email)

    if(!existingUser) return null

    const passwordResetToken = await generatePasswordResetToken(email)
    await sendResetPasswordEmail(
        passwordResetToken.email,
        passwordResetToken.token
    )

    return {sucess : "Email Sent"}

}