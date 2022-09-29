import { NextPage } from "next"
import { signOut, useSession } from "next-auth/react"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import NavigationBar from "../components/NavigationBar"

const Dashboard: NextPage = () => {
    const { data: session, status } = useSession()
    const router = useRouter()

    if (status === "loading") {
        return <div className='flex w-screen h-screen justify-center items-center'>
                <Image width={80} height={80} src='/loading_spinner.svg' className='animate-spin' />
            </div>
    }

    if (status === "unauthenticated") {
        router.replace('/')
    }

    if (status != "authenticated") {
        return <div></div>
    }
  
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