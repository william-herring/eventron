import { NextPage } from "next"
import { signOut, useSession } from "next-auth/react"
import Head from "next/head"
import Image from "next/image"
import NavigationBar from "../components/NavigationBar"

const Dashboard: NextPage = () => {
    const { data: session, status } = useSession()
  
    return (
        <div>
            <Head>
              <title>Dashboard</title>
            </Head>
            <NavigationBar active={0} />
        </div>
    )
  }
  
  export default Dashboard