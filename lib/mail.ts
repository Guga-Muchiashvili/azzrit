'use server'
import {Resend} from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const domain = process.env.NEXT_PUBLIC_APP_URL

export const sendResetPasswordEmail = async(email : string, token : string) => {
    const resetLink = `${domain}/reset/password?token=${token}`

    await resend.emails.send({
        from : 'onboarding@resend.dev',
        to : email,
        subject : 'Confirm your email',
        html : `<p>Click <a href=${resetLink}>Here</a> to Reset Password</p>`
    })
}


export const sendVerificationEmail = async (email : string, token : string) =>{
    const confirmLink = `${domain}/new-verification?token=${token}`

    await resend.emails.send({
        from : 'onboarding@resend.dev',
        to : email,
        subject : 'Confirm your email',
        html : `<p>Click <a href=${confirmLink}>Here</a> to confirm email</p>`
    })
}