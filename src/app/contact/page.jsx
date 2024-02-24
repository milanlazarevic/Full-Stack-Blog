import Image from "next/image";
import styles from "./contact.module.css";
import dynamic from "next/dynamic";

// using dynamic import from nextjs without server side rendering

// const HydrationTestNoSSR = dynamic(() => import("@/components/hydrationTest"), {ssr:false})
export const metadata = {
  title: "Contact Page",
  description: "If you need any contact info you can reach via email",
};

export default function ContactPage(){
  // console.log("cao")
    return(
        <div className={styles.container}>
        <div className={styles.imgContainer}>
          <Image src="/contact.png" alt="" fill className={styles.img} />
        </div>
        <div className={styles.formContainer}>
          {/* <HydrationTestNoSSR/>          */}
          <form action="" className={styles.form}>
            <input type="text" placeholder="Name and Surname" />
            <input type="text" placeholder="Email Address" />
            <input type="text" placeholder="Phone Number (Optional)" />
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Message"
            ></textarea>
            <button>Send</button>
          </form>
        </div>
      </div>
    )
}