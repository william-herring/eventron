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
            <div className='flex flex-col items-center h-screen justify-center text-center'>
                <h1 className='font-semibold text-5xl'>Welcome back, {session.user?.name}</h1>
                <p className='text-gray-500 text-xl w-96 my-6'>No new notifications</p>
                <div className='flex mt-4 mb-20'>
                    <input type='text' placeholder='Search Eventron' className='rounded-full w-96 border-2 border-gray-400 p-3'>
                    </input>
                </div>
            </div>
        </div>
    )
  }
  
  export default Dashboard