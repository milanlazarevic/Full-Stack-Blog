import Links from "./links/Links"
import Link from "next/link";
import styles from './NavBar.module.css'
import { auth } from "@/lib/auth";

const NavBar = async () => {
    const session = await auth()
    return ( 
        <div className={styles.container}>
            <Link href="/" className={styles.logo}>Logo</Link>
            <div>
               <Links session = {session}/> 

            </div>
        </div>
     );
}
 
export default NavBar;