import { addPost, deletePost } from "@/lib/action";

const ServerActionTest = () => {
    return ( 
        <div>
            <form action={addPost} className="flex flex-col">
                <input type="text" className="text-black" placeholder="title" name="title"/>
                <input type="text" className="text-black" placeholder="desc" name="desc"/>
                <input type="text" className="text-black" placeholder="slug" name="slug"/>
                <input type="text" className="text-black" placeholder="userId" name="userId"/>
                <button>Create</button>
            </form>

            <form action={deletePost}>
                <input type="text" className="text-black" placeholder="postId" name="id" />
                <button>Delete</button>
            </form>
        </div>
     );
}
 
export default ServerActionTest;