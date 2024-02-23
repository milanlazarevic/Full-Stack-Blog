'use client'

import { usePathname } from 'next/navigation';
import styles from './navLink.module.css'
import Link from 'next/link';


const NavLink = ({ item }) => {
    const pathName = usePathname()

    return ( 
        <Link href={item.url} className={`${styles.container}
            ${pathName === item.url && styles.active}`
        }>
            {item.title}
        </Link>
        
     );
}
 
export default NavLink;