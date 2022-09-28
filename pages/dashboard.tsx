import { NextPage } from "next"
import { signOut, useSession } from "next-auth/react"
import Head from "next/head"
import Image from "next/image"

const Dashboard: NextPage = () => {
    const { data: session, status } = useSession()
  
    return (
        <div>
            <Head>
              <title>Dashboard</title>
            </Head>
            <div className='flex w-screen h-screen justify-center items-center'>
                <Image width={80} height={80} src='/loading_spinner.svg' className='animate-spin' />
            </div>
        </div>
    )
  }
  
  export default Dashboard