import  PostCard  from "@/components/postCard/PostCard"
import styles from "./blog.module.css"
import { getPosts } from "@/lib/data"


// FETCH DATA WITH API
const getData = async () => {
    const data = await fetch("http://localhost:3000/api/blogs", {cache:"no-cache"})
    // if i want content to load on certain period of time
    // const data = await fetch("https://jsonplaceholder.typicode.com/posts", {next:{revalidate:3600}})

    if(!data.ok){
        throw new Error("Something went wrong!")
    }
    return data.json()

}



 const BlogPage = async ({params}) => {
    // fetch with api
    const posts = await getData()
    
    // Fetch posts without api 
    // const posts = await getPosts()
    return(
        <div className={styles.container}>
            {posts.map((post) => (
                <div className={styles.post} key={post.title}>
                    <PostCard post={post}/>
                </div>
            ))}
        </div>
    )
}
export default BlogPage