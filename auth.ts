import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
 
export const { auth, handlers : {GET, POST}, signIn, signOut } = NextAuth({
  providers: [GitHub, Google],
})

