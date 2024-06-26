import { ISignIn } from "@/app/signIn/SignIntype";
import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";

export const login = async (values : ISignIn) => {
    const { email, password } = values;
    try {
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        console.log('result', result)

        if (result?.error) {
            if (result.error === 'CredentialsSignin') {
                return { error: 'Invalid credentials' };
            } else {
                return { error: 'Something went wrong' };
            }
        }
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
