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
            <div className='flex flex-col items-center h-screen w-screen fixed justify-center text-center'>
                <h1 className='font-semibold text-5xl'>Welcome back, {session.user?.name}</h1>
                <p className='text-gray-500 text-xl w-96 my-6'>No new notifications</p>
                <div className='flex mt-4 mb-20'>
                    <div className='border-gray-400 border-2 border-r-0 rounded-l-full p-4 pr-0'>
                        <svg width="24px" height="24px" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#a3a3a3"><path d="M15.5 15.5L19 19M5 11a6 6 0 1012 0 6 6 0 00-12 0z" stroke="#a3a3a3" stroke-width="2.04" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    </div>
                    <input type='text' placeholder='Search Eventron' className='rounded-r-full w-96 border-gray-400 border-2 border-l-0 p-4 focus:outline-none'>
                    </input>
                </div>
            </div>
        </div>
    )
  }
  
  export default Dashboard