import { auth } from "./auth"
 
export default auth((req) => {
    console.log('isLoggedIn', !!req.auth)
})

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}