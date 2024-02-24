import { handleGithubLogin } from "@/lib/action"
import { auth } from "@/lib/auth"

const LoginPage = async () => {
    // const session = await auth()
    // console.log(session)
    
    return(
        <div>
            LoginPage
            <form action={handleGithubLogin}>
                <button>Login with GitHub</button>
            </form>
        </div>
    )
}

export default LoginPage