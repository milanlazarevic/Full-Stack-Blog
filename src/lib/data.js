import { Post, User } from "./models"
import connectToDb from "./utils"
import { unstable_noStore as noStore } from "next/cache"
// TEMPORARY DATA
// const users = [
//   { id: 1, name: "John" },
//   { id: 2, name: "Jane" },
// ];


// const posts = [
//   { id: 1, title: "Post 1", body: "......", userId: 1 },
//   { id: 2, title: "Post 2", body: "......", userId: 1 },
//   { id: 3, title: "Post 3", body: "......", userId: 2 },
//   { id: 4, title: "Post 4", body: "......", userId: 2 },
// ];

export const getPosts = async() => {
  // if i want not to cache
  // noStore()
  try{
    connectToDb()
    const posts = await Post.find()
    return posts

  }catch(err){
    console.log(err)
    throw new Error("Error with connection ", err)
  }
}

export const getPost = async(slug) => {
  try{
    connectToDb()
    const post = Post.findOne({slug:slug})
    return post
  }catch(err){
    console.log(err)
    throw new Error("Error occured", err)
  }
}
export const getUsers = async() => {
  try{
    connectToDb()
    const users = User.find()
    return users
  }
  catch(err){
    console.log(err)
    throw new Error("Error occured", err)
  }
}

export const getUser = async(id) => {
  try{
    connectToDb()
    const user = User.findById(id)
    return user
  }
  catch(err){
    console.log(err)
    throw new Error("Error occured", err)
  }
}