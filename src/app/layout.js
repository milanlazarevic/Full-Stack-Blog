import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from '@/components/navbar/NavBar'
import Footer from '@/components/footer/Footer'
import ClientSideProviderTest from "@/components/clientSideProviderTest";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Nextjs 14 Homepage",
    template: "%s | Next.js 14"
  },
  description: "Full stack website made with next.js and mongoDB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
      
      <body className={inter.className} suppressHydrationWarning={true}>
        {/* <ClientSideProviderTest> */}
          <div className="container">
            <NavBar/>
            {children}
            <Footer/>
          </div>
        {/* </ClientSideProviderTest> */}
      </body>
    </html>
  );
}
