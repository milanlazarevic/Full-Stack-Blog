"use client"
import { login } from "@/lib/action";
import { useFormState } from "react-dom"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./loginForm.module.css"
import Link from "next/link";

const LoginForm = () => {
    const [state, formAction] = useFormState(login, undefined)
    const router = useRouter()

    useEffect(() => {
        state?.success && router.push("/login")
    }, [state?.success, router])
    return ( 
    <form action={formAction} className={styles.form}>
        <input type="text" placeholder="username" name="username"/>
        <input type="password" placeholder="password" name="password" />
        <button>Login</button>
        {state?.error}
        <Link href="/register">Dont have an account? <b>Register</b></Link>
    </form> 
    );
}
 
export default LoginForm;