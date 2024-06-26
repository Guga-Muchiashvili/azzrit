import bcrypt from 'bcryptjs';
import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUserByEmail } from './actions/fetchData/dataRequests';
import { IUser } from './types/types';

export default {
    providers: [
        Credentials({
            async authorize(credentials : IUser) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await getUserByEmail(credentials.email);

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
        async jwt ({token}){
            console.log(token)
            return token
        }
    }
} satisfies NextAuthConfig;
