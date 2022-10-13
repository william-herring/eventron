import { NextPage } from "next"
import { signOut, useSession } from "next-auth/react"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import NavigationBar from "../components/NavigationBar"
import SearchBar from "../components/SearchBar"

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
                <SearchBar />
                <a className='flex items-center my-3 text-lg text-gray-500' href='/create'>
                    <svg width="24px" height="24px" stroke-width="1.96" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M9 12h3m3 0h-3m0 0V9m0 3v3M21 3.6v16.8a.6.6 0 01-.6.6H3.6a.6.6 0 01-.6-.6V3.6a.6.6 0 01.6-.6h16.8a.6.6 0 01.6.6z" stroke="#6b7280" stroke-width="1.96" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    <p className='ml-2'>Create an event</p>
                </a>
            </div>
        </div>
    )
  }
  
  export default Dashboard