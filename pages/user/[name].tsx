import { GetServerSideProps, NextPage } from "next"
import { useSession, signOut } from "next-auth/react"
import { useState } from "react"
import Head from "next/head"
import prisma from "../../lib/prisma"
import { User } from "@prisma/client"
import NavigationBar from "../../components/NavigationBar"
import Image from "next/image"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const user = await prisma.user.findUnique({
        where: {
            username: String(params?.name),
        },
    })

     // @ts-ignore
    user.createdAt = user.createdAt.toDateString()

    return { props: { user } }
}

const Account: NextPage<{ user: User | null }> = (props) => {
    const { data: session } = useSession()
    const [ tab, setTab ] = useState(0)

    return (
        <div>
            <Head>
                <title>{props.user?.username}</title>
            </Head>

            <NavigationBar active={5} />

            <div className='flex flex-col mx-4'>
                <div className='w-full bg-gray-200 h-32 rounded-3xl p-12 text-center mt-24'>
                    <div className='absolute'>
                        <img src='/default_pfp.png' width={120} height={120} className='rounded-full border-8 border-white' />
                    </div>
                    <div className='flex absolute left-52 mt-10 rounded-3xl text-2xl text-center font-bold text-gray-500 px-6 pb-4 pt-2 bg-white border-8 border-white'>
                        {props.user?.username}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account