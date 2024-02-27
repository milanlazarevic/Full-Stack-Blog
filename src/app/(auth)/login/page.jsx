import LoginForm from "@/components/loginForm/loginForm"
import { handleGithubLogin } from "@/lib/action"
import { auth } from "@/lib/auth"
import styles from "./login.module.css"

const LoginPage = () => {
    // const session = await auth()
    // console.log(session)
    
    return(
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <form action={handleGithubLogin} className={styles.github}>
                    <button>Login with GitHub</button>
                </form>
                <LoginForm/>
            </div>
        </div>
    )
}

export default LoginPage