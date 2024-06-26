import bcrypt from 'bcryptjs';
import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUserByEmail, getUserById } from './actions/fetchData/dataRequests';
import { DefaultSession } from 'next-auth';

type extenderUser = DefaultSession['user'] & {
    role : 'ADMIN' | "USER"
}

declare module 'next-auth' {
    interface Session {
        user : extenderUser
    }
}


export default {
    providers: [
        Credentials({
            async authorize(credentials :  Partial<Record<string, unknown>>) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await getUserByEmail(credentials.email as string);

                console.log('user', user)

                if (!user || !user.password) {
                    return null;
                }

                const passwordsMatch = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                console.log('passwordsMatch', passwordsMatch)

                if(!passwordsMatch) return null
                return user
            }
        })
    ],
    callbacks: {
        async session({token, session}) {
            if(token.sub && session.user){
                session.user.id = token.sub
            } 
            return session
        },
        async jwt ({token}){
            if(!token.sub) return token
            const existingUser = await getUserById(token.sub)
            if(!existingUser) return token
            return token
        }
    }
} satisfies NextAuthConfig;
