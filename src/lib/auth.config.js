import { User } from "./models"
import connectToDb from "./utils"

export const authConfig = {
    pages:{
        signIn: "/login"
    },
    providers: [],
    callbacks:{
        async jwt({token, user}){
            if(user){
                token.id = user.id
                token.isAdmin = user?._doc?.isAdmin

            }
            // console.log(token)
            return token
        },
        async session({session, token}){
            if(token){
                session.user.id = token.id
                session.user.isAdmin = token.isAdmin
            }
            // console.log(token)
            return session
        },
        authorized({auth, request}){
            // console.log(auth)
            const user = auth?.user
            const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login")
            const isOnAdminPage = request.nextUrl?.pathname.startsWith("/admin")
            const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog")

            // ONLY ADMIN CAN REACH ADMIN DASHBOARD

            if(isOnAdminPage && !user?.isAdmin){
                return false
            }

            // ONLY AUTHENTICATED USERS CAN REACH THE BLOG PAGE

            if(isOnBlogPage && !user){
                return false
            }

            // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE

            if(isOnLoginPage && user){
                return Response.redirect(new URL("/",request.nextUrl))
            }


            return true 
        }
    }
}