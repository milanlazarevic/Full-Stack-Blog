"use client"
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const NavigationTest = () => {

    // CLIENT SIDE NAVIGATION
    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()

    const q = searchParams.get("q")
    console.log(q)

    const handleClick = () => {
        console.log("You clicked")
        router.forward()
    }
    console.log(pathName    )
    return ( 
        <div className="flex flex-col">
            probaaaah
            <Link href="/" prefetch={false}>Click here</Link>
            <button onClick={handleClick}>Write and redirect</button>
        </div> 
    );
}
 
export default NavigationTest;