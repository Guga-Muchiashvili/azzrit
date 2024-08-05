import { ISignIn } from "@/app/signIn/SignIntype";
import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";
import { getUserByEmail } from "../fetchData/dataRequests";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (values : ISignIn) => {
    const { email, password } = values;
    const existingUser = await getUserByEmail(email)

    try {
        if(!existingUser?.email || !existingUser.password || !existingUser){
            return {error : "You are not Registered"}
        }

           if(!existingUser.emailVerified) {
                const verificationToken = await generateVerificationToken(existingUser.email)

                await sendVerificationEmail(
                    verificationToken.email,
                    verificationToken.token
                  )

                return {succes : "Confirmation email sent!"}
            }
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });


        if (result?.error) {
            if (result.error === 'CredentialsSignin') {
                return { error: 'Invalid credentials' };
            } else {
                return { error: 'Something went wrong' };
            }
        }

        return {success : "logedIn"}
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Invalid credentials' };
                default:
                    return { error: 'Something went wrong' };
            }
        }
        throw error;
    }
};
