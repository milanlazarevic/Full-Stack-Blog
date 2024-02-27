import AdminPosts from "@/components/adminPosts/adminPosts";
import styles from "./admin.module.css"
import { Suspense } from "react";
import AdminPostsForm from "@/components/adminPostsForm/adminPostsForm";
import { auth } from "@/lib/auth";
import AdminUsers from "@/components/adminUsers/adminUsers";
import AdminUserForm from "@/components/adminUserForm/adminUserForm";
const AdminPage = async () => {
    const session = await auth()
    return(
        <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div>Loading...</div>}>
             <AdminPosts /> 
          </Suspense>
        </div>
        <div className={styles.col}>
          <AdminPostsForm userId = {session.user.id} />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div>Loading...</div>}>
            <AdminUsers />
          </Suspense>
        </div>
        <div className={styles.col}>
          <AdminUserForm />
        </div>
      </div>
    </div>
    )
}

export default AdminPage;