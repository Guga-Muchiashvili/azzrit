'use server'
import {Resend} from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendResetPasswordEmail = async(email : string, token : string) => {
    const resetLink = `http://localhost:3000/reset/password?token=${token}`

    await resend.emails.send({
        from : 'onboarding@resend.dev',
        to : 'ggwomega15@gmail.com',
        subject : 'Confirm your email',
        html : `<p>Click <a href=${resetLink}>Here</a> to Reset Password</p>`
    })
}


export const sendVerificationEmail = async (email : string, token : string) =>{
    const confirmLink = `http://localhost:3000/new-verification?token=${token}`

    await resend.emails.send({
        from : 'onboarding@resend.dev',
        to : 'ggwomega15@gmail.com',
        subject : 'Confirm your email',
        html : `<p>Click <a href=${confirmLink}>Here</a> to confirm email</p>`
    })
}