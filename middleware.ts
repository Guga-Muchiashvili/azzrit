import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { AuthRoutes, DEFAULT_ROUTE_NAVIGATE, apiAuthPrefix, publicRoutes } from "./routes"

const {auth} = NextAuth(authConfig)

export default auth(async (req, ctx) : Promise<any | null> => {
    const {nextUrl} = req
    const isLoggedIn = !!req.auth
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = AuthRoutes.includes(nextUrl.pathname)


    if (isApiAuthRoute) {
        return null
    }
    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_ROUTE_NAVIGATE, nextUrl))
        }
        return null
    }

    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL('/signIn', nextUrl))
    }

    return null
})

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
