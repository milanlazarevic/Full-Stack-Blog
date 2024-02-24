"use server"
import { revalidatePath } from "next/cache"
import { Post } from "./models"
import connectToDb from "./utils"
import { getPost } from "./data"
import { auth, signIn, signOut } from "@/lib/auth"

export const addPost = async(formData) => {
    const {title, slug, userId, desc} = Object.fromEntries(formData)
    console.log(title, slug)

    try{
        connectToDb()
        const newPost = new Post({
            title,
            desc,
            slug,
            userId
        })
        await newPost.save()
        // to refresh the page when i add new blog
        revalidatePath("/blog")

    }catch(err){
        console.log(err)
        throw new Error(err, "Something went wrong")
    }
}

export const deletePost = async(formData) => {
    const {id} = Object.fromEntries(formData)
    console.log(id)
    try{
        connectToDb()
        await Post.findByIdAndDelete(id)
        // to refresh the page when i delete a blog
        revalidatePath("/blog")
        console.log("deleted")
    }catch(err){
        console.log(err)
        throw new Error(err, "Something went wrong")
    }
}

export const handleGithubLogin = async () => {
    
    await signIn("github")
}

export const handleLogout = async () => {
    await signOut()
}