import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import connectToDb from "./utils"
import { User } from "./models"
import bcrypt from "bcrypt"
import { authConfig } from "./auth.config"

const login = async(credentials) => {
    try{
        connectToDb()
        const user = await User.findOne({username: credentials.username})

        if(!user){
            throw new Error("No user found!")
        }
        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordCorrect){
            throw new Error("Wrong password!")
        }

        return user

    }catch(err){
        console.log(err)
        throw new Error("Something went wrong!")
    }
}

export const { handlers : {GET, POST}, auth, signIn, signOut } = NextAuth({ 
    // this will override below providers and callbacks 
    // will override authConfig callbacks
    ...authConfig,
    providers: [ 
        GitHub({
            clientId : process.env.GITHUB_ID,
            clientSecret : process.env.GITHUB_SECRET,
        }), 
        CredentialsProvider({
            async authorize(credentials){
                try{
                    const user = await login(credentials)
                    return user

                }catch(err){
                    console.log(err)
                    return null
                }
            }
        })
    ],
    callbacks:{
        async signIn({user,  account, profile}){
            // console.log(account, profile)
            if (account.provider === "github"){
                connectToDb()
                try{
                    const user = await User.findOne({email:profile.email})
                    if(!user){
                        const newUser = new User({
                            username: profile.login,
                            email: profile.email,
                            img: profile.avatar_url
                        })
                        await newUser.save()
                    }
 
                }catch(err){
                    console.log(err)
                    return false
                }
            }
            return true
        },
        // to prevent this i will import callbacks once more
        ...authConfig.callbacks
    },
})