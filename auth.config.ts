import bcrypt from 'bcryptjs';
import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUserByEmail, getUserById } from './actions/fetchData/dataRequests';
import { DefaultSession } from 'next-auth';
import Google from 'next-auth/providers/google'
import Facebook from 'next-auth/providers/facebook'
import { db } from './lib/db';

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
        Google({
            clientId : process.env.GOOGLE_CLIENT_ID,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET
        }),
        Facebook({
            clientId : process.env.FACEBOOK_CLIENT_ID,
            clientSecret : process.env.FACEBOOK_CLIENT_SECRET
        }),
        Credentials({
            async authorize(credentials: Partial<Record<string, unknown>>) {
                if (!credentials?.email || typeof credentials.email !== 'string' || !credentials?.password || typeof credentials.password !== 'string') {
                    return null;
                }
        
                const user = await getUserByEmail(credentials.email as string);
        
                if (!user || !user.password || typeof user.password !== 'string') {
                    return null;
                }
        
                const passwordsMatch = await bcrypt.compare(credentials.password, user.password);
        
                if (!passwordsMatch) {
                    return null;
                }
                return user;
            }
        })
    ],
    callbacks: {
        async signIn({account, user} ){
            if(account?.provider !== 'credentials') return true
            const existingUser = await getUserById(user.id)

            if(!existingUser?.emailVerified) {
                return false
            }
            
            return true
        },  
        async session({token, session}) {
            if(token.sub && session.user){
                session.user.id = token.sub
            } 
            if(session.user){
                session.user.name = token.name
                session.user.image = token.picture
            }
            return session
        },
        async jwt ({token}){
            if(!token.sub) return token
            const existingUser = await getUserById(token.sub)
            if(!existingUser) return token
            token.name = existingUser.name
            token.picture = existingUser.image
            return token
        }
    },
    events : {

       async linkAccount ({user}){
        await db.user.update({
            where : {id : user.id},
            data : {emailVerified : new Date()}
        })
       }
    },
    pages : {
        signIn : '/signIn',
        signOut : '/signOut',
        error : '/error'
    }
} satisfies NextAuthConfig;
