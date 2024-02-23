import  PostCard  from "@/components/postCard/PostCard"
import styles from "./blog.module.css"
import { getPosts } from "@/lib/data"


// FETCH DATA WITH API
// const getData = async () => {
//     const data = await fetch("https://jsonplaceholder.typicode.com/posts", {cache:"no-cache"})
//     // if i want content to load on certain period of time
//     // const data = await fetch("https://jsonplaceholder.typicode.com/posts", {next:{revalidate:3600}})

//     if(!data.ok){
//         throw new Error("Something went wrong!")
//     }
//     return data.json()

// }


 const BlogPage = async ({params}) => {
    // Fetch posts with api
    // const post = {
    //     "img": "https://images.pexels.com/photos/773471/pexels-photo-773471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //     "createdAt":"16.05.2003.",
    //     "title": "My first blog post",
    //     "body":"Body of my first blog",
    //     "slug":"blog1",
    // }

    
    // Fetch posts without api 
    const posts = await getPosts()
    return(
        <div className={styles.container}>
            {posts.map((post) => (
                <div className={styles.post} key={post.id}>
                    <PostCard post={post}/>
                </div>
            ))}
        </div>
    )
}
export default BlogPage