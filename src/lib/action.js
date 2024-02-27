"use server"
import { revalidatePath } from "next/cache"
import { Post, User } from "./models"
import connectToDb from "./utils"
import { getPost } from "./data"
import { auth, signIn, signOut } from "@/lib/auth"
import bcrypt from "bcrypt"

export const addPost = async(prevState,formData) => {
    const {title, slug, userId, desc, img} = Object.fromEntries(formData)
    console.log(title, slug)

    try{
        connectToDb()
        const newPost = new Post({
            title,
            desc,
            slug,
            userId,
            img
        })
        await newPost.save()
        // to refresh the page when i add new blog
        revalidatePath("/blog")
        revalidatePath("/admin")

    }catch(err){
        console.log(err)
        throw new Error(err, "Something went wrong")
    }
}

export const deletePost = async(formData) => {
    const {id} = Object.fromEntries(formData)
    try{
        connectToDb()
        await Post.findByIdAndDelete(id)
        // to refresh the page when i delete a blog
        revalidatePath("/blog")
        console.log("deleted")
        revalidatePath("/admin")
    }catch(err){
        console.log(err)
        throw new Error(err, "Something went wrong")
    }
}

export const addUser = async(prevState, formData) => {
    const {username, email, password, img} = Object.fromEntries(formData)
    try{
        connectToDb()
        const newUser = new User({
            username, email, password, img
        })
        await newUser.save()
        console.log("added succesfully")
        revalidatePath("/admin")
    }catch(err){
        console.log(err)
        throw new Error(err, "something went wrong!")
    }

}
export const deleteUser = async(formData) => {
    const {id} = Object.fromEntries(formData)
    try{
        connectToDb()
        await Post.deleteMany({userId: id})
        await User.findByIdAndDelete(id)
        console.log("deleted successfully")
        revalidatePath("/admin")
    }catch(err){
        console.log(err)
        throw new Error(err, "something went wrong!")
    }
}

export const handleGithubLogin = async () => {
    
    await signIn("github")
}

export const handleLogout = async () => {
    await signOut()
}

export const register = async(previousState, formData) => {
    const {username, email, password, img,  passwordRepeat } = Object.fromEntries(formData)
    if (password != passwordRepeat){
        return {error:"Passwords doesnt match!"}
    }
    try{
        connectToDb()
        const user = await User.findOne({username})
        if(user){
            return {error:"User with that username already exists!"}
        }
        // hashing the password first
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            img
        })
        await newUser.save()

        return {success: true}

    }catch(err){
        console.log(err)
        return { error : "Something went wrong! "}
    }

}

export const login = async(previousState, formData) => {
    // console.log(formData)
    const {username, password} = Object.fromEntries(formData)

    try{
        await signIn("credentials", {
            username, password
        })
        return {success: true}
    }
    catch(err){
        if(err.type == 'CredentialsSignin'){
            return { error : "Wrong username and password! "}
        }
        throw err
    }
}