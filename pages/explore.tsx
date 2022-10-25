import { NextPage } from "next"
import { signOut, useSession } from "next-auth/react"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import NavigationBar from "../components/NavigationBar"
import SearchBar from "../components/SearchBar"

const Discover: NextPage = () => {
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
              <title>Discover</title>
            </Head>
            <NavigationBar active={0} />
            <div className='flex flex-col items-center text-center'>
                <div className='flex flex-col mt-24 items-center space-y-3'>
                    <h1 className='font-semibold text-4xl'>Search for events, communities and users</h1>
                    <SearchBar />
                </div>
            </div>
        </div>
    )
  }
  
  export default Discover