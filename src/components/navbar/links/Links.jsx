'use client'
import Link from "next/link";
import styles from "./Links.module.css"
import NavLink from "./navLink/navLink";
import { useState } from "react";
import { handleLogout } from "@/lib/action";
const Links = ({session}) => {
    const [open, setOpen] = useState(false)
    const links = [
        {
            title: "Home",
            url: "/"
        },
        {
            title: "About",
            url: "/about"
        },
        {
            title: "Contact",
            url: "/contact"
        },
        {
            title: "Blog",
            url: "/blog"
        },
    ]
    
    const isAdmin = true

    return ( 
    <div className={styles.container}>
        <div className={styles.links}>
            {links.map((link => (
                <NavLink item = {link} key={link.title}/>
                )))}
            {session?.user ? (
                <>
                    {
                    session.user?.isAdmin && (
                        <NavLink item={{title:"Admin", url: "/admin"}}/>
                        )
                    }
                    <form action={handleLogout}>
                        <button className={styles.logout}>Logout</button>
                    </form>
                </>
            ) : (
                <NavLink item={{title: "Login", url:"/login"}} />
            )}
        </div>
        <button className={styles.menuButton} onClick={() => setOpen((prev) => !prev)}>Menu</button>
        {open && 
            <div className={styles.mobileLinks}>
                {links.map((link) => (
                    <NavLink item = {link} key={link.title}/>
                ))}
            </div>
        }
    </div> 
    );
}
 
export default Links;