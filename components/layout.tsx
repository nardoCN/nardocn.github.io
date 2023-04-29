import { Children } from "react"
import Header from "./header"
import Footer from "./footer"
import Head from "next/head"

export interface ILayoutProps {
    children: JSX.Element
}

export default function Layout({
    children
}: ILayoutProps) {
    return (
        <>
        <Head>
            <title>Nhan Chu Cong Hoai</title>
            <meta property="og:title" content="Nhan Chu Cong Hoai" key="title"/>
            <meta property="og:description" content="NhanChu's Porfolio" key="description"/>
            <link rel="shortcut icon" href="/favicon.png" />
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
            </style>
        </Head>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}