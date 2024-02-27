import PostUser from "@/components/postUser/postUser";
import styles from "./singlePost.module.css"
import Image from "next/image";
import { Suspense } from "react";
import { getPost } from "@/lib/data";

// FETCH DATA WITH AN API
const getData = async(slug) => {
    const data = await fetch(`http://localhost:3000/api/blogs/${slug}`)
    if (!data.ok){
        throw new Error("There is an error in the process!")
    }
    return data.json()
}
export const generateMetadata = async({params}) => {
    const {slug} = params
    // API
    const blog = await getData(slug)

    // WITHOUT API
    // const blog = await getPost(slug)

    return {
        title: blog?.title,
        description: blog?.desc
    }
}


const BlogPost = async({params}) => {
    const {slug} = params
    // console.log(slug)
    // const post = await getData(slug)
    // console.log(post)

    // FETCH WITHOUT API
    const post = await getPost(slug)
    return ( 
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                {post &&
                    <Image src={post.img} alt="" fill className={styles.img} />
                }
            </div>
            <div className={styles.textContainer}>
                {post && 
                    <h1 className={styles.title}>{post.title}</h1>
                    }
                {post && 
                    <div className={styles.detail}>
                        <Suspense fallback={<div>Loading...</div>}>
                            <PostUser userId = {post.userId}/>
                        </Suspense>
                        <div className={styles.detailText}>
                            <span className={styles.detailTitle}>Published</span>
                            <span className={styles.detailValue}>
                            {post.createdAt.toString().slice(4, 16)}
                            </span>
                        </div>
                        
                    </div>
                }
                {post && 
                    <div className={styles.content}>{post.desc}</div>
                }
            </div>
            </div>
     );
}
 
export default BlogPost;